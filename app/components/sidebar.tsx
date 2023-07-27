"use client";

import Image from "next/image";
import { useUser } from "../hooks/useUser";

export const Sidebar = () => {
  const { user } = useUser();

  const valideUser = {
    fullName: user?.user_metadata.full_name,
    avatar: user?.user_metadata.avatar_url,
    email: user?.email,
    username: user?.user_metadata.user_name.toLowerCase(),
  };

  return (
    <div className=" sm:flex flex-col  w-full max-w-[16rem] hidden ">
      <div className="flex flex-col py-4  pl-2 xl:pl-0 ">
        <div className="flex items-center gap-x-3 gap-y-4 flex-wrap justify-center lg:justify-start ">
          <Image
            src={valideUser.avatar}
            alt="avatar"
            width={42}
            height={42}
            className="rounded-full"
          />
          <div className="text-center lg:text-left hidden sm:block">
            <p className=" text-white/70 leading-6 truncate max-w-[16rem]">
              {valideUser.fullName}
            </p>
            <div className="text-white/30 text-sm flex items-center   select-none">
              <p className="text-lg leading-1">@ </p>
              {valideUser?.username}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
