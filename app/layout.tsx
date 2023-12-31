import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Navbar_main from "./navbar/navbar_main";
import StyledComponentsRegistry from "./lib/AntdRegistry";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./styles/globals.css";
import "./styles/loader.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FooterComp from "./footer/footer";
const inter = Oswald({
  subsets: ["latin"],
  weight: ["200", "200", "300", "400", "500", "600", "700"],
  variable: "--font-Oswald",
});
config.autoAddCss = false;
export const metadata: Metadata = {
  title: "Footuane",
  description:
    "Real-Time Football fixtures,leagues standings,live trackings and more ",
  verification: {
    google: "LzNzvYAHhE6tc2UNc2QTuzyPXYXBRPazjikMbWF7Y44",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          components: {},
          token: {
            fontFamily: "var(--font-Oswald)",
            colorBgElevated: "#F1F2EB",
            colorLink: "#F1F2EB",
          },
        }}
      >
        <body className={inter.className + " md:bg-fixed " + inter.variable}>
          <StyledComponentsRegistry>
            <Navbar_main />
            <div className="container min-h-screen mx-auto font-light ">
              {children}
            </div>
            <FooterComp />
          </StyledComponentsRegistry>
        </body>
      </ConfigProvider>
    </html>
  );
}
