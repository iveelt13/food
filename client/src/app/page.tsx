// import { FoodMenu } from '@/components/FoodMenu'
import { FooterForHome } from "@/components/FooterForHome";
import HeaderForHome from "@/components/HeaderForHome";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-[#404040]">
      <HeaderForHome />
      <div className="w-full h-[700px] relative">
        <Image src="/Home.png" alt="Main" layout="fill" />
      </div>
      {/* <FoodMenu/> */}
      <FooterForHome />
    </div>
  );
};

export default HomePage;
