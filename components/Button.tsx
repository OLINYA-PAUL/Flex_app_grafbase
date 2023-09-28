import Image from "next/image";
import React, { MouseEventHandler } from "react";

interface buttonProps {
  title: string;
  leftIcon?: boolean | string;
  rightIcon?: boolean | string;
  isSummiting?: boolean;
  type?: "button" | "submit";
  bgColour?: string;
  textColour?: string;
  handleClick?: MouseEventHandler;
}

const Button = ({
  title,
  type,
  isSummiting,
  leftIcon,
  rightIcon,
  bgColour,
  textColour,
  handleClick,
}: buttonProps) => {
  return (
    <div>
      <button
        type={type || "button"}
        onClick={handleClick}
        disabled={isSummiting}
        className={`
         ${textColour ? `text-${textColour}` : "text-white"}
         ${isSummiting ? "bg-red-400" : bgColour ? bgColour : "bg-purple-600"}
        flexCenter px-8 py-3 mt-5 outline-none border-none gap-3 rounded-md font-bold`}
      >
        {leftIcon && (
          //@ts-ignore
          <Image src={leftIcon} width={20} height={20} alt="leftIcon" />
        )}
        {title}
        {rightIcon && (
          //@ts-ignore
          <Image src={rightIcon} width={20} height={20} alt="leftIcon" />
        )}
      </button>
    </div>
  );
};
export default Button;
