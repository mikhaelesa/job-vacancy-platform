import { debounce } from "@/src/helpers/debounce.helper";
import { StringFormatter } from "@/src/helpers/stringFormatter.helper";
import { Column, RowData } from "@tanstack/react-table";
import { useMemo } from "react";

interface ITableFilterProps<TData extends RowData> {
  column: Column<TData, unknown>;
}

const TableFilter = <TData extends RowData>({
  column,
}: ITableFilterProps<TData>) => {
  const sortedUniqueValues = useMemo(
    () =>
      Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.getFacetedUniqueValues()]
  );

  if (!column.getCanFilter()) return null;
  const meta = (column.columnDef.meta ?? {}) as {
    filterVariant: string;
    options: string[];
  };
  const handleChange = debounce(
    (e) => column.setFilterValue(e.target.value),
    300
  );

  if (meta.filterVariant === "select")
    return (
      <select
        className="border p-1 rounded-sm"
        onChange={(e) => column.setFilterValue(e.target.value)}
      >
        <option value="">All</option>
        {sortedUniqueValues.map(
          (value) =>
            value && (
              <option value={value} key={value}>
                {StringFormatter.capitalize(value)}
              </option>
            )
        )}
      </select>
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
