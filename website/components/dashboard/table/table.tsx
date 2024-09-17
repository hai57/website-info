/* eslint-disable prettier/prettier */
'use client'
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { RenderCell } from "./renderCell";
interface IdType {
  (id: string): Promise<void>
}

export const TableWrapper: React.FC<{ title: string, columns: any, items: any[]; handleDelete: IdType; handleEdit: (newsItem: any) => void }> = ({ title, columns, items, handleDelete, handleEdit }) => {

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="table" >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              hideHeader={column.uid === "actions"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>
                  <RenderCell columnKey={columnKey} handleDelete={handleDelete} handleEdit={handleEdit} item={item} title={title} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

  );
};
