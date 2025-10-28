import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useState } from "react";
import Button from "../../atoms/Button";
import IcUniconChevronLeft from "../../atoms/Icons/IcUniconChevronLeft.component";
import IcUniconChevronRight from "../../atoms/Icons/IcUniconChevronRight.component";
import SelectInput from "../../organisms/SelectInput";
import TableCell from "./components/TableCell.component";
import TableHeader from "./components/TableHeader.component";
import { ITableProps } from "./Table.type";

// eslint-disable-next-line @typescript-eslint/no-array-constructor
const EMPTY_ARR = new Array();

const Table = <TData extends RowData>({
  columns,
  data,
  ...props
}: ITableProps<TData>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((column) => column.id!)
  );

  const table = useReactTable({
    columns,
    data: data || EMPTY_ARR,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      columnOrder,
      pagination,
    },
    onPaginationChange: setPagination,
    onColumnOrderChange: setColumnOrder,
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  return (
    <>
      <div className="overflow-x-auto">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <table
            className="w-full border-separate"
            data-testid="table"
            {...props}
          >
            <thead data-testid="table-head">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <SortableContext
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHeader header={header} key={header.id} />
                    ))}
                  </SortableContext>
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
                  >
                    {row.getVisibleCells().map((cell) => (
                      <SortableContext
                        key={cell.id}
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        <TableCell cell={cell} key={cell.id} />
                      </SortableContext>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </DndContext>
      </div>
      <div className="flex sticky bottom-0 bg-neutral-10 max-md:flex-col mx-auto md:items-center gap-2 p-4">
        <div className="flex max-md:justify-between items-center gap-x-2">
          <p className="text-m">
            Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
            {table.getRowCount().toLocaleString()} Rows
          </p>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={table.previousPage}
              disabled={!table.getCanPreviousPage()}
              variant="outlined"
              className="px-1!"
            >
              <IcUniconChevronLeft />
            </Button>
            <p className="text-m">
              {table.getState().pagination.pageIndex + 1} /{" "}
              {table.getPageCount().toLocaleString()}
            </p>
            <Button
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}
              variant="outlined"
              className="px-1!"
            >
              <IcUniconChevronRight />
            </Button>
          </div>
        </div>
        <SelectInput
          direction="top"
          defaultSelected={{ label: "Show 10", value: "10" }}
          options={[
            { label: "Show 5", value: "5" },
            { label: "Show 10", value: "10" },
            { label: "Show 15", value: "15" },
            { label: "Show 20", value: "20" },
            { label: "Show All", value: table.getRowCount().toString() },
          ]}
          onChange={(e) => table.setPageSize(Number(e.value))}
        />
      </div>
    </>
  );
};

export default Table;
