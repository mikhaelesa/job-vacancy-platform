import { debounce } from "@/src/helpers/debounce.helper";
import { Column, RowData } from "@tanstack/react-table";

interface ITableFilterProps<TData extends RowData> {
  column: Column<TData, unknown>;
}

const TableFilter = <TData extends RowData>({
  column,
}: ITableFilterProps<TData>) => {
  if (!column.getCanFilter()) return null;

  const handleChange = debounce(
    (e) => column.setFilterValue(e.target.value),
    300
  );

  return (
    <input
      className="border p-1 rounded-sm"
      onChange={handleChange}
      placeholder={`Search...`}
      type="text"
    />
  );
};

export default TableFilter;
