/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs'

import { status, message } from "@/constant";
import connectMongoDB from "@/lib/mongo/mongodb";
import Token from "@/models/tokens"
import User from "@/models/users";
import Role from "@/models/roles";
import { generateToken } from "@/middlewares";

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
    phone: user.phone,
    password: user.password
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await connectMongoDB()
      const { username, email, password, phone } = req.body;
      const defaultRole = '66bd7f469fa8ab0998a552c2'

      const role = await Role.findById(defaultRole)
      const roleName = role.roleName

      if (!username || !phone) {
        return res.status(status.BAD_REQUEST).json({ message: message.ERROR.MISS_FIELD });
      } else if (!email) {
        return res.status(status.BAD_REQUEST).json({ message: message.ERROR.MISS_FIELD });
      } else if (!password) {
        return res.status(status.BAD_REQUEST).json({ message: message.ERROR.MISS_FIELD });
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({ username, email, phone, password: hashedPassword, role: defaultRole })

      await user.save()
      const getUser = formateduser(user)
      //token
      const tokens = generateToken(user);
      const newToken = new Token({
        user: user._id,
        token: tokens.token,
        tokenExpiration: tokens.expiresAt
      });

      await newToken.save();

      return res.status(status.CREATED).json({ message: message.CREATED, user: getUser, token: newToken.token, role: roleName });
    } catch (err) {
      return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err });
    }
  } else {
    // Handle other HTTP methods (e.g., GET, PUT, DELETE) if needed
    return res.status(status.NOT_ALLOW).json({ message: message.ERROR.NOT_ALLOWED });
  }
}

export default handler
