/* eslint-disable prettier/prettier */
import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import { message, status } from '@/constant/index'
import User from '@/models/users';
import Role from '@/models/roles';


const secrectKey = process.env.SECRET_KEY

const generateToken = (user: { _id: any; }) => {
  const tokenExpiration = Math.floor(Date.now() / 1000) + 4 * 30 * 24 * 60 * 60;
  const timestamp = 1734074759;
  const date = new Date(timestamp * 1000); // Chuyển đổi từ giây sang mili giây

  const token = jwt.sign(
    { userId: user._id, tokenExpiration },
    secrectKey as string
  );

  return {
    token,
    expiresAt: date,
  };
};

interface ExtendedApiRequest extends NextApiRequest {
  userId?: string; // Optional userId property
}

const verifyToken = (handler: (arg0: ExtendedApiRequest, arg1: NextApiResponse) => void) => {
  return async (req: ExtendedApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(status.UNAUTHORIZED).json({ message: message.ERROR.INVALID_TOKEN_FORMAT });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token as string, secrectKey as string, (err, decoded) => {

      const decodedPayload = decoded as JwtPayload;

      if (err || !decoded) {
        return res.status(status.FORBIDDEN).json({ message: message.ERROR.INVALID_TOKEN });
      }
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decodedPayload.tokenExpiration < currentTimestamp) {
        return res.status(status.UNAUTHORIZED).json({ message: message.ERROR.TOKEN_EXP });
      }

      req.userId = decodedPayload.userId;

      return handler(req, res)
    })
  }
}

const isAdmin = (handler: (agr0: ExtendedApiRequest, agr1: NextApiResponse) => void) => {
  return async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      const user = await User.findById(req.userId)

      if (!user) {
        res.status(status.NOT_FOUND).json({ message: message.ERROR.NOT_FOUND })

        return;
      }
      const role = await Role.find({ _id: { $in: user.role } })
      let isAdmin = false

      for (let i = 0; i < role.length; i++) {
        if (role[i].roleName === "ADMIN") {
          isAdmin = true
          break;
        }
      }

      if (isAdmin) {
        return handler(req, res)
      } else {
        return res.status(status.FORBIDDEN).json({ message: message.ERROR.MISSING_ADMIN })
      }
    } catch (err) {
      return res.status(status.ERROR).json({ message: message.ERROR.SERVER })
    }
  }
}



export { generateToken, verifyToken, isAdmin }

