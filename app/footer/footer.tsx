import Image from "next/image";
import Footer from "rc-footer";
import "rc-footer/assets/index.css";
import type { FooterColumn } from "rc-footer/lib/column";
function FooterComp() {
  return (
    <Footer
      className="mt-4 bg-primary-lime-green"
      columns={[
        {
          items: [
            {
              icon: (
                <Image
                  height={60}
                  width={60}
                  alt="Footuane logo"
                  src={"/logo193.png"}
                />
              ),
              title: "Footuane",
              url: "https://footuane.vercel.app",
              description: "Your Way To Football",
              openExternal: true,
            },
          ],
        },
      ]}
      bottom="Made By Safouane"
    />
  );
}

export default FooterComp;
