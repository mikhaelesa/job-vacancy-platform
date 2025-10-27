import Image from "next/image";

const NoApplicantsError = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-6 min-h-[calc(100dvh-64px)]">
      <Image
        src={"/images/empty-states/no-candidates.svg"}
        width={300}
        height={300}
        alt="No applicants illustration"
      />
      <div className="flex flex-col gap-y-1">
        <p className="text-l font-bold text-center">No candidates found</p>
        <p className="text-neutral-70 text-center">
          Share your job vacancies so that more candidates will apply.
        </p>
      </div>
    </div>
  );
};

export default NoApplicantsError;
