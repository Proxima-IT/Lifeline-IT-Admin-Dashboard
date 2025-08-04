import React from "react";
import SideNav from "./Component/SideNav";
import ErrorBoundary from "../../pages/ErrorBoundary";
const MainLayout = () => {
  return (
    <div>
      <ErrorBoundary>
        <div className="bg-[#f9f9ff] font-roboto lg:p-2">
          <SideNav />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default MainLayout;
