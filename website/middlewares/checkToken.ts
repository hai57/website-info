/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from 'next'

import { verifyToken } from './authenticateToken';

import { message, status } from '@/constant/index'
import User from '@/models/users';

interface ExtendedApiRequest extends NextApiRequest {
  userId?: string; // Optional userId property
}

const checkTokenValidity = (handler: (arg0: ExtendedApiRequest, arg1: NextApiResponse) => void) => {
  return async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      // Sử dụng middleware để kiểm tra token
      verifyToken(async () => {
        const user = await User.findById(req.userId).select('-__v');

        if (!user) {
          return res.status(status.NOT_FOUND).json({ message: message.ERROR.USER_NOT_FOUND });
        }
        const selectUser = {
          id: user._id,
          username: user.username || '',
          email: user.email || ''
        }

        return res.status(status.OK).json({ message: 'Token is valid', user: selectUser });
      });
    } catch (err) {
      return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err });
    }

    return handler(req, res)

  }
};

export default checkTokenValidity
