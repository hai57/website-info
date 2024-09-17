/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
'use server'
import React, { SetStateAction, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Input } from "@nextui-org/input";
// import {
//   DeleteOutlineOutlined,
//   Info,
//   MoreVert,
//   Settings,
// } from "@mui/icons-material";

import { AddNews } from "./addNews";

import { siteConfig } from '@/config/site'
import { TableWrapper } from "@/components/dashboard/table/table";
import { useSidebar } from '@/context/sidebarContext'

interface NewsType {
  id: string;
  label: string;
  image: string;
  url: string;
}

export default function IndexPage() {
  const { isOpen } = useSidebar()
  const columns = [
    {
      name: 'URL',
      uid: 'url'
    },
    {
      name: 'LABEL',
      uid: 'label'
    },
    {
      name: 'ACTIONS',
      uid: 'actions'
    },
  ]

  const [news, setNews] = useState<NewsType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [newNews, setNewNews] = useState({
    label: "",
    url: "",
  });

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await axios.get("/api/news/route");
        const data = await res.data;

        setIsLoading(false);
        setNews(data.news);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!newNews.label || !newNews.url) {
      toast.error("All fields are necessary");

      return;
    }
    try {
      const res = await axios.post("/api/news/route", {
        label: newNews.label,
        image: newNews.url
      });

      if (res.status === 201) {
        const newsRes = res.data.new;
        const updatedNews: NewsType[] = [...news, newsRes];

        setNews(updatedNews as SetStateAction<NewsType[]>);
        setNewNews({
          label: "",
          url: "",
        });
        toast.success("News create success");
      } else {
        toast.error("News create fail");
      }
    } catch (err) {
      toast.error("Server Error");
      console.log("Errors", err);
    }
  };
  const handleEdit = async (newsItem: NewsType) => {
    try {
      const res = await axios.put(`/api/news/route`, {
        id: newsItem.id,
        label: newsItem.label,
        image: newsItem.image,
      });

      if (res.status === 200) {
        const updateNews = res.data.new;
        const newsIndex = news.findIndex((u: any) => u.id === updateNews.id);

        if (newsIndex !== -1) {
          news[newsIndex] = updateNews;
          setNews([...news]);

          toast.success("News updated success");
        } else {
          console.warn(
            "News with ID",
            updateNews.id,
            "not found in local state.",
          ); // Handle potential inconsistencies
        }
      } else {
        toast.error("News updated fail");
      }
    } catch (err) {
      toast.error("Server Error");
      console.log("Errors", err);
    }
  };

  const handleDelete = async (newsId: string) => {
    try {
      const res = await axios.delete("/api/news/route", {
        data: {
          newsId: newsId,
        },
      });

      if (res.status === 204) {
        const updatedNews = news.filter((item: any) => item.id !== newsId);

        setNews(updatedNews);
        toast.success("News delete success");
      } else {
        toast.error("News delete fail");
      }
    } catch (err) {
      toast.error("Server Error");
      console.log("Errors", err);
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setNewNews({
      ...newNews,
      [fieldName]: value,
    });
  };

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div> // Display loading indicator while fetching
      ) : (
        <div className={`px-12 py-6  h-full transition-all duration-300 z-10 shadow-innerset  ${isOpen ? 'ml-[160]' : 'ml-[48]'}`}>
          <div className='flex items-center mt-4'>
            {<siteConfig.portals.dashboard.news.icon className='text-[#A1A1AA] mr-2' />}
            <span>{siteConfig.portals.dashboard.news.label}</span>
          </div>
          <div className='mb-3'>
            <h1 className='my-3 font-bold text-xl'>{siteConfig.portals.dashboard.news.title}</h1>
            <div className='mb-3 flex justify-between'>
              <div className='flex flex-row gap-3.5 w-[400]'>
                <Input
                  classNames={{
                    input: "w-full",
                    mainWrapper: "w-full",
                  }}
                  placeholder="Search news"
                />
                <div className='flex flex-row items-center gap-2'>
                  {/* <Settings className='text-[#A1A1AA]' />
                  <DeleteOutlineOutlined className='text-[#A1A1AA]' />
                  <Info className='text-[#A1A1AA]' />
                  <MoreVert className='text-[#A1A1AA]' /> */}
                </div>
              </div>
              <div className="flex flex-row gap-3.5 flex-wrap">
                <AddNews
                  handleFieldChange={handleFieldChange}
                  handleSubmit={handleSubmit}
                  label={newNews.label}
                  setNewNews={setNewNews}
                />
              </div>
            </div>
            <TableWrapper
              columns={columns}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              items={news}
              title="news"
            />
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
