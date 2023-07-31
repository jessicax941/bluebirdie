'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LikeButton(props: TweetWithAuthor) {
  const {
    user_has_liked_tweet: hasUserLikedTweet,
    id: tweetId,
    likes: numLikes,
  } = props;
  const router = useRouter();
  console.log(numLikes);

  const handleLike = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (hasUserLikedTweet) {
        // delete like
        await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, tweet_id: tweetId }); // match the user id and tweet id
      } else {
        // add like
        await supabase
          .from('likes')
          .insert({ user_id: user.id, tweet_id: tweetId });
      }
      router.refresh();
    }
  };

  return <button onClick={handleLike}>{numLikes} Likes</button>;
}
