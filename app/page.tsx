import AuthButtonServer from '@/components/AuthButtonServer';
import LikeButton from '@/components/LikeButton';
import NewTweetButton from '@/components/NewTweetButton';
import TweetItem from '@/components/TweetItem';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    <>
      <AuthButtonServer />
      <NewTweetButton />
      {tweets?.map(
        (tweet) =>
          tweet.author && (
            <>
              <TweetItem
                id={tweet.id}
                createdAt={tweet.created_at}
                title={tweet.title}
                profileName={tweet.author.name}
                profileAvatar={tweet.author.avatar_url}
                profileUsername={tweet.author.username}
              />
              <LikeButton {...tweet} />
            </>
          )
      )}
    </>
  );
}
