/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
'use client'
import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
} from "@nextui-org/react";

interface Props {
  setNewImages: any
  newImages: any,
  handleFieldChange: any,
  handleSubmit: any
}

export const AddImage = ({ setNewImages, newImages, handleFieldChange, handleSubmit }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const closeModel = () => {
    setNewImages({
      title: '',
      url: ''
    })
    onClose()
  }

  return (
    <div>
      <>
        <Button color="primary" onPress={onOpen}>
          Add Images
        </Button>
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onClose={closeModel}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Images
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Title"
                    labelPlacement="outside"
                    value={newImages.title}
                    variant="bordered"
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                  />
                  <Input
                    label="url"
                    labelPlacement="outside"
                    value={newImages.url}
                    variant="bordered"
                    onChange={(e) => handleFieldChange('url', e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={closeModel}>
                    Close
                  </Button>
                  <Button color="primary" onClick={(e) => handleSubmit(e)} onPress={closeModel}>
                    Add Images
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
