"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { HandPlatter } from "lucide-react";

const HeaderForHome = () => {
  const { push } = useRouter();

  return (
    <div className="bg-black px-[88px] py-4 flex justify-between">
      <div className="flex gap-3 cursor-pointer">
        <HandPlatter
          onClick={() => push("/")}
          className="text-red-500 fill-red-500"
        />

        <div>
          <p className="text-white">
            Nom <span className="text-[#EF4444]">Nom</span>
          </p>
          <p className="text-white">Swift Delivery</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          className="flex rounded-full text-[14px] font-medium px-3 py-2 bg-white text-black"
          onClick={() => push("/signup")}
        >
          Sign Up
        </Button>
        <Button
          className="flex rounded-full text-[14px] font-medium px-3 py-2 bg-red-500"
          onClick={() => push("/login")}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default HeaderForHome;
