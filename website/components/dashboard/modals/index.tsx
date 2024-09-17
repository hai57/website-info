/* eslint-disable prettier/prettier */
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

interface Props {
  columns: any
  title: string
  setNewItem: any
  newItem: any
  handleSubmit: any
  handleFieldChange: any
}

export const AddUser = ({ columns, title, setNewItem, newItem, handleSubmit, handleFieldChange }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const closeModel = () => {
    setNewItem()
    onClose()
  }

  return (
    <div>
      <>
        <Button color="primary" onPress={onOpen}>
          {title}
        </Button>
        <Modal
          hideCloseButton={true}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
        >
          <ModalContent >
            {() => (
              <>
                <ModalHeader className="flex flex-col justify-between">
                  {title}
                </ModalHeader>
                <ModalBody>
                  {/* <div className="flex flex-col">
                    <span className="mr-[10]">Email:</span>
                    <Input
                      label="Email"
                      value={newUser.email}
                      variant="bordered"
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Username:</span>
                    <Input
                      label="Username"
                      value={newUser.username}
                      variant="bordered"
                      onChange={(e) => handleFieldChange('username', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Phone Number:</span>
                    <Input
                      label="Phone Number"
                      value={newUser.phone}
                      variant="bordered"
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Password:</span>
                    <Input
                      label="Password"
                      type="password"
                      value={newUser.password}
                      variant="bordered"
                      onChange={(e) => handleFieldChange('password', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Confirm Password:</span>
                    <Input
                      label="Confirm Password"
                      type="password"
                      value={newUser.confirmPassword}
                      variant="bordered"
                      onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                    />
                  </div> */}
                  {columns.map((column: any, index: any) => {
                    <div key={index}>
                      <div className="flex flex-col">
                        <span>{column.span}</span>
                        <Input
                          label={column.label}
                          type={column.type}
                          value={column.value}
                          variant="bordered"
                          onChange={(e) => handleFieldChange(column.fieldName, e.target.value)}
                        />
                      </div>
                    </div>
                  })
                  }
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
