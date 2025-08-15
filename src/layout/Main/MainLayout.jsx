import React from "react";
import SideNav from "./Component/SideNav";
import ErrorBoundary from "../../pages/ErrorBoundary";
const MainLayout = () => {
  return (
    <div>
      <ErrorBoundary>
        <div className=" font-roboto ">
          <SideNav />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default MainLayout;
