/* eslint-disable prettier/prettier */
import React from "react";

import DefaultLayoutDashboard from "@/layouts/dashboard/default";
import NewsDashboard from "@/components/dashboard/news";

const News = () => {
  return (
    <DefaultLayoutDashboard>
      <NewsDashboard />
    </DefaultLayoutDashboard >
  );
};

export default News

