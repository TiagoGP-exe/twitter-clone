import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Icons } from "./Icons";
import { FC } from "react";
import {
  createClientComponentClient,
  createServerActionClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

interface TweetMoreButtonProps {
  tweetId: string;
  isOwner: boolean;
}

export const TweetMoreButton: FC<TweetMoreButtonProps> = ({
  tweetId,
  isOwner,
}) => {
  const supabase = createClientComponentClient<Database>();
  const onDelete = async () => {
    await supabase.from("tweets").delete().match({ id: tweetId });
  };

  const onEdit = async () => {
    await supabase
      .from("tweets")
      .update({
        title: "edited",
      })
      .match({ id: tweetId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-gray-500 active:scale-90 transition-all cursor-pointer border border-transparent rounded-sm  hover:border-foreground/30 p-1">
          <MoreHorizontal size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isOwner ? (
          <>
            <DropdownMenuItem onClick={async () => await onDelete()}>
              <Icons.trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onEdit}>
              <Icons.edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
