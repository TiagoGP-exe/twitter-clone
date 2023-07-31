import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TweetList from "@/components/tweet-list";
import { Header } from "@/components/Header";

export const dynamic = "force-dynamic";

interface Props {
  params: { id?: string };
  searchParams: {};
}

export default async function Home({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const id = params?.id;

  if (!id) {
    redirect("/");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(user_id)")
    .match({ id })
    .order("created_at", { ascending: false });

  if (error) {
    redirect("/");
  }

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: tweet.likes.some(
        (like) => like.user_id === session?.user.id
      ),
      likes: tweet.likes.length,
    })) ?? [];

  return (
    <main className="flex min-h-screen flex-col flex-1 justify-center items-center">
      <Header />
      <div className="border-x max-w-screen-sm min-h-screen w-full pt-16 dark:border-foreground/30">
        <TweetList tweets={tweets} />
      </div>
    </main>
  );
}
