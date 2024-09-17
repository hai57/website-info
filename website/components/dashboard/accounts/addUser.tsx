/* eslint-disable prettier/prettier */
'use client'
import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

interface UserType {
  username: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
}
interface Props {
  setNewUser: any
  newUser: UserType
  handleSubmit: any
  handleFieldChange: any
}

export const AddUser = ({ setNewUser, newUser, handleSubmit, handleFieldChange }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const closeModel = () => {
    setNewUser({
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
    onClose()
  }

  return (
    <div>
      <>
        <Button color="primary" onPress={onOpen}>
          Add User
        </Button>
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onClose={closeModel}
          onOpenChange={onOpenChange}
        >
          <ModalContent >
            {() => (
              <>
                <ModalHeader className="flex flex-col justify-between">
                  Add User
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col">
                    <Input
                      label="Email"
                      labelPlacement="outside"
                      value={newUser.email}
                      variant="bordered"
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Input
                      label="Username"
                      labelPlacement="outside"
                      value={newUser.username}
                      variant="bordered"
                      onChange={(e) => handleFieldChange('username', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Input
                      label="Phone Number"
                      labelPlacement="outside"
                      value={newUser.phone}
                      variant="bordered"
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Input
                      label="Password"
                      labelPlacement="outside"
                      type="password"
                      value={newUser.password}
                      variant="bordered"
                      onChange={(e) => handleFieldChange('password', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Input
                      label="Confirm Password"
                      labelPlacement="outside"
                      type="password"
                      value={newUser.confirmPassword}
                      variant="bordered"
                      onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={closeModel}>
                    Close
                  </Button>
                  <Button color="primary" onClick={(e) => handleSubmit(e)} onPress={closeModel}>
                    Add User
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
