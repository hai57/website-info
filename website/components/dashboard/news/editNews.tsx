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
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import axios from "axios";

import { EditIcon } from "@/components/icons/table/editIcon";

interface Props {
  item: any
  handleEdit: (news: any) => void;
}

export const EditNews = ({ item, handleEdit }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [images, setImages] = useState([])
  const [tempEdit, setTempEdit] = useState(item)

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


  const handleFieldChangeEdit = (fieldName: string, value: string) => {
    console.log(fieldName)
    console.log(value)
    setTempEdit({
      ...tempEdit,
      [fieldName]: value
    })
  };

  const closeModel = () => {
    setTempEdit({
      label: item.label,
      image: item.image
    })
    onClose()
  }

  return (
    <div>
      <>
        <Tooltip color="secondary" content="Edit news">
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
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit News
                </ModalHeader>
                <ModalBody>
                  <Select
                    defaultSelectedKeys={[tempEdit.image]}
                    items={images}
                    label="Label"
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
                    onChange={(e) => handleFieldChangeEdit('image', e.target.value)}
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
                    value={tempEdit.label}
                    variant="bordered"
                    onChange={(e) => handleFieldChangeEdit('label', e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onClick={() => handleEdit(tempEdit)} onPress={onClose}>
                    Edit News
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
