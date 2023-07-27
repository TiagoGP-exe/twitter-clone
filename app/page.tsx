import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { formattedDate } from "./lib/utils";
import { ButtonLogin } from "./components/button-login";

interface Tweet {
  id: string;
  created_at: string;
  title: string;
}

interface SelectQuery<T> {
  data: T[];
}

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data: tweets } = (await supabase
    .from("tweets")
    .select("*")) as SelectQuery<Tweet>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ButtonLogin />
      {tweets.map((tweet) => (
        <div
          key={tweet.id}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-3xl font-bold">{tweet.title}</h1>
          <p className="text-gray-500">
            {formattedDate(new Date(tweet.created_at))}
          </p>
        </div>
      ))}
    </main>
  );
}
