/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";

import News from "@/models/news";
import { message, status } from "@/constant";

const formatedNew = (NewContainer: {
  image: any;
  label: any; _id: any;
}) => {
  return {
    id: NewContainer._id,
    label: NewContainer.label,
    image: NewContainer.image
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const news = await News.findById(id);
        const getNews = formatedNew(news)

        res.status(status.OK).json({ message: message.OK, news: getNews });
      } catch (error) {
        res.status(status.ERROR).json({ message: message.ERROR.SERVER });
      }
      break;
    case 'PUT':
      try {
        const updatedNews = await News.findById(id);

        if (!updatedNews) {
          return res.status(status.NOT_FOUND).json({ message: message.ERROR.NOT_FOUND })
        } else if (!req.body.label) {
          return res.status(status.BAD_REQUEST).json({ message: message.ERROR.MISS_FIELD })
        }
        updatedNews.label = req.body.label
        //....
        await updatedNews.save()
        const getNews = formatedNew(updatedNews)

        res.status(status.OK).json({ message: message.OK, news: getNews });
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ message: message.ERROR.SERVER });
      }
      break;
    case 'DELETE':
      try {
        await News.findByIdAndDelete(id);

        res.status(status.NO_CONTENT).json({ message: '' });
      } catch (error) {
        res.status(status.ERROR).json({ message: message.ERROR.SERVER });
      }
      break;
    default:
      res.status(status.NOT_ALLOW).json({ message: message.ERROR.NOT_ALLOWED });
  }
}

export default handler
