import { IJobApplicantsSuccessResponse } from "@/src/dto/jobApplicants.dto";
import { StringFormatter } from "@/src/helpers/stringFormatter.helper";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const createApplicantsTableColumns = (): ColumnDef<
  IJobApplicantsSuccessResponse["data"][0]
>[] => [
  {
    id: "1",
    cell: ({ row }) => row.original.full_name,
    header: "FULL NAME",
  },
  { id: "2", cell: ({ row }) => row.original.email, header: "EMAIL" },
  {
    id: "3",
    cell: ({ row }) => `0${row.original.phone_number}`,
    header: "PHONE NUMBER",
  },
  {
    id: "4",
    cell: ({ row }) => row.original.date_of_birth || "-",
    header: "DATE OF BIRTH",
  },
  {
    id: "5",
    cell: ({ row }) => row.original.province?.name || "-",
    header: "DOMICILE",
  },
  {
    id: "6",
    cell: ({ row }) =>
      row.original.gender
        ? StringFormatter.capitalize(row.original.gender)
        : "-",
    header: "GENDER",
  },
  {
    id: "7",
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
  },
];
