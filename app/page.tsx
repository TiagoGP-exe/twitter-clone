import { Header } from "@/components/Header";
import { NewTweet } from "@/components/new-tweet";
import { Tweets } from "@/components/tweets";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(user_id)")
    .order("created_at", { ascending: false });

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
        <NewTweet user={session.user} />
        <Tweets tweets={tweets} />
      </div>
    </main>
  );
}
