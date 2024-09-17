/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
'use client'
import React from "react"
import { Chip, Tooltip, User } from "@nextui-org/react"
import Image from "next/image"

import { EditNews } from "@/components/dashboard/news/editNews"
import { DeleteIcon } from "@/components/icons/table/deleteIcon"
import { EyeIcon } from "@/components/icons/table/eyeIcon"
import { EditUser } from "@/components/dashboard/accounts/editUser"
import { EditImage } from "@/components/dashboard/images/editImage"

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
    case "username":
      return (
        <User
          avatarProps={{
            src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
          }}
          name={cellValue}
        >
          {item.username}
        </User>
      )
    case "email":
      return (
        <div>
          <div>
            <span>{item.email}</span>
          </div>
        </div>
      )
    case "phone":
      return (
        <div>
          {/* <Chip
            color="warning"
            size="sm"
            variant="flat"
          > */}
          <div>
            <span>{cellValue}</span>
          </div>
          {/* </Chip> */}
        </div>
      )
    case "status":
      return (
        <Chip
          color={
            cellValue === "active"
              ? "success"
              : cellValue === "paused"
                ? "danger"
                : "warning"
          }
          size="sm"
          variant="flat"
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      )
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
            {title === 'news' ? (
              <EditNews handleEdit={handleEdit} item={item} />

            ) : title === 'users' ? (
              <EditUser handleEdit={handleEdit} item={item} />
            ) : title === 'images' ? (
              <EditImage handleEdit={handleEdit} item={item} />
            ) : (
              <p>No matching</p>
            )
            }
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
