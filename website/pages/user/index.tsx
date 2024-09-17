/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { SetStateAction, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Input } from "@nextui-org/input";
import {
  DeleteOutlineOutlined,
  Info,
  MoreVert,
  Settings,
} from "@mui/icons-material";

import { AddNews } from "@/components/dashboard/news/addNews";
import LayoutUsers from "@/layouts/users";
import { TableWrapper } from "@/components/users/table/tableNews";

interface NewsType {
  id: string;
  label: string;
  image: string;
  url: string;
}

export default function IndexPage() {
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
          // Update the user at the found index
          news[newsIndex] = updateNews;

          // Update the state with the modified users array (assuming users is a state variable)
          setNews([...news]);

          toast.success("User updated success");
        } else {
          console.warn(
            "User with ID",
            updateNews.id,
            "not found in local state.",
          ); // Handle potential inconsistencies
        }
      } else {
        toast.error("User updated fail");
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

  return (
    <LayoutUsers>
      {isLoading ? (
        <div>Loading ...</div> // Display loading indicator while fetching
      ) : (
        <div className="flex justify-center ">
          <div className="w-[1000]">
            <div className="mb-3">
              <h1 className="my-3 font-bold text-xl">NEWS</h1>
              <div className="mb-3 flex justify-between">
                <div className="flex flex-row gap-3.5 w-[400]">
                  <Input
                    classNames={{
                      input: "w-full",
                      mainWrapper: "w-full",
                    }}
                    placeholder="Search news"
                  />
                  <div className="flex flex-row items-center gap-2">
                    <Settings className="text-[#A1A1AA]" />
                    <DeleteOutlineOutlined className="text-[#A1A1AA]" />
                    <Info className="text-[#A1A1AA]" />
                    <MoreVert className="text-[#A1A1AA]" />
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
          </div>
          <ToastContainer />
        </div>
      )}
    </LayoutUsers>
  );
}
