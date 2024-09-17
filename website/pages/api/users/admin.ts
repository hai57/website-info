/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs'

import { message, status } from '@/constant/index'
import User from '@/models/users';
import { verifyToken, isAdmin } from '@/middlewares';
import connectMongoDB from '@/lib/mongo/mongodb';

const formateduser = (user: {
  password: any;
  email: any;
  phone: any;
  username: any; _id: any;
}) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone
  }
}

interface ExtendedApiRequest extends NextApiRequest {
  userId?: string; // Optional userId property
}

const handler = async (req: ExtendedApiRequest, res: NextApiResponse) => {

  try {
    const id = req.userId

    await connectMongoDB()
    if (req.method === 'GET') {
      try {
        const user = await User.findById(id);
        const getUser = formateduser(user)

        res.status(status.OK).json({ message: message.OK, user: getUser });
      } catch (error) {
        res.status(status.ERROR).json({ message: message.ERROR.SERVER });
      }
    } else if (req.method === 'POST') {
      try {
        const { username, email, password, phone } = req.body;
        //user
        const defaultRole = '66bd7f359fa8ab0998a552be'

        if (!username) {
          return res.status(status.BAD_REQUEST).json({ message: 'username missing' });
        } else if (!email) {
          return res.status(status.BAD_REQUEST).json({ message: 'email' });
        } else if (!password) {
          return res.status(status.BAD_REQUEST).json({ message: 'password' });
        } else if (!phone) {
          return res.status(status.BAD_REQUEST).json({ message: 'phone' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, phone, password: hashedPassword, role: defaultRole })

        await user.save()
        const getUser = formateduser(user)

        return res.status(status.CREATED).json({ message: message.CREATED, user: getUser });
      } catch (err) {
        console.log(err)

        return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err });
      }
    } else if (req.method === 'PUT') {
      try {
        const userId = req.body.id;
        const user = await User.findById(userId)

        if (!user) {
          return res.status(status.NOT_FOUND).json({ message: message.ERROR.NOT_FOUND })
        } else if (!req.body.username || !req.body.phone || !req.body.email) {
          return res.status(status.BAD_REQUEST).json({ message: message.ERROR.MISS_FIELD })
        }
        user.username = req.body.username
        user.email = req.body.email
        user.phone = req.body.phone

        await user.save()
        const getUser = formateduser(user)

        return res.status(status.OK).json({ message: message.OK, user: getUser })
      } catch (err) {
        return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err });
      }
    } else if (req.method === 'DELETE') {
      try {
        await User.findByIdAndDelete(id);

        res.status(status.NO_CONTENT);
      } catch (error) {
        res.status(status.ERROR).json({ message: message.ERROR.SERVER });
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
