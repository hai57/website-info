/* eslint-disable prettier/prettier */
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRouteAdmin from "@/components/protectedRouteAdmin";
import { SidebarProvider } from '@/context/sidebarContext';
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import NavbarDashboard from "@/components/dashboard/navbar/navbar";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export default function DefaultLayoutDashboard({ children, themeProps }: ProvidersProps) {

  return (
    <ProtectedRouteAdmin>
      <NextThemesProvider
        attribute='class'
        defaultTheme='system'
        {...themeProps}>
        <SidebarProvider>
          <Sidebar />
          <NavbarDashboard />
          {children}
        </SidebarProvider>
      </NextThemesProvider>
    </ProtectedRouteAdmin >
  );
}

