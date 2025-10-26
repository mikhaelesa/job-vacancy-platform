import Image from "next/image";

const ErrorNoJobSelected = () => {
  return (
    <div className="p-6 flex flex-col gap-y-4 items-center h-full justify-center">
      <Image
        src={"/images/empty-states/no-jobs.svg"}
        width={300}
        height={300}
        alt="No job"
      />
      <div className="flex flex-col gap-y-1 items-center">
        <p className="text-heading-s font-bold text-neutral-90">
          No job selected.
        </p>
        <p className="text-l text-neutral-90 text-center">
          Please select a job and view it here.
        </p>
      </div>
    </div>
  );
};

export default ErrorNoJobSelected;
