"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export const Likes = ({
  tweet,
  addOptimisticTweet,
}: {
  tweet: TweetWithAuthor;
  addOptimisticTweet: (newTweet: TweetWithAuthor) => void;
}) => {
  const { refresh } = useRouter();
  const handleLikes = async () => {
    const supabase = createClientComponentClient<Database>();

    if (tweet.user_has_liked_tweet) {
      addOptimisticTweet({
        ...tweet,
        likes: tweet.likes - 1,
        user_has_liked_tweet: !tweet.user_has_liked_tweet,
      });
      await supabase.from("likes").delete().match({
        tweet_id: tweet.id,
        user_id: tweet.author.id,
      });
    } else {
      addOptimisticTweet({
        ...tweet,
        likes: tweet.likes + 1,
        user_has_liked_tweet: !tweet.user_has_liked_tweet,
      });
      await supabase.from("likes").insert({
        tweet_id: tweet.id,
        user_id: tweet.author.id,
      });
    }
    refresh();
  };

  return (
    <button
      onClick={handleLikes}
      className="flex gap-2 items-center text-xs group"
    >
      <Heart
        size={14}
        className={`${
          tweet.user_has_liked_tweet ? "scale-110 " : ""
        } text-gray-500 group-hover:text-red-600 active:scale-90 transition-all cursor-pointer`}
        strokeWidth={tweet.user_has_liked_tweet ? 0 : 2}
        fill={tweet.user_has_liked_tweet ? "#F43F5E" : "none"}
      />
      <p
        className={`${
          tweet.user_has_liked_tweet ? "text-red-600" : "text-gray-600"
        } group-hover:text-red-600 transition-all `}
      >
        {tweet.likes}
      </p>
    </button>
  );
};
