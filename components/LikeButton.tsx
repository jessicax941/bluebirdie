'use client';

import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

type LikeButtonProps = {
  tweet: TweetWithAuthor;
  addOptimisticTweet: (newTweet: TweetWithAuthor) => void;
};

export default function LikeButton(props: LikeButtonProps) {
  const { tweet, addOptimisticTweet } = props;
  const {
    user_has_liked_tweet: hasUserLikedTweet,
    id: tweetId,
    likes: numLikes,
  } = tweet;
  const router = useRouter();

  const handleLike = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (hasUserLikedTweet) {
        // optimistic update, assume that db has managed to remove the like
        addOptimisticTweet({
          ...tweet,
          likes: tweet.likes - 1,
          user_has_liked_tweet: !tweet.user_has_liked_tweet,
        });

        // delete like
        await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, tweet_id: tweetId }); // match the user id and tweet id
      } else {
        // optimistic update, assume that db has managed to add the like
        addOptimisticTweet({
          ...tweet,
          likes: tweet.likes + 1,
          user_has_liked_tweet: !tweet.user_has_liked_tweet,
        });

        // add like
        await supabase
          .from('likes')
          .insert({ user_id: user.id, tweet_id: tweetId });
      }
      router.refresh();
    }
  };

  const likedIcon = (
    <FontAwesomeIcon
      icon={faHeartSolid}
      className="text-pink-400 animate-like"
    />
  );
  const notLikedIcon = (
    <FontAwesomeIcon icon={faHeartOutline} className="hover:text-pink-400" />
  );

  return (
    <div className="flex flex-row items-center space-x-2">
      <button onClick={handleLike}>
        {hasUserLikedTweet ? likedIcon : notLikedIcon}
      </button>
      <p>{numLikes}</p>
    </div>
  );
}
