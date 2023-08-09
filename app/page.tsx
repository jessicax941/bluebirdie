import TweetList from '@/components/TweetList';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import Banner from '@/components/Banner';
import Header from '@/components/Header';
import NewTweetServer from '@/components/NewTweetServer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // user can see only their own tweets or sample tweets
  const userIdsForTweets = session
    ? [`${process.env.SAMPLE_TWEETS_UUID}`, `${session.user.id}`]
    : [`${process.env.SAMPLE_TWEETS_UUID}`];

  const { data } = await supabase
    .from('tweets')
    .select('*, author: profiles(*), likes(user_id)') // rename 'profiles' to 'author'
    .in('user_id', userIdsForTweets);

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author, // assign author so that it's not null
      user_has_liked_tweet: session
        ? !!tweet.likes.find((like) => like.user_id === session.user.id)
        : false, // finds row where the user id on the like is same as our current user
      // double exclamation mark to turn return value from find() into true/false
      likes: tweet.likes.length,
    })) ?? [];

  return (
    <div className="mx-auto mb-10 space-y-6 max-w-7xl">
      <Header />
      <div className="mx-auto space-y-6 max-w-5xl">
        <Banner
          displayText={`Hi! You will be able to only see your own tweets and the developer's sample tweets.`}
        />
        <NewTweetServer />
        <TweetList tweets={tweets} />
      </div>
    </div>
  );
}
