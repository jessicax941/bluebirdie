'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, experimental_useOptimistic as useOptimistic } from 'react';
import LikeButton from './LikeButton';
import TweetItem from './TweetItem';

type TweetListProps = {
  tweets: TweetWithAuthor[];
};

export default function TweetList(props: TweetListProps) {
  const { tweets } = props;

  const supabase = createClientComponentClient();
  const router = useRouter();
  useEffect(() => {
    // subscribe to changes in tweets table to show changes in realtime
    const channel = supabase
      .channel('realtime tweets')
      .on(
        'postgres_changes',
        {
          event: '*', // listen to all changes (insert, delete, etc)
          schema: 'public',
          table: 'tweets',
        },
        // callback function for when there's a change
        (payload) => router.refresh() // reload our server component
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // cleanup function
    };
  }, [router, supabase]);

  // optimistic updates to make the UI appear more responsive and display the positive result while waiting for response from the db
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(tweets, (currentTweets, newTweet) => {
    // (current optimistic state, new state)
    // function that merges the actual new tweet with your optimistic tweet by replacing the optimistic one with the actual tweet
    const newOptimisticTweets = [...currentTweets];
    const index = newOptimisticTweets.findIndex(
      (tweet) => tweet.id == newTweet.id
    );
    newOptimisticTweets[index] = newTweet;
    return newOptimisticTweets;
  });

  return (
    <>
      {optimisticTweets.map(
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
              <LikeButton
                tweet={tweet}
                addOptimisticTweet={addOptimisticTweet}
              />
            </>
          )
      )}
    </>
  );
}