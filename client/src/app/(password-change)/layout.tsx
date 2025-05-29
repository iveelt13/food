import { UserContextProvider } from "@/provider/UserProvider";
import { PropsWithChildren } from "react";

const UserPage = ({ children }: PropsWithChildren) => {
  return (
    <UserContextProvider>
      <div className="flex justify-center items-center gap-15 mt-30">
        <div>{children}</div>
        <div className="w-1/2  ">
          <img
            className="rounded-lg"
            src="https://learn.g2.com/hubfs/food%20delivery%20tech%20gloss-ai.jpg"
            alt=""
          />
        </div>
      </div>
    </UserContextProvider>
  );
};

export default UserPage;
