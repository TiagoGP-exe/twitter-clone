"use client";

import Image from "next/image";
import { Likes } from "./likes";
import { useEffect, experimental_useOptimistic as useOptimistic } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { formattedDate } from "@/lib/utils";
// import { TweetMoreButton } from "./tweet-more-button";
// import { useUser } from "@/hooks/useUser";

export const dynamic = "force-dynamic";

const maxName2 = (name: string) => {
  const [first, last] = name.split(" ");
  return `${first} ${last}`;
};

const Tweeets = ({ tweets }: { tweets: TweetWithAuthor[] }) => {
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
    <div
      key={tweet.id}
      className="flex flex-1 px-4 py-6 border-b gap-4 justify-start items-start last:border-b-0 dark:border-foreground/30"
    >
      <Image
        src={tweet.author.avatar_url!}
        width={36}
        height={36}
        className="rounded-full"
        alt={tweet.author.name!}
      />
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full items-center text-gray-500">
          <div className="flex flex-1 gap-1 flex-wrap items-center pr-2 ">
            <p className="font-bold text-sm text-foreground">
              {maxName2(tweet.author.name!)}
            </p>
            <p className="text-sm">{tweet.author.username.toLowerCase()}</p>

            <p className=" text-xs hidden sm:block">
              {"• "}
              {formattedDate(new Date(tweet.created_at))}
            </p>
          </div>
          {/* {tweet.author.id === user?.id && (
            <TweetMoreButton isOwner={true} tweetId={tweet.id} />
          )} */}
        </div>
        <p className="text-sm flex-1 max-w-[90%] mt-1 break-all">
          {tweet.title}
        </p>
        <div className="flex gap-4 items-center mt-4">
          <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
        </div>
      </div>
    </div>
  ));
};

export default Tweeets;