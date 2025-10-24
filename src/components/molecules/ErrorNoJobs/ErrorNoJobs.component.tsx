import Button from "@/src/components/atoms/Button";
import Image from "next/image";

interface IErrorNoJobsProps {
  onClickCreateNewJob?: () => void;
}

const ErrorNoJobs = ({ onClickCreateNewJob }: IErrorNoJobsProps) => {
  return (
    <div className="flex flex-col gap-y-3 items-center justify-center h-full min-h-[calc(100dvh-64px)]">
      <div>
        <Image
          src={"/images/empty-states/no-jobs.svg"}
          width={306}
          height={300}
          alt="No Jobs"
        />
      </div>
      <div className="flex flex-col gap-y-1 items-center">
        <p className="text-heading-s font-bold text-neutral-90">
          No job openings available
        </p>
        <p className="text-l text-neutral-90 text-center">
          Create a job opening now and start the candidate process.
        </p>
      </div>
      <Button
        onClick={onClickCreateNewJob}
        size="large"
        variant="alternative-primary"
      >
        Create a new job
      </Button>
    </div>
  );
};

export default ErrorNoJobs;
