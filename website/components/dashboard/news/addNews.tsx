/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
'use client'
import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";
import axios from "axios";

interface Props {
  setNewNews: any
  label: string,
  handleFieldChange: any,
  handleSubmit: any
}

export const AddNews = ({ setNewNews, label, handleFieldChange, handleSubmit }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/images/route')
        const data = await res.data
        const filteredImages = data.images.filter((image: any) => image.title === 'topic');

        setImages(filteredImages)
      } catch (err) {
        console.log('Error fetching data', err);
      }
    };

    fetchData()
  }, [])

  const closeModel = () => {
    setNewNews({
      label: '',
      url: ''
    })
    onClose()
  }

  return (
    <div>
      <>
        <Button color="primary" onPress={onOpen}>
          Add News
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
                  Add News
                </ModalHeader>
                <ModalBody>
                  <Select
                    items={images}
                    label="Image"
                    labelPlacement="outside"
                    placeholder="Select image "
                    renderValue={(items) => {
                      return items.map((item) => (
                        <div key={item.key} className="flex items-center ">
                          {/* <Image
                            width={50}
                            height={50}
                            alt='image'
                            src={item.data.image}
                          /> */}
                          <p>{item.data.url}</p>
                        </div>
                      ));
                    }}
                    size="lg"
                    variant="bordered"
                    onChange={(e) => handleFieldChange('url', e.target.value)}
                  >
                    {(image: any) => (
                      <SelectItem key={image.id} textValue='none' >
                        <div className="flex gap-2 items-center">
                          <Image
                            alt='image'
                            height="0"
                            sizes="100vw"
                            src={image.url}
                            style={{ width: '90px', height: 'auto' }}
                            width="0"
                          />

                        </div>
                      </SelectItem>
                    )}
                  </Select>
                  <Textarea
                    label="Label"
                    labelPlacement="outside"
                    value={label}
                    variant="bordered"
                    onChange={(e) => handleFieldChange('label', e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={closeModel}>
                    Close
                  </Button>
                  <Button color="primary" onClick={(e) => handleSubmit(e)} onPress={closeModel}>
                    Add News
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
