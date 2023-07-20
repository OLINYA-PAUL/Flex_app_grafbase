import React from "react";
import Image from "next/image";
import { footerLinks } from "@/constant";
import Link from "next/link";

interface footerProps {
  title: string;
  links: Array<string>;
}

const FooterColumn = ({ title, links }: footerProps) => (
  <div className="footer_column">
    <h1 className="font-semibold text-gray text-[20px] mb-3">{title}</h1>
    <ul className="gap-2 font-normal">
      {links.map((link) => (
        <Link href={link} key={link}>
          <li className="mb-3 hover:text-red-500">{link}</li>
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <section className="flexstart footer-container">
      <div>
        <Image
          src="/logo-purple.svg"
          width={116}
          height={38}
          alt="Footer_leather"
        />
        <div>
          <p className="mt-5">
            {" "}
            Flexibble is the world&apos;s leading community for creatives to{" "}
            <br className="max-sm:hidden" />
            share, grow, and get hired.
          </p>
        </div>
        <div className="flex flex-row justify-between mt-5 md:flex-wrap max-sm:flex-wrap">
          <div className="flexbasis">
            <FooterColumn
              title={footerLinks[0].title}
              links={footerLinks[0].links}
            />
          </div>
          <div className="flexbasis">
            <FooterColumn
              title={footerLinks[3].title}
              links={footerLinks[3].links}
            />
           
          </div>
          <div className="flexbasis">
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
          </div>
          <div className="flexbasis">
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>
            <div className="flexbasis">
            <FooterColumn
              title={footerLinks[6].title}
              links={footerLinks[6].links}
            />
          </div>
          <div className="flexbasis">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
          </div>
           <div className="flexbasis">
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
           
          </div>
        </div>
      </div>
      <div className="flexBetween w-full">
        <div>
          {" "}
          <p>@ 2023 Flexibble. All rights reserved</p>
        </div>
        <div>
          {" "}
          <p className="text-gray">
            <span className="text-black font-semibold">10,214</span> projects
            submitted
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
