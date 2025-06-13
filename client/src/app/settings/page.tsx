import Header from "@/components/Header";
import React from "react";

export const settings = () => {
  const userSettings = {
    userName: "shady",
    email: "shady.admin@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };
  const lableStyled = "block text-sm font-medium dark:text-white";
  const textStyled =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";
  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className=" space-y-4">
        <div>
          <label className={lableStyled}>Username</label>
          <div className={textStyled}>{userSettings.userName}</div>
        </div>
         <div>
          <label className={lableStyled}>Email</label>
          <div className={textStyled}>{userSettings.email}</div>
        </div>
         <div>
          <label className={lableStyled}>Team</label>
          <div className={textStyled}>{userSettings.teamName}</div>
        </div>
         <div>
          <label className={lableStyled}>Roles</label>
          <div className={textStyled}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};
export default settings;
