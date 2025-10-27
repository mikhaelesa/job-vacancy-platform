import { RowData, Table } from "@tanstack/react-table";
import { ReactNode } from "react";

export interface ITableProps<TData extends RowData> {
  table: Table<TData>;
  errorMessage?: string | (() => ReactNode);
  isLoading?: boolean;
  canSelectRow?: boolean;
}
