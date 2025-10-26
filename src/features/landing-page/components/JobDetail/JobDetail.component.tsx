import Button from "@/src/components/atoms/Button";
import Tag from "@/src/components/molecules/Tag";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import useGetJobsQuery from "@/src/hooks/queries/useGetJobsQuery.hook";
import DOMPurify from "isomorphic-dompurify";
import { useSearchParams } from "next/navigation";

const JobDetail = () => {
  const getJobsQuery = useGetJobsQuery();
  const jobs = getJobsQuery.data?.data.data;
  const searchParams = useSearchParams();
  const jobId = searchParams.get(SEARCH_PARAMS.jobId);
  const targetJob = jobs?.find((job) => job.id === jobId);

  return (
    <div className="border border-neutral-40 p-6 rounded-lg flex flex-col gap-y-6 max-h-[calc(100vh-144px)] h-screen overflow-y-auto">
      <div className="flex flex-col gap-y-6 sticky top-0 bg-neutral-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-y-2">
            <Tag
              color="success"
              type="filled"
              size="small"
              label={targetJob?.job_type.name}
            />
            <div>
              <p className="text-xl font-bold">{targetJob?.name}</p>
              <p className="text-m">{targetJob?.recruiter.company_name}</p>
            </div>
          </div>
          <Button variant="alternative-primary">Apply</Button>
        </div>
        <div
          className="mt-6 border-t border-transparent
         [border-image:repeating-linear-gradient(to_right,#e0e0e0_0,#e0e0e0_2px,transparent_2px,transparent_4px)_1]"
        />
      </div>
      {targetJob?.description && (
        <div
          className="dangerously-set-inner-html"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(targetJob?.description),
          }}
        ></div>
      )}
    </div>
  );
};

export default JobDetail;
