"use client";

import { useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { getItem, removeItem, setItem } from "@/utils/localstorage";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Header = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  //cutstomized sign in
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      const isLogin = getItem("isLogin");
      if (session && isLogin) {
        removeItem("isLogin");
        // const res = await login(session.idToken);
        // if ("token" in res) {
        //   if ("user" in res) {
        //     Cookies.set("user", JSON.stringify(res.user));
        //   }
        //   // Successfully authenticated and save token
        //   Cookies.set("token", res.token, { expires: 4 });
        //   //check the there was request routing url
        //   const reqUrl = Cookies.get("reqUrl");
        //   Cookies.remove("reqUrl");
        //   toast.success(res.message, {
        //     autoClose: 2000,
        //     onClose: () => router.push(`${reqUrl ? `${reqUrl}` : "/"}`),
        //   });
        // } else {
        //   // Authentication failed, handle error
        //   toast.error(res.message || "Something went wrong", {
        //     autoClose: 2000,
        //   });
        // }
      }
      toast.success('Successful', {
        autoClose: 2000,       
      });
    };
    fetchSession();
  }, []);
  const handleLogIn = async () => {
    if (loading) return;
    try {
      await signIn("google", { redirect: false });
      setItem("isLogin", true);
      console.log("success google sigin in");
    } catch (error) {
      console.error("Failed google signup", error);
    }
  };

  return (
    <>
      <header className="flex justify-end py-5 px-5">
        <button
          onClick={handleLogIn}
          className="rounded-lg border-foreground border px-3"
        >
          Log In by Google
        </button>
      </header>
    </>
  );
};
export default Header;
