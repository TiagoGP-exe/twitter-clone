"use client";

import { useForm } from "react-hook-form";

interface FormValues {
  title: string;
}

const maxChars = 280;

export const TestInput = () => {
  const { register, reset, watch } = useForm<FormValues>();

  const title = watch("title");

  const charachtersLeft = title?.length ?? 0;

  return (
    <div className="flex flex-col w-full ">
      <input
        multiple
        className="bg-inherit flex-1 text-lg leading-loose placeholder:gray-500 pr-2 focus:outline-none max-h-20"
        {...register("title")}
        placeholder="What's happening?!"
        onKeyUp={(e) => {
          if (e.key === "Enter" && charachtersLeft <= maxChars) {
            reset();
          }
        }}
      />
      <div className="flex justify-between text-xs">
        <p className=" text-gray-500">
          {charachtersLeft}/{maxChars}
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full px-4 py-2  font-bold"
        >
          Tweet
        </button>
      </div>
    </div>
  );
};
