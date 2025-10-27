import Image from "next/image";

interface IJobSent {
  companyName: string;
}

const JobSent = ({ companyName }: IJobSent) => {
  return (
    <div className="h-dvh w-vh flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-[606px] gap-y-4">
        <div>
          <Image
            src={"/images/success-states/application-sent.svg"}
            width={214}
            height={214}
            alt="Sent illustration"
          />
        </div>
        <div className="text-center">
          <p className="text-heading-m font-bold">
            🎉 Your application was sent!
          </p>
          <p className="text-l">
            Congratulations! You&apos;ve taken the first step towards a
            rewarding career at {companyName}. We look forward to learning more
            about you during the application process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobSent;
