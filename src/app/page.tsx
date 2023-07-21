"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { COOKIE_KEY } from "@/utils/constants";
import { getCookie } from "cookies-next";

export default function Home() {

  const { push } = useRouter();
  const userDataCookie = getCookie(COOKIE_KEY); 

  useEffect(() => {
    if (userDataCookie) {
      push("/dashboard");
    } else {
      push("/login");
    }
  }, [push, userDataCookie]);

  return <p></p>;
}
