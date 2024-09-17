/* eslint-disable prettier/prettier */
import React from "react";

import DefaultLayoutDashboard from "@/layouts/dashboard/default";
import HomeDashboard from '@/components/dashboard'

const Dashboard = () => {
  return (
    <DefaultLayoutDashboard>
      <HomeDashboard />
    </DefaultLayoutDashboard >
  );
};

export default Dashboard

