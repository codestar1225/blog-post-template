"use client";

import useVerifyAuth from "@/hooks/userVerifyAuth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Header = () => {
  const { loading, isAuth } = useVerifyAuth();
  const router = useRouter();
  const handleAuth = async () => {
    if (!isAuth) {
      router.push("/login");
    } else {
      await signOut({ callbackUrl: "/" });
      Cookies.remove("token");
      Cookies.remove("reqUrl");
      Cookies.remove("user");
    }
  };
  if (loading) return;
  return (
    <>
      <header className="flex justify-between py-5 px-5 tracking-wider">
        <a
          href="/blog"
          className="rounded-lg border-foreground border px-3 py-1 bg-foreground text-background"
        >
          View Blogs
        </a>
        <button
          onClick={handleAuth}
          className="rounded-lg border-foreground border px-3 py-1 bg-foreground text-background"
        >
          {isAuth ? "Logout" : "Login"}
        </button>
      </header>
    </>
  );
};
export default Header;
