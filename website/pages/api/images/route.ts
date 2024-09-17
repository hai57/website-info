/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";

// import { verifyToken } from "@/middlewares";
import connectMongoDB from "@/lib/mongo/mongodb";
import Image from "@/models/images";
import { message, status } from "@/constant";

const formatedImage = (imageContainer: {
  image: any;
  title: any; _id: any;
}) => {
  return {
    id: imageContainer._id,
    title: imageContainer.title,
    images: imageContainer.image
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    await connectMongoDB();

    if (req.method === 'POST') {
      try {
        const { images } = req.body;

        const createdImages = await Promise.all(
          images.map(async (image: any) => {
            const newImage = await Image.create(image);

            return formatedImage(newImage);
          })
        );

        return res.status(status.CREATED).json({ message: message.CREATED, images: createdImages });
      } catch (err) {
        return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err })
      }
    } else if (req.method === 'GET') {
      try {
        const images = await Image.aggregate([
          {
            $addFields: {
              id: '$_id'
            }
          },
          {
            $project: {
              _id: 0,
              id: 1,
              title: { $ifNull: ['$title', ''] },
              url: { $ifNull: ['$image', ''] }
            }
          }
        ]);

        return res.status(status.OK).json({ message: message.OK, images: images });
      } catch (err) {
        return res.status(status.ERROR).json({ message: message.ERROR.SERVER })
      }
    } else if (req.method === 'PUT') {
      try {
        const image = await Image.findById(req.body.imageId);

        if (!image) {
          return res.status(status.NOT_FOUND).json({ message: message.ERROR.NOT_FOUND })
        } else if (!req.body.title || !req.body.image) {
          return res.status(status.BAD_REQUEST).json({ message: message.ERROR.MISS_FIELD })
        }
        image.title = req.body.title,
          image.image = req.body.image,

          await image.save()
        const getImage = formatedImage(image)

        res.status(status.OK).json({ message: message.OK, image: getImage });
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ message: message.ERROR.SERVER });
      }
    } else if (req.method === 'DELETE') {
      try {
        const image = await Image.findById(req.body.imageId);

        if (!image) {
          return res.status(status.NOT_FOUND).json({ message: message.ERROR.NOT_FOUND })
        }
        await image.deleteOne()

        return res.status(status.NO_CONTENT).json({ message: '' })

      } catch (error) {
        res.status(status.BAD_REQUEST).json({ message: message.ERROR.SERVER });
      }
    } else {
      return res.status(status.NOT_ALLOW).json({ message: message.ERROR.NOT_ALLOWED });
    }
  } catch (err) {

    return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err });
  }
}

export default handler
