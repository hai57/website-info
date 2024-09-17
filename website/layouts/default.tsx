/* eslint-disable prettier/prettier */
import Header from "./header";
import Footer from "./footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <main className=" mx-auto max-w-7xl px-6 flex-grow pt-2">
        {/* {children} */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
