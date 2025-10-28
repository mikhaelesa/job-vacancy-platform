import { IJobApplicantsSuccessResponse } from "@/src/dto/jobApplicants.dto";
import { dateFormatter } from "@/src/helpers/dateFormatter.helper";
import { StringFormatter } from "@/src/helpers/stringFormatter.helper";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const createApplicantsTableColumns = (): ColumnDef<
  IJobApplicantsSuccessResponse["data"][0]
>[] => [
  {
    id: "1",
    accessorFn: (data) => data.full_name,
    accessorKey: "full_name",
    cell: ({ row }) => row.original.full_name,
    header: "FULL NAME",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "2",
    accessorFn: (data) => data.email,
    accessorKey: "email",
    cell: ({ row }) => row.original.email,
    header: "EMAIL",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "3",
    accessorFn: (data) => data.phone_number,
    accessorKey: "phone_number",
    cell: ({ row }) => `0${row.original.phone_number}`,
    header: "PHONE NUMBER",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "4",
    accessorFn: (data) =>
      data.date_of_birth
        ? dateFormatter(data.date_of_birth).toFormat("DD MMMM YYYY")
        : "",
    accessorKey: "date_of_birth",
    cell: ({ row }) =>
      row.original.date_of_birth
        ? dateFormatter(row.original.date_of_birth).toFormat("DD MMMM YYYY")
        : "-",
    header: "DATE OF BIRTH",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "5",
    accessorFn: (data) => data.province?.name,
    accessorKey: "province",
    cell: ({ row }) => row.original.province?.name || "-",
    header: "DOMICILE",
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "6",
    accessorFn: (data) => data.gender,
    accessorKey: "gender",
    cell: ({ row }) =>
      row.original.gender
        ? StringFormatter.capitalize(row.original.gender)
        : "-",
    header: "GENDER",
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    id: "7",
    accessorFn: (data) => data.linkedin,
    accessorKey: "linkedin",
    cell: ({ row }) =>
      row.original.linkedin ? (
        <Link
          target="_blank"
          className="text-primary-main"
          href={row.original.linkedin}
        >
          {row.original.linkedin}
        </Link>
      ) : (
        "-"
      ),
    header: "LINKEDIN",
    enableSorting: true,
    enableColumnFilter: true,
  },
];
