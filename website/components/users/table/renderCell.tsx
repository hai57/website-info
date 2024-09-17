/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React from "react"
import { Tooltip } from "@nextui-org/react"
import Image from "next/image"

import { EditNews } from "./editNew"

import { DeleteIcon } from "@/components/icons/table/deleteIcon"
import { EyeIcon } from "@/components/icons/table/eyeIcon"
import { EditUser } from "@/components/dashboard/accounts/editUser"

interface IdType {
  (id: string): Promise<void>
}
interface Props {
  title: string
  item: any
  columnKey: string | React.Key
  handleDelete: IdType
  handleEdit: (item: any) => void
}

export const RenderCell = ({ title, item, columnKey, handleDelete, handleEdit }: Props) => {


  // @ts-ignore
  const cellValue = item[columnKey]

  switch (columnKey) {
    case "url":
      return (
        <Image
          alt="Image"
          height="0"
          sizes="100vw"
          src={item?.url}
          style={{ width: '90px', height: 'auto' }}
          width="0"
        />
      )
    case "label":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
        </div>
      )

    case "actions":
      return (
        <div className="flex justify-end items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => console.log("View", item.id)}>
                <EyeIcon fill="#979797" size={20} />
              </button>
            </Tooltip>
          </div>
          <div>
            <EditNews handleEdit={handleEdit} item={item} />
          </div>
          <div>
            <Tooltip
              color="danger"
              content="Delete"
              onClick={() => console.log("Delete", item.id)}
            >
              <button onClick={() => handleDelete(item.id)}>
                <DeleteIcon fill="#FF0080" size={20} />
              </button>
            </Tooltip>
          </div>
        </div>
      )
    default:
      return cellValue
  }
}
