import React from "react";
import SideNav from './Component/SideNav';
const MainLayout = () => {
  return (
    <div>
      <div className="bg-[#f9f9ff] font-roboto lg:p-2">
        <SideNav />
      </div>
    </div>
  );
};

export default MainLayout;
