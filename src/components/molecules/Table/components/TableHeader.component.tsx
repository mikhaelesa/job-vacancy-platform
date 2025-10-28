import IcArrowsHorizontal from "@/src/components/atoms/Icons/IcArrowsHorizontal.component";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Header, RowData, flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import { CSSProperties } from "react";
import Sorter from "./Sorter.component";

const TableHeader = <TData extends RowData>({
  header,
}: {
  header: Header<TData, unknown>;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th
      colSpan={header.colSpan}
      ref={setNodeRef}
      style={style}
      className={clsx("text-s font-bold px-4 py-5 text-left whitespace-nowrap")}
      data-testid="thead"
      key={header.id}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {!header.isPlaceholder &&
              flexRender(header.column.columnDef.header, header.getContext())}
            <Sorter header={header} />
          </div>
          <button className="p-1" {...attributes} {...listeners}>
            <IcArrowsHorizontal width={16} height={16} />
          </button>
        </div>
      </div>
    </th>
  );
};
export default TableHeader;
