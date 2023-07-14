import React, { useMemo, useReducer } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import IndeterminateCheckbox from "./indeterminateCheckbox";
import classNames from "classnames";
import SvgIcon from "../ui/svgIcon";

//NOTE: this would be the place to store the default, bare table that would take props and be reused throughout the app

type TableProps<T> = {
  columns: ColumnDef<T>[];
  ///...
};

export default function Table<T>(_props: TableProps<T>) {
  return <div>table</div>;
}
