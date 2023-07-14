import { ColumnDef } from "@tanstack/react-table";

//NOTE: this would be the place to store the default, bare table that would take props and be reused throughout the app

type TableProps<T> = {
  columns: ColumnDef<T>[];
  ///...
};

export default function Table<T>(_props: TableProps<T>) {
  return <div>table</div>;
}
