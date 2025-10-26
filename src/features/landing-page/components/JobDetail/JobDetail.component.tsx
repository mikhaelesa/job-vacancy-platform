import Button from "@/src/components/atoms/Button";
import IcArrowLeft from "@/src/components/atoms/Icons/IcArrowLeft.component";
import Tag from "@/src/components/molecules/Tag";
import ErrorBoundary from "@/src/components/templates/ErrorBoundary";
import { PATHS } from "@/src/constants/paths.constant";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import clsx from "clsx";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useJobDetailManager from "../../hooks/useJobDetailManager.hook";
import ErrorNoJobSelected from "../ErrorNoJobSelected";

const JobDetail = () => {
  const manager = useJobDetailManager();
  const searchParams = useSearchParams();

  return (
    <div
      className={clsx(
        "border border-neutral-40 rounded-lg flex flex-col gap-y-6 max-h-[calc(100vh-144px)] h-screen overflow-y-auto",
        !manager.jobId && "max-md:hidden"
      )}
    >
      <ErrorBoundary
        isError={!manager.targetJob}
        errorComponent={<ErrorNoJobSelected />}
      >
        <div className="flex flex-col gap-y-6 sticky top-0 bg-neutral-10 p-6 pb-0">
          <button
            className="cursor-pointer w-fit flex items-center gap-x-2"
            onClick={manager.getClickBackHandler}
          >
            <IcArrowLeft width={16} height={16} />
            <span className="text-m">Back</span>
          </button>
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-y-2">
              <Tag
                color="success"
                type="filled"
                size="small"
                label={manager.targetJob?.job_type.name}
              />
              <div>
                <p className="text-xl font-bold">{manager.targetJob?.name}</p>
                <p className="text-m">
                  {manager.targetJob?.recruiter.company_name}
                </p>
              </div>
            </div>
            {manager.canApply && (
              <Link
                href={PATHS.applyJob.replace(
                  "[id]",
                  searchParams.get(SEARCH_PARAMS.jobId) || ""
                )}
              >
                <Button variant="alternative-primary">Apply</Button>
              </Link>
            )}
          </div>
          <div
            className="mt-6 border-t border-transparent
         [border-image:repeating-linear-gradient(to_right,#e0e0e0_0,#e0e0e0_2px,transparent_2px,transparent_4px)_1]"
          />
        </div>
        {manager.targetJob?.description && (
          <div
            className="dangerously-set-inner-html p-6 pt-0"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(manager.targetJob?.description),
            }}
          />
        )}
      </ErrorBoundary>
    </div>
  );
};

export default JobDetail;
