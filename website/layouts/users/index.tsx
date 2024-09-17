/* eslint-disable prettier/prettier */
import 'react-toastify/dist/ReactToastify.css';

import Hero from "@/components/home/hero";
import UseNavbar from "@/components/users/navbar/useNavbar";
import ProtectedRoute from "@/components/protectedRoute";

export interface ProvidersProps {
  children: React.ReactNode;
}

export default function LayoutUsers({ children }: ProvidersProps) {

  return (
    <ProtectedRoute>
      <Hero />
      <UseNavbar />
      {children}
    </ProtectedRoute >
  );
}

