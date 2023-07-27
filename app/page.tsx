import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { formattedDate } from "./lib/utils";
import { Header } from "./components/Header";
import { Sidebar } from "./components/sidebar";

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
    <main className="flex min-h-screen flex-col w-full  items-center">
      <Header />
      <div className="mt-20 flex flex-1  max-w-screen-xl w-full  justify-between fixed">
        <Sidebar />

        <div className="border-x border-gray-700 max-w-screen-sm w-full max-h-screen flex-1 min-h-screen overflow-y-scroll pb-20">
          {[...tweets, ...tweets, ...tweets, ...tweets].map((tweet, i) => (
            <div
              key={`${tweet.id}-${i}}`}
              className="flex flex-col items-center justify-center w-full px-4 py-8 border-gray-700 border-b"
            >
              <h1 className="text-3xl font-bold">{tweet.title}</h1>
              <p className="text-gray-500">
                {formattedDate(new Date(tweet.created_at))}
              </p>
            </div>
          ))}
        </div>

        <div className="xl:flex flex-col flex-1 max-w-[20rem]  py-4 hidden  ">
          <input
            type="text"
            className="w-full px-4 py-2 border-slate-600/70 border bg-transparent placeholder:text-slate-600/40 rounded-lg"
            placeholder="What's happening?"
          />
        </div>
      </div>
    </main>
  );
}
