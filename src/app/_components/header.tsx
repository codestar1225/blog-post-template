"use client";

import { useState } from "react";
import { getSession, signIn } from "next-auth/react";

const Header = () => {
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleLogIn = async () => {
    if (loading) return;
    try {
      await signIn("google", { redirect: false });
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
