import "./globals.css";
import Navbar from "@/components/navbar";
import OverviewPage from "./overview/page";

export const metadata = {
  title: "HackYourFuture"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <OverviewPage />
        {children}
      </body>
    </html>
  );
}
