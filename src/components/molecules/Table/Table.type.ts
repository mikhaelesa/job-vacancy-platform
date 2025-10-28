import { ColumnDef, RowData } from "@tanstack/react-table";

export interface ITableProps<TData extends RowData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}
