/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";

import connectMongoDB from "@/lib/mongo/mongodb";
import User from "@/models/users";
import { message, status } from "@/constant";
import { isAdmin, verifyToken } from "@/middlewares";

interface ExtendedApiRequest extends NextApiRequest {
  userId?: string; // Optional userId property
}

const handler = async (req: ExtendedApiRequest, res: NextApiResponse) => {
  try {
    await connectMongoDB()

    if (req.method === 'GET') {
      try {
        const user = await User.findById(req.userId)

        if (user) {
          return res.status(status.OK).json({ message: message.OK })
        }
      } catch (err) {
        return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err });
      }
    } else {
      // Handle other HTTP methods (e.g., GET, PUT, DELETE) if needed
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (err) {
    return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err })
  }
}


export default verifyToken(isAdmin(handler))
