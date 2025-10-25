import Button from "@/src/components/atoms/Button";
import Image from "next/image";

interface ISideCTAProps {
  onClickCreateNewJob?: () => void;
}

const SideCTA = ({ onClickCreateNewJob }: ISideCTAProps) => {
  return (
    <aside className="max-md:hidden">
      <div className="flex flex-col gap-y-6 p-6 rounded-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-black before:opacity-[0.72] before:z-10">
        <div className="overflow-hidden absolute inset-0">
          <Image
            src="/images/bg-create-job.jpg"
            width={300}
            height={300}
            alt="Background"
          />
        </div>
        <div className="flex flex-col gap-y-1 z-10">
          <p className="whitespace-nowrap text-neutral-40 text-xl font-bold">
            Recruit the best candidates
          </p>
          <p className="text-neutral-10 text-m font-bold">
            Create jobs, invite, and hire with ease
          </p>
        </div>
        <Button onClick={onClickCreateNewJob} size="large" className="z-10">
          Create a new job
        </Button>
      </div>
    </aside>
  );
};

export default SideCTA;
