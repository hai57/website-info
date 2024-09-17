/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";

import { verifyToken } from "@/middlewares";
import connectMongoDB from "@/lib/mongo/mongodb";
import Icon from "@/models/icons";
import { message, status } from "@/constant";

const formatedIcon = (roles: {
  label: any; _id: any; image: any;
}) => {
  return {
    id: roles._id,
    label: roles.label,
    image: roles.image
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    await connectMongoDB();

    if (req.method === 'POST') {
      try {
        const { icons } = req.body;

        const createdIcons = await Promise.all(
          icons.map(async (icon: any) => {
            const newIcon = await Icon.create(icon);

            return formatedIcon(newIcon);
          })
        );

        return res.status(status.CREATED).json({ message: message.CREATED, icons: createdIcons });
      } catch (err) {
        return res.status(status.ERROR).json({ message: message.ERROR.SERVER })
      }
    } else if (req.method === 'GET') {
      try {
        const icons = await Icon.aggregate([
          {
            $addFields: {
              id: '$_id'
            }
          },
          {
            $project: {
              _id: 0,
              id: 1,
              label: { $ifNull: ['$label', ''] },
              image: { $ifNull: ['$image', ''] }
            }
          }
        ]);

        return res.status(status.OK).json({ message: message.OK, icons: icons });
      } catch (err) {
        return res.status(status.ERROR).json({ message: message.ERROR.SERVER })
      }
    } else if (req.method === 'PUT') {
      try {
        const iconId = await Icon.findById(req.body.iconId);

        if (!iconId) {
          return res.status(status.NOT_FOUND).json({ message: message.ERROR.NOT_FOUND })
        } else if (!req.body.label || !req.body.image) {
          return res.status(status.BAD_REQUEST).json({ message: message.ERROR.MISS_FIELD })
        }
        iconId.label = req.body.label,
          iconId.image = req.body.image,

          await iconId.save()
        const getIcon = formatedIcon(iconId)

        res.status(status.OK).json({ message: message.OK, icon: getIcon });
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ message: message.ERROR.SERVER });
      }
    } else if (req.method === 'DELETE') {
      try {
        const iconId = await Icon.findById(req.body.iconId);

        if (!iconId) {
          return res.status(status.NOT_FOUND).json({ message: message.ERROR.NOT_FOUND })
        }
        await iconId.deleteOne()

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
