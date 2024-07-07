import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ButtonLogin } from "../../components/button-login";
import Image from 'next/image';

export const dynamic = "force-dynamic";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">

      <main className='flex flex-col max-w-screen-lg w-full justify-center items-center border h-full border-x'>
        <Image
          src="/assets/brand-logo.svg"
          alt="logo"
          width={200}
          height={200}
          className="mb-8 hidden"
        />
        <Image
          src="/assets/brand-logo-dark.svg"
          alt="logo"
          width={200}
          height={200}
          className="mb-8  dark:hidden"
        />

        <ButtonLogin />
      </main>
    </div>
  );
}
