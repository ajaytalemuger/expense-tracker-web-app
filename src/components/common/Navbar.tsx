"use client";

import Image from "next/image";
import Link from "next/link";
import settingsIcon from "../../../public/svgs/settings.svg";
import logoutIcon from "../../../public/svgs/logout.svg";
import { useRouter } from "next/navigation";
import useUserData from "@/hooks/useUserData";
import { deleteCookie } from 'cookies-next';
import { COOKIE_KEY } from "@/utils/constants";

export default function Navbar() {

  const router = useRouter();

  const { clearUserData } = useUserData();

  const onLogout = () => {

    // clear user data from localStorage
    clearUserData();

    // delete user token from cookies
    deleteCookie(COOKIE_KEY);

    // redirect to login page
    router.push("/login");
  };

  return (
    <nav className="flex p-4 justify-between flex-wrap bg-[#b5d5fc] mb-5 items-center shadow-md">
      <div className="flex gap-9">
        <Link className="font-bold text-xl" href="/dashboard">
          Expense
        </Link>
        <Link className="mt-[3px]" href="/dashboard">
          Dashboard
        </Link>
      </div>
      <div className="flex gap-8">
        {/* <Link href="/settings" className="mt-1">
          <Image src={settingsIcon} alt="Settings" />
        </Link> */}
        <button className="mt-1" onClick={onLogout} title="Logout">
          <Image src={logoutIcon} alt="Logout" />
        </button>
      </div>
    </nav>
  );
}
