import Image from "next/image";
import { ComponentProps } from "react";

interface IAvatarProps {
  src?: ComponentProps<typeof Image>["src"];
}

const Avatar = ({ src = "https://picsum.photos/200" }: IAvatarProps) => {
  return (
    <div className="w-7 h-7 rounded-full overflow-hidden border border-neutral-40">
      <Image src={src} width={200} height={200} alt="profile" />
    </div>
  );
};

export default Avatar;
