import NewTweetButton from '@/components/NewTweetButton';
import TweetList from '@/components/TweetList';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Header from '@/components/Header';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // if user is not signed in, we want to redirect them to the login page
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }

  const { data } = await supabase
    .from('tweets')
    .select('*, author: profiles(*), likes(user_id)');
  // rename 'profiles' to 'author'

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author, // assign author so that it's not null
      user_has_liked_tweet: !!tweet.likes.find(
        (like) => like.user_id === session.user.id
      ), // finds row where the user id on the like is same as our current user
      // double exclamation mark to turn return value from find() into true/false
      likes: tweet.likes.length,
    })) ?? [];

  return (
    <div className="mx-8 my-4 space-y-6">
      <Header />
      <NewTweetButton />
      <TweetList tweets={tweets} />
    </div>
  );
}
