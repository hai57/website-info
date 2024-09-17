/* eslint-disable prettier/prettier */
'use client'
import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import { EditIcon } from "@/components/icons/table/editIcon";
interface Props {
  item: any
  handleEdit: (editedImage: any) => void;
}

export const EditImage = ({ item, handleEdit }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [tempEdit, setTempEdit] = useState(item)

  const handleFieldChangeEdit = (fieldName: string, value: string) => {
    setTempEdit({
      ...tempEdit,
      [fieldName]: value
    })
  };

  const closeModel = () => {
    setTempEdit({
      label: item.label,
      url: item.url
    })
    onClose()
  }

  return (
    <div>
      <>
        <Tooltip color="secondary" content="Edit image">
          <Button color="primary" variant="light" onPress={onOpen}>
            <EditIcon fill="#979797" size={20} />
          </Button>
        </Tooltip>
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onClose={closeModel}
          onOpenChange={onOpenChange}
        >
          <ModalContent >
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col justify-between">
                  Edit Image
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Title"
                    labelPlacement="outside"
                    value={tempEdit.title}
                    variant="bordered"
                    onChange={(e) => handleFieldChangeEdit('title', e.target.value)}
                  />
                  <Input
                    label="Email"
                    labelPlacement="outside"
                    value={tempEdit.url}
                    variant="bordered"
                    onChange={(e) => handleFieldChangeEdit('url', e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onClick={() => handleEdit(tempEdit)} onPress={onClose}>
                    Edit Image
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
