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
  handleEdit: (editedUser: any) => void;
}

export const EditUser = ({ item, handleEdit }: Props) => {
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
      username: item.username,
      email: item.email,
      phone: item.phone
    })
    onClose()
  }

  return (
    <div>
      <>
        <Tooltip color="secondary" content="Edit user">
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
                  Edit User
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col">
                    <span>Username:</span>
                    <Input
                      label="Username"
                      value={tempEdit.username}
                      variant="bordered"
                      onChange={(e) => handleFieldChangeEdit('username', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="mr-[10]">Email:</span>
                    <Input
                      label="Email"
                      value={tempEdit.email}
                      variant="bordered"
                      onChange={(e) => handleFieldChangeEdit('email', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Phone Number:</span>
                    <Input
                      label="Phone Number"
                      value={tempEdit.phone}
                      variant="bordered"
                      onChange={(e) => handleFieldChangeEdit('phone', e.target.value)}

                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onClick={() => handleEdit(tempEdit)} onPress={onClose}>
                    Edit User
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
