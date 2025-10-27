import clsx from "clsx";
import Image from "next/image";

interface IHandPoseProps {
  isActive?: boolean;
  order?: number;
}

const HandPose = ({ isActive, order }: IHandPoseProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center w-[58px] h-[58px]",
        isActive ? "bg-success-surface" : "bg-[#F6F1EB]"
      )}
    >
      <Image
        src={
          isActive
            ? `/images/hand-poses/hand-pose-success-${order}.svg`
            : `/images/hand-poses/hand-pose-${order}.svg`
        }
        width={20}
        height={40}
        alt={`Hand pose ${order}`}
      />
    </div>
  );
};

export default HandPose;
