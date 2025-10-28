import IcSort from "@/src/components/atoms/Icons/IcSort.component";
import IcSortAscending from "@/src/components/atoms/Icons/IcSortAscending.component";
import IcSortDescending from "@/src/components/atoms/Icons/IcSortDescending.component";
import { Header } from "@tanstack/react-table";

interface ISorterProps<TData> {
  header: Header<TData, unknown>;
}

function Sorter<TData>({ header }: ISorterProps<TData>) {
  const canSort = header.column.getCanSort();
  if (!canSort) return null;

  const nextSortingOrder = header.column.getNextSortingOrder();

  return (
    <button
      onClick={header.column.getToggleSortingHandler()}
      type="button"
      className="p-1 cursor-pointer"
    >
      {nextSortingOrder === "asc" && <IcSort width={16} height={16} />}
      {nextSortingOrder === "desc" && (
        <IcSortAscending width={16} height={16} />
      )}
      {nextSortingOrder !== "desc" && nextSortingOrder !== "asc" && (
        <IcSortDescending width={16} height={16} />
      )}
    </button>
  );
}

export default Sorter;
