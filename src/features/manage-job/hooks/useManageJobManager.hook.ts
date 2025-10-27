import useGetJobApplicantsQuery from "@/src/hooks/queries/useGetJobApplicantsQuery.hook";
import useGetJobQuery from "@/src/hooks/queries/useGetJobQuery.hook";
import {
  ColumnPinningState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { createApplicantsTableColumns } from "../constants/createApplicantsTableColumns.constant";

// eslint-disable-next-line @typescript-eslint/no-array-constructor
const EMPTY_ARR = new Array();

const useManageJobManager = () => {
  const params = useParams<{ id: string }>();
  const jobId = params.id;
  const jobApplicantsQuery = useGetJobApplicantsQuery(jobId);
  const jobApplicants = jobApplicantsQuery.data?.data.data;
  const jobQuery = useGetJobQuery(jobId);
  const job = jobQuery.data?.data.data;
  const isLoading = jobApplicantsQuery.isLoading || jobQuery.isLoading;
  const columns = useMemo(() => createApplicantsTableColumns(), []);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["1"],
  });
  const table = useReactTable({
    columns,
    data: jobApplicants || EMPTY_ARR,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnPinning,
    },
    onColumnPinningChange: setColumnPinning,
  });

  return { job, table, isLoading };
};

export default useManageJobManager;
