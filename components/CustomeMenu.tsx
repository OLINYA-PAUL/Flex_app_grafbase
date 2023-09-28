import React from "react";
import { Menu } from "@headlessui/react";
import Image from "next/image";

interface customeProps {
  title: string;
  filters: Array<string>;
  state: string;
  setState: (value: string) => void;
}

const CustomeMenu = ({ title, filters, state, setState }: customeProps) => {
  return (
    <div className="w-full flexStart flex-col relative gap-10">
      <label htmlFor={title} className="w-full text-white">
        <div className="text-white mt-2 font-bold"> {}</div>
      </label>
      <Menu as="div" className="self-start relative">
        <div>
          <Menu.Button className="flexCenter custome_button outline-none bottom-0 bg-transparent">
            {state || "Selete a category"}
            <Image
              src="/arrow-down.svg"
              width={15}
              height={15}
              alt="arrow menu"
              className="ml-3 text-white"
            />
          </Menu.Button>
        </div>
        <div>
          <Menu.Items className="flexStart custom_menu-items">
            {filters.map((tags) => (
              <Menu.Item key={tags}>
                <button
                  type="button"
                  value={tags}
                  onClick={(e) => setState(e.currentTarget.value)}
                  className="custom_menu-item "
                >
                  {tags}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </div>
      </Menu>
    </div>
  );
};

export default CustomeMenu;
