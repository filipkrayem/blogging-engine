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
};

export default function Table<T>(props: TableProps<T>) {
  const { columns: _cols } = props;
  const rerender = useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        header: "Status",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className="">
        <thead className="border-b-2 border-borderLight">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="p-3 font-bold"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className={classNames(
                          "flex flex-row gap-2 items-center",
                          {
                            "cursor-pointer select-none":
                              header.column.getCanSort(),
                          }
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <SvgIcon
                            name="sort-column"
                            size={16}
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="p-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  );
}

const data: Person[] = [
  {
    firstName: "Freddy",
    lastName: "Langosh",
    age: 18,
    visits: 504,
    progress: 94,
    createdAt:
      "Fri Jul 14 2023 00:02:25 GMT+0200 (Central European Summer Time)",
    status: "relationship",
  },
  {
    firstName: "Ward",
    lastName: "Hintz",
    age: 19,
    visits: 981,
    progress: 84,
    createdAt:
      "Fri Jul 14 2023 17:03:38 GMT+0200 (Central European Summer Time)",
    status: "relationship",
  },
  {
    firstName: "Lincoln",
    lastName: "Hansen",
    age: 11,
    visits: 33,
    progress: 21,
    createdAt:
      "Fri Jul 14 2023 17:43:26 GMT+0200 (Central European Summer Time)",
    status: "complicated",
  },
  {
    firstName: "Rossie",
    lastName: "Ernser",
    age: 3,
    visits: 219,
    progress: 48,
    createdAt:
      "Fri Jul 14 2023 01:41:16 GMT+0200 (Central European Summer Time)",
    status: "single",
  },
  {
    firstName: "Antoinette",
    lastName: "Nader",
    age: 19,
    visits: 188,
    progress: 12,
    createdAt:
      "Fri Jul 14 2023 03:39:19 GMT+0200 (Central European Summer Time)",
    status: "complicated",
  },
  {
    firstName: "Brittany",
    lastName: "Quigley",
    age: 11,
    visits: 649,
    progress: 28,
    createdAt:
      "Fri Jul 14 2023 00:26:14 GMT+0200 (Central European Summer Time)",
    status: "relationship",
  },
  {
    firstName: "Baylee",
    lastName: "Reinger",
    age: 24,
    visits: 908,
    progress: 77,
    createdAt:
      "Fri Jul 14 2023 20:31:11 GMT+0200 (Central European Summer Time)",
    status: "relationship",
  },
  {
    firstName: "Camryn",
    lastName: "Abshire",
    age: 27,
    visits: 721,
    progress: 57,
    createdAt:
      "Fri Jul 14 2023 16:19:10 GMT+0200 (Central European Summer Time)",
    status: "single",
  },
  {
    firstName: "Roosevelt",
    lastName: "Durgan",
    age: 38,
    visits: 864,
    progress: 44,
    createdAt:
      "Fri Jul 14 2023 08:41:28 GMT+0200 (Central European Summer Time)",
    status: "complicated",
  },
  {
    firstName: "Shakira",
    lastName: "Aufderhar",
    age: 1,
    visits: 47,
    progress: 22,
    createdAt:
      "Fri Jul 14 2023 05:54:56 GMT+0200 (Central European Summer Time)",
    status: "relationship",
  },
];
