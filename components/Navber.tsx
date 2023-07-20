import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/constant";
import Authprovider from "./Authprovider";

const Navber = () => {
  interface LinkProps {
    href: string;
    key: string;
    text: string;
  }
  const Login = {};

  return (
    <div>
      <header>
        <nav className=" flex justify-between items-center w-full height-fit p-3 px-5 shadow-md">
          <div className="flex items-center">
            <Link href="/" className="mr-5">
              <Image
                src="/logo.svg"
                height={43}
                width={115}
                alt="Flexible_logo"
                className="cursor-pointer"
              />
            </Link>
            <div>
              <ul className="items-center md:flex hidden ">
                {NavLinks.map(({ href, key, text }: LinkProps) => (
                  <li className="mr-5 cursor-pointer hover:text-red-500">
                    <Link href={href} key={key}>
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {Login ? (
              <div className="cursor-pointer">
                Login {'  '}
                <Link href="/">Share Your Work</Link>
              </div>
            ) : (
              <div>
                <Authprovider />
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navber;
