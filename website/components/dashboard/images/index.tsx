/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
'use server'

import React, { SetStateAction, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Input } from "@nextui-org/input";

import { AddImage } from "./addImage";

import { siteConfig } from '@/config/site'
import { TableWrapper } from "@/components/dashboard/table/table";
import { useSidebar } from '@/context/sidebarContext'

interface ImagesType {
  id: string;
  title: string;
  url: string;
}

export default function IndexPage() {
  const { isOpen } = useSidebar()
  const columns = [
    {
      name: 'TITLE',
      uid: 'title'
    },
    {
      name: 'URL',
      uid: 'url'
    },
    {
      name: 'ACTIONS',
      uid: 'actions'
    },
  ]

  const [images, setImages] = useState<ImagesType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [newImages, setNewImages] = useState({
    title: "",
    url: "",
  });

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await axios.get("/api/images/route");
        const data = await res.data;

        setIsLoading(false);
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!newImages.title || !newImages.url) {
      toast.error("All fields are necessary");

      return;
    }
    try {
      const res = await axios.post("/api/images/route", {
        title: newImages.title,
        image: newImages.url
      });

      if (res.status === 201) {
        const imagesRes = res.data.new;
        const updatedImages: ImagesType[] = [...images, imagesRes];

        setImages(updatedImages as SetStateAction<ImagesType[]>);
        setNewImages({
          title: "",
          url: "",
        });
        toast.success("Images create success");
      } else {
        toast.error("Images create fail");
      }
    } catch (err) {
      toast.error("Server Error");
      console.log("Errors", err);
    }
  };
  const handleEdit = async (imagesItem: ImagesType) => {
    try {
      const res = await axios.put(`/api/images/route`, {
        id: imagesItem.id,
        title: imagesItem.title,
        image: imagesItem.url,
      });

      if (res.status === 200) {
        const updateImages = res.data.image;
        const imagesIndex = images.findIndex((u: any) => u.id === updateImages.id);

        if (imagesIndex !== -1) {
          images[imagesIndex] = updateImages;
          setImages([...images]);

          toast.success("Image updated success");
        } else {
          console.warn(
            "Image with ID",
            updateImages.id,
            "not found in local state.",
          ); // Handle potential inconsistencies
        }
      } else {
        toast.error("Images updated fail");
      }
    } catch (err) {
      toast.error("Server Error");
      console.log("Errors", err);
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      const res = await axios.delete("/api/images/route", {
        data: {
          imageId: imageId,
        },
      });

      if (res.status === 204) {
        const updatedImages = images.filter((item: any) => item.id !== imageId);

        setImages(updatedImages);
        toast.success("Images delete success");
      } else {
        toast.error("Images delete fail");
      }
    } catch (err) {
      toast.error("Server Error");
      console.log("Errors", err);
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setNewImages({
      ...newImages,
      [fieldName]: value,
    });
  };

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className={`px-12 py-6  h-full transition-all duration-300 z-10 shadow-innerset  ${isOpen ? 'ml-[160]' : 'ml-[48]'}`}>
          <div className='flex items-center mt-4'>
            {<siteConfig.portals.dashboard.images.icon className='text-[#A1A1AA] mr-2' />}
            <span>{siteConfig.portals.dashboard.images.label}</span>
          </div>
          <div className='mb-3'>
            <h1 className='my-3 font-bold text-xl'>{siteConfig.portals.dashboard.images.title}</h1>
            <div className='mb-3 flex justify-between'>
              <div className='flex flex-row gap-3.5 w-[400]'>
                <Input
                  classNames={{
                    input: "w-full",
                    mainWrapper: "w-full",
                  }}
                  placeholder="Search Images"
                />
                <div className='flex flex-row items-center gap-2'>
                  {/* <Settings className='text-[#A1A1AA]' />
                  <DeleteOutlineOutlined className='text-[#A1A1AA]' />
                  <Info className='text-[#A1A1AA]' />
                  <MoreVert className='text-[#A1A1AA]' /> */}
                </div>
              </div>
              <div className="flex flex-row gap-3.5 flex-wrap">
                <AddImage
                  handleFieldChange={handleFieldChange}
                  handleSubmit={handleSubmit}
                  newImages={newImages}
                  setNewImages={setNewImages}
                />
              </div>
            </div>
            <TableWrapper
              columns={columns}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              items={images}
              title="images"
            />
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
