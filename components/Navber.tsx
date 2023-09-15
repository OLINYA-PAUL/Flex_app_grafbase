import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/constant";
import Authprovider from "./Authprovider";
import { getCurrentUser } from "@/lib/session";



const Navber =  async () => {
  const session =  await getCurrentUser();
  // console.log(session?.user?.image);
  interface LinkProps {
    href: string;
    key: string;
    text: string;
  }

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
              <ul className="cursor-pointer items-center md:flex hidden ">
                {NavLinks.map(({ href, key, text }: LinkProps) => (
                  <li key={key} className="mr-5  hover:text-red-500">
                    <Link href={href}>{text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {session?.user ? (
              <div className="cursor-pointer flex items-center">
                {session?.user?.image && (
                  <Image
                    src={session?.user?.image}
                    alt={`${session?.user?.image}` || "Profile_photo"}
                    width={35}
                    height={35}
                    className="rounded-full mr-5"
                  />
                )}
                <span>
                  <Link href="/">Share Work</Link>
                </span>
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
