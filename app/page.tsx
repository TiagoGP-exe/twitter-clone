import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { formattedDate } from "./lib/utils";
import { Header } from "./components/Header";
import { Sidebar } from "./components/sidebar";
import { redirect } from "next/navigation";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

const maxName2 = (name: string) => {
  const [first, last] = name.split(" ");
  return `${first} ${last}`;
};

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: tweets } = await supabase
    .from("tweets")
    .select("*, profiles(*)");

  console.log(tweets);

  return (
    <main className="flex min-h-screen flex-col w-full  items-center">
      <Header />
      <div className="mt-20 flex flex-1  max-w-screen-xl w-full  justify-between fixed">
        <Sidebar />

        <div className="border-x border-gray-700 max-w-screen-sm w-full max-h-screen flex-1 min-h-screen overflow-y-scroll pb-20">
          {tweets?.map((tweet, i) => (
            <div
              key={`${tweet.id}-${i}}`}
              className="flex  w-full px-4 py-6 border-gray-700 border-b gap-y-4 justify-start items-start gap-4"
            >
              <Image
                src={tweet?.profiles?.avatar_url!}
                width={36}
                height={36}
                className="rounded-full"
                alt={tweet?.profiles?.name!}
              />
              <div className="flex flex-col items-start w-full">
                <div className="flex justify-between w-full items-center text-gray-500">
                  <div className="flex gap-1 items-center">
                    <p className="font-bold text-sm text-white">
                      {maxName2(tweet?.profiles?.name!)}
                    </p>
                    <p className="text-sm">
                      @{tweet?.profiles?.username.toLowerCase()}
                    </p>
                    {"•"}
                    <p className=" text-xs">
                      {formattedDate(new Date(tweet.created_at))}
                    </p>
                  </div>
                  <MoreHorizontal
                    className="text-gray-500 active:scale-90 transition-all cursor-pointer"
                    size={16}
                  />
                </div>
                <p className="text-sm">{tweet.title}</p>
              </div>
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
