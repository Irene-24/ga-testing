import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

interface Props
  extends ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CursiveHeading = ({
  as: Tag = "h3",
  children,
  className = "",
  ...rest
}: Props) => {
  return (
    <Tag
      {...rest}
      className={cn(
        "capitalize font-mairo text-2xl md:text-sheading",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default CursiveHeading;
