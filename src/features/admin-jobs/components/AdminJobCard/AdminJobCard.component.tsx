import Button from "@/src/components/atoms/Button";
import { PATHS } from "@/src/constants/paths.constant";
import { currencyFormatter } from "@/src/helpers/currencyFormatter.helper";
import { dateFormatter } from "@/src/helpers/dateFormatter.helper";
import clsx from "clsx";
import Link from "next/link";

interface IAdminJobCard {
  name?: string;
  minimumSalary?: number;
  maximumSalary?: number;
  status?: string;
  createdAt?: string;
  id?: string;
}

const AdminJobCard = ({
  status,
  name,
  minimumSalary,
  maximumSalary,
  createdAt,
  id,
}: IAdminJobCard) => {
  const isActive = status === "active";
  return (
    <div className="shadow-modal p-6 rounded-2xl flex flex-col gap-y-3">
      <div className="flex gap-x-4 items-center">
        <div
          className={clsx("rounded-lg px-4 py-1", {
            "bg-success-surface border border-success-border text-success-main":
              isActive,
            "bg-danger-surface border border-danger-border text-danger-main":
              !isActive,
          })}
        >
          <p className="font-bold text-s md:text-m">
            {isActive ? "Active" : "Inactive"}
          </p>
        </div>
        {createdAt && (
          <div className="py-1 px-4 border border-neutral-40 rounded-sm">
            <p className="text-s md:text-m text-neutral-90">
              Started on {dateFormatter(createdAt).toFormat("DD MMMM YYYY")}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-l md:text-xl font-bold">{name}</p>
        <div className="flex items-center justify-between">
          <p className="text-s md:text-l text-neutral-80">
            {minimumSalary ? currencyFormatter(minimumSalary).toIDR() : null}{" "}
            {minimumSalary && maximumSalary ? "-" : null}{" "}
            {maximumSalary ? currencyFormatter(maximumSalary).toIDR() : null}
          </p>
          {id && (
            <Link href={PATHS.manageJob.replace("[id]", id)}>
              <Button size="small">Manage Job</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminJobCard;
