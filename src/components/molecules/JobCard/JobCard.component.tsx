import IcMoney from "@/src/components/atoms/Icons/IcMoney.component";
import { SEARCH_PARAMS } from "@/src/constants/searchParams.constant";
import { currencyFormatter } from "@/src/helpers/currencyFormatter.helper";
import { useParamsManager } from "@/src/hooks/useParamsManager.hook";
import clsx from "clsx";
import IcPinpoint from "../../atoms/Icons/IcPinpoint.component";

interface IJobCardProps {
  name?: string;
  companyName?: string;
  minimumSalary?: number;
  maximumSalary?: number;
  isActive?: boolean;
  id?: string;
  city?: string;
}

const JobCard = ({
  name,
  companyName,
  minimumSalary,
  maximumSalary,
  city,
  id,
  isActive,
}: IJobCardProps) => {
  const paramsManager = useParamsManager();
  const handleClick = () =>
    paramsManager.appendParams({ [SEARCH_PARAMS.jobId]: id });
  return (
    <button
      onClick={handleClick}
      type="button"
      className={clsx(
        "flex flex-col gap-y-2 px-4 py-3 rounded-lg bg-neutral-10 border hover:bg-primary-surface hover:border-primary-focus transition text-left",
        isActive ? "border-primary-main" : "border-neutral-40"
      )}
    >
      <div className="flex flex-col">
        <p className="text-l font-bold">{name}</p>
        <p className="text-m">{companyName}</p>
      </div>
      <div
        className="border-t border-transparent
         [border-image:repeating-linear-gradient(to_right,#e0e0e0_0,#e0e0e0_2px,transparent_2px,transparent_4px)_1]"
      />
      {city && (
        <div className="flex items-center gap-x-1">
          <IcPinpoint width={16} height={16} className="text-neutral-80" />
          <p className="text-s text-neutral-80">{city}</p>
        </div>
      )}
      <div className="flex items-center gap-x-1">
        <IcMoney width={16} height={16} className="text-neutral-80" />
        <p className="text-s text-neutral-80">
          {minimumSalary ? currencyFormatter(minimumSalary).toIDR() : null}{" "}
          {minimumSalary && maximumSalary ? "-" : null}{" "}
          {maximumSalary ? currencyFormatter(maximumSalary).toIDR() : null}
        </p>{" "}
      </div>
    </button>
  );
};

export default JobCard;
