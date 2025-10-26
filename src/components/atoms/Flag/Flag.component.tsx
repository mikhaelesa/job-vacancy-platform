import Image from "next/image";
import type { ComponentProps } from "react";

interface IFlag extends Omit<ComponentProps<typeof Image>, "alt" | "src"> {
  code?: string;
}

const Flag = ({ code, height = 24, width = 24, ...props }: IFlag) => {
  return (
    <Image
      height={height}
      width={width}
      {...props}
      alt="flag-icon"
      loading="eager"
      src={`https://hatscripts.github.io/circle-flags/flags/${code}.svg`}
    />
  );
};

export default Flag;
