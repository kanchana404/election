import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="p-6 flex">
      <Link href="/">
        <h1 className="text-3xl font-bold text-red-700">Online චන්දය </h1>
      </Link>

      <div className="ml-auto space-x-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button
            className=" text-white rounded-xl hover:bg-red-700"
            asChild
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
