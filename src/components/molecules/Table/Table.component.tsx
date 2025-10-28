import { flexRender, RowData } from "@tanstack/react-table";
import clsx from "clsx";
import IcSort from "../../atoms/Icons/IcSort.component";
import IcSortAscending from "../../atoms/Icons/IcSortAscending.component";
import IcSortDescending from "../../atoms/Icons/IcSortDescending.component";
import { ITableProps } from "./Table.type";

const Table = <TData extends RowData>({
  table,
  canSelectRow,
  ...props
}: ITableProps<TData>) => {
  return (
    <table className="w-full border-separate" data-testid="table" {...props}>
      <thead data-testid="table-head">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const isPinnedLeft = header.column.getIsPinned() === "left";
              console.log(header.column.getCanSort());

              return (
                <th
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  className={clsx("text-s font-bold px-4 py-6 text-left", {
                    "sticky z-30  bg-neutral-10 border-b border-b-neutral-30 border-r-4 border-r-neutral-20 shadow-sm mr-1":
                      isPinnedLeft,
                    "bg-neutral-20": !isPinnedLeft,
                    "cursor-pointer": header.column.getCanSort(),
                  })}
                  style={{
                    left: isPinnedLeft
                      ? `${header.column.getStart("left")}px`
                      : undefined,
                  }}
                  data-testid="thead"
                  key={header.id}
                >
                  <div className="flex items-center gap-x-1">
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    {header.column.getCanSort() ? (
                      header.column.getNextSortingOrder() === "asc" ? (
                        <IcSort width={16} height={16} />
                      ) : header.column.getNextSortingOrder() === "desc" ? (
                        <IcSortAscending
                          width={16}
                          height={16}
                          data-testid="table-icon-sort-ascending"
                        />
                      ) : (
                        <IcSortDescending
                          width={16}
                          height={16}
                          data-testid="table-icon-sort-descending"
                        />
                      )
                    ) : null}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody data-testid="table-body">
        {table.getRowCount() > 0 &&
          table.getRowModel().rows.map((row) => (
            <tr
              className={clsx(
                "hover:bg-green-4",
                row.getIsSelected() && "bg-green-3"
              )}
              key={row.id}
              data-testid="body-row"
              {...{
                ...(canSelectRow && {
                  onClick: row.getToggleSelectedHandler(),
                }),
              }}
            >
              {row.getVisibleCells().map((cell) => {
                const isPinnedLeft = cell.column.getIsPinned() === "left";
                return (
                  <td
                    className={clsx("p-4 text-m", {
                      "border-b border-b-neutral-30 border-r-4 border-r-neutral-20 sticky bg-neutral-10 z-20 shadow-sm mr-1":
                        isPinnedLeft,
                      "bg-neutral-20": !isPinnedLeft,
                    })}
                    style={{
                      left: isPinnedLeft
                        ? `${cell.column.getStart("left")}px`
                        : undefined,
                    }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
