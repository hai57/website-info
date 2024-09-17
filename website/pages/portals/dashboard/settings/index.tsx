/* eslint-disable prettier/prettier */
import React from "react";

import DefaultLayoutDashboard from "@/layouts/dashboard/default";
import SettingsDashboard from "@/components/dashboard/settings";

const Settings = () => {
  return (
    <DefaultLayoutDashboard>
      <SettingsDashboard />
    </DefaultLayoutDashboard >
  );
};

export default Settings

