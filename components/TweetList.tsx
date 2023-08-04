'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, experimental_useOptimistic as useOptimistic } from 'react';
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
    <div className="space-y-6">
      {optimisticTweets
        .sort((tweet1: TweetWithAuthor, tweet2: TweetWithAuthor) => {
          const timestamp1 = new Date(tweet1.created_at).getTime();
          const timestamp2 = new Date(tweet2.created_at).getTime();
          return timestamp2 - timestamp1;
        })
        .map(
          (tweet) =>
            tweet.author && (
              <TweetItem {...tweet} addOptimisticTweet={addOptimisticTweet} />
            )
        )}
    </div>
  );
}
