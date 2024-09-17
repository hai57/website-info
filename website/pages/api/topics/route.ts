/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";

// import { verifyToken } from "@/middlewares";
import connectMongoDB from "@/lib/mongo/mongodb";
import Topics from "@/models/topics";
import { message, status } from "@/constant";

const formatedTopic = (topics: {
  newsContainer: any;
  title: any; _id: any;
}) => {
  return {
    id: topics._id,
    title: topics.title,
    newsContainer: topics.newsContainer.map((link: { _id: any; newsId: any; }) => ({
      _id: link._id,
      newsId: link.newsId
    }))
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    await connectMongoDB();

    if (req.method === 'POST') {
      try {
        const newTopic = new Topics({
          title: req.body.title,
          newsContainer: req.body.newsContainer?.map((link: { newsId: any; }) => {
            return {
              newsId: link.newsId
            }
          })
        })

        await newTopic.save()

        return res.status(status.CREATED).json({ message: message.CREATED, topics: newTopic });
      } catch (err) {
        console.log(err)

        return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err })
      }
    } else if (req.method === 'GET') {
      try {
        const topics = await Topics.aggregate([
          {
            $lookup: {
              from: 'news',
              localField: 'newsContainer.newsId',
              foreignField: '_id',
              as: 'newsDetails'
            }
          },
          {
            $unwind: '$newsDetails'
          },
          {
            $lookup: {
              from: 'images',
              localField: 'newsDetails.image',
              foreignField: '_id',
              as: 'imageDetails'
            }
          },
          {
            $group: {
              _id: '$_id',
              title: { $first: '$title' },
              newsContainer: {
                $push: {
                  newsId: '$newsDetails._id',
                  label: '$newsDetails.label',
                  image: { $arrayElemAt: ['$imageDetails.image', 0] }
                }
              }
            }
          },
          {
            $project: {
              _id: 0,
              id: '$_id',
              title: 1,
              newsContainer: 1
            }
          }
        ]);

        return res.status(status.OK).json({ message: message.OK, topics: topics });
      } catch (err) {
        console.log(err)

        return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err })
      }
    } else if (req.method === 'PUT') {
      try {
        const topic = await Topics.findById(req.body.topicId);

        if (!topic) {
          return res.status(status.NOT_FOUND).json({ message: message.ERROR.NOT_FOUND })
        } else if (!req.body.label) {
          return res.status(status.BAD_REQUEST).json({ message: message.ERROR.MISS_FIELD })
        }
        topic.label = req.body.label

        await topic.save()
        const getTopic = formatedTopic(topic)

        res.status(status.OK).json({ message: message.OK, topic: getTopic });
      } catch (err) {
        res.status(status.BAD_REQUEST).json({ message: message.ERROR.SERVER, err });
      }
    } else if (req.method === 'DELETE') {
      try {
        const topic = await Topics.findById(req.body.topicId);

        if (!topic) {
          return res.status(status.NOT_FOUND).json({ message: message.ERROR.NOT_FOUND })
        }
        await topic.deleteOne()

        return res.status(status.NO_CONTENT).json({ message: '' })

      } catch (err) {
        res.status(status.BAD_REQUEST).json({ message: message.ERROR.SERVER, err });
      }
    } else {
      return res.status(status.NOT_ALLOW).json({ message: message.ERROR.NOT_ALLOWED });
    }
  } catch (err) {

    return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err });
  }
}

export default handler
