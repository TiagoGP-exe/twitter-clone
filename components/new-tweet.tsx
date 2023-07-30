import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { TestInput } from "./test-input";

export const dynamic = "force-dynamic";

export const NewTweet = ({ user }: { user: User }) => {
  const addTweet = async (formData: FormData) => {
    "use server";
    const title = String(formData.get("title"));

    const supabase = createServerActionClient<Database>({ cookies });

    await supabase.from("tweets").insert({
      title,
      user_id: user?.id,
    });
  };

  return (
    <form className="p-4 border-b" action={addTweet}>
      <div className="flex items-center gap-4">
        <div>
          <Image
            src={user.user_metadata.avatar_url}
            alt="user avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>

        <TestInput />
      </div>
    </form>
  );
};
