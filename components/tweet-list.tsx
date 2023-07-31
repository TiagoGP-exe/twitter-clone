"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, experimental_useOptimistic as useOptimistic } from "react";
import { Tweet } from "./tweet";

export const dynamic = "force-dynamic";

const TweetList = ({ tweets }: { tweets: TweetWithAuthor[] }) => {
  const router = useRouter();

  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(tweets, (currentOptimisticTweets, newTweet) => {
    const newOptimisticTweets = [...currentOptimisticTweets];
    const index = newOptimisticTweets.findIndex(
      (tweet) => tweet.id === newTweet.id
    );

    newOptimisticTweets[index] = newTweet;

    return newOptimisticTweets;
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime tweets")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tweets",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  return optimisticTweets.map((tweet) => (
    <Tweet
      key={tweet.id}
      tweet={tweet}
      addOptimisticTweet={addOptimisticTweet}
    />
  ));
};

export default TweetList;
