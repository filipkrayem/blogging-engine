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
import IndeterminateCheckbox from "../indeterminateCheckbox";
import classNames from "classnames";
import SvgIcon from "../../ui/svgIcon";
import { PostWithAuthor } from "~/types/post";
//NOTE: when developing an actual app that is going to have a lot of tables,
// I would create a default table component that could be passed props and reused throughout other tables
// Now, since we have only one table and it's time consuming to create a table component
// I'm just going to create the table here.

type PostRows = {
  id: string;
  title: string;
  perex: string;
  author: string;
  commentCount: number;
};

const makeData = (posts: PostWithAuthor[]): PostRows[] => {
  return posts.map((post) => ({
    id: post.id,
    author: post.author.name,
    title: post.title,
    perex: post.content.slice(0, 50).concat("..."),
    commentCount: post._count.comments,
  }));
};

type MyArticlesTableProps = {
  posts: PostWithAuthor[];
};

export default function MyArticlesTable(props: MyArticlesTableProps) {
  const rerender = useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const data = useMemo(() => makeData(props.posts), [props.posts]);

  const columns = useMemo<ColumnDef<PostRows>[]>(
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
        accessorKey: "title",
        header: "Article title",
        size: 250,
        enableResizing: true,
      },
      {
        accessorKey: "perex",
        header: "Perex",
        size: 420,
        enableResizing: true,
      },
      {
        accessorKey: "author",
        header: "Author",
        size: 160,
        enableResizing: true,
      },
      {
        accessorKey: "commentCount",
        header: "# of Comments",
        size: 160,
        enableResizing: true,
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
    columnResizeMode: "onChange",
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
    <div className="p-2 overflow-x-auto">
      <table
        style={{
          width: table.getCenterTotalSize(),
        }}
      >
        <thead className="border-b-2 border-borderLight">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="p-3 font-bold relative"
                    style={{ width: header.getSize() }}
                  >
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
                      <td
                        key={cell.id}
                        className="p-3"
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
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
