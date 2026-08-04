import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollProgress from "../components/common/ScrollProgress";
import Cursor from "../components/common/Cursor";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
