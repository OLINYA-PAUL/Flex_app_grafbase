import React from "react";
import Image from "next/image";
import { footerLinks } from "@/constant";
import Link from "next/link";

interface linkProps {
  title: string;
  links: Array<string>;
}

const FooterItemsLinks = ({ title, links }: linkProps) => (
  <div className="items-start justify-start self-start sm:flex-1 w-full mr-5">
    <div className="font-bold text-gray text-[20px] mt-3 mr-3 ">{title}</div>
    <div>
      <ul className="mt-5 ">
        {links &&
          links.map((links, index) => (
            <li
              className="mt-3 text-sm cursor-pointer hover:border-b-[1px] hover:border-red-50"
              key={index}
            >
              <Link href={`/${links}`}>{links}</Link>
            </li>
          ))}
      </ul>
    </div>
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
        <div className="w-full md:flex-nowrap  mt-5 h-auto flex items-start justify-start flex-1 self-start">
          <div >
            <FooterItemsLinks
              title={footerLinks[0].title}
              links={footerLinks[0].links}
            />
          </div>
          <div >
            <FooterItemsLinks
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
          </div>
          <div>
            <FooterItemsLinks
              links={footerLinks[2].links}
              title={footerLinks[2].title}
            />
          </div>
          <div>
            <FooterItemsLinks
              title={footerLinks[3].title}
              links={footerLinks[3].links}
            />
          </div>
          <div>
            <FooterItemsLinks
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
          </div>
          <div>
            <FooterItemsLinks
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>
          <div> <FooterItemsLinks
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
          </div>
        </div>
      </div>
      <div className="flexBetween w-full text-white  pb-5 ">
        <div>
          {" "}
          <p>@ 2023 Flexibble. All rights reserved</p>
        </div>
        <div>
          {" "}
          <p>
            <span className="font-semibold">10,214</span> projects submitted
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
