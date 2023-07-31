"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useForm } from "react-hook-form";

interface FormValues {
  title: string;
}

const maxChars = 280;

export const TestInput = () => {
  const { register, reset, watch } = useForm<FormValues>();

  const matches = useMediaQuery("(max-width: 640px)");

  const title = watch("title");

  const charachtersLeft = title?.length ?? 0;

  const correctNumber = matches ? 45 : 70;

  const rows = charachtersLeft ? Math.ceil(charachtersLeft / correctNumber) : 1;

  return (
    <div className="flex flex-col w-full ">
      <textarea
        maxLength={maxChars}
        className="bg-inherit resize-none text-lg leading-loose placeholder:gray-500 pr-2 focus:outline-none max-w-[100%] flex"
        {...register("title")}
        placeholder="What's happening?!"
        rows={rows}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />
      <div className="flex justify-between text-xs">
        <p className=" text-gray-500">
          {charachtersLeft}/{maxChars}
        </p>
        <button
          type="submit"
          onClick={() => {
            const time = setTimeout(() => {
              reset();
            }, 100);

            return () => clearTimeout(time);
          }}
          className="bg-blue-500 text-white rounded-full px-4 py-2  font-bold transition-all active:scale-90"
        >
          Tweet
        </button>
      </div>
    </div>
  );
};
