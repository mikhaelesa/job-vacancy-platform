import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Cell, flexRender, RowData } from "@tanstack/react-table";
import clsx from "clsx";
import { CSSProperties } from "react";

const TableCell = <TData extends RowData>({
  cell,
}: {
  cell: Cell<TData, unknown>;
}) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <td
      style={style}
      ref={setNodeRef}
      className={clsx("whitespace-nowrap p-4 text-m")}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

export default TableCell;
