import { useUser } from "@/hooks/useUser";
import { formattedDate } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TweetMoreButton } from "./tweet-more-button";
import { Likes } from "./likes";
import { useState } from "react";
import { TestInput } from "./test-input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const maxName2 = (name: string) => {
  const [first, last] = name.split(" ");
  return `${first} ${last}`;
};

interface FormProps {
  title: string;
}

export const Tweet = ({
  tweet,
  addOptimisticTweet,
}: {
  tweet: TweetWithAuthor;
  addOptimisticTweet: (newTweet: TweetWithAuthor) => void;
}) => {
  const [enableEditState, setEnableEditState] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const editTweet = async (values: FormProps) => {
    const { title } = values;

    const supabase = createClientComponentClient<Database>();

    await supabase.from("tweets").update({ title }).match({ id: tweet.id });
  };

  return (
    <div className="flex relative flex-1 px-4 py-6 border-b gap-4 justify-start items-start last:border-b-0 dark:border-foreground/30 ">
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
          {tweet.author.id === user?.id && !enableEditState && (
            <TweetMoreButton
              onEdit={() => setEnableEditState(true)}
              isOwner={true}
              tweetId={tweet.id}
            />
          )}
        </div>
        {enableEditState ? (
          <TestInput
            initialTitle={tweet.title}
            cancel={() => setEnableEditState(false)}
            edit
            onSubmit={editTweet}
          />
        ) : (
          <p className="text-sm flex-1 max-w-[90%] mt-1 break-all">
            {tweet.title}
          </p>
        )}
        {!enableEditState && (
          <div className="flex gap-4 items-center mt-4">
            <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
          </div>
        )}
      </div>

      <div
        onClick={() => router.push(`/tweet/${tweet.id}`)}
        className=" absolute top-0 left-0 right-0 bottom-0 -z-10"
      ></div>
    </div>
  );
};
