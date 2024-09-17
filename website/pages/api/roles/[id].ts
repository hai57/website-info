/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from 'next';

import { message, status } from '@/constant/index'
import Role from '@/models/roles';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const formatedRole = (roles: { _id: any; roleName: any; }) => {
    return {
      id: roles._id,
      roleName: roles.roleName
    }
  }

  switch (req.method) {
    case 'GET':
      try {
        const role = await Role.findById(id);
        const getRole = formatedRole(role)

        res.status(status.OK).json({ message: message.OK, role: getRole });
      } catch (error) {
        res.status(status.ERROR).json({ message: message.ERROR.SERVER });
      }
      break;
    case 'PUT':
      try {
        const updatedRole = await Role.findById(id);

        if (!updatedRole) {
          return res.status(status.NOT_FOUND).json({ message: message.ERROR.NOT_FOUND })
        } else if (!req.body.roleName) {
          return res.status(status.BAD_REQUEST).json({ message: message.ERROR.MISS_FIELD })
        }
        updatedRole.roleName = req.body.roleName
        await updatedRole.save()
        const getRole = formatedRole(updatedRole)

        res.status(status.OK).json({ message: message.OK, role: getRole });
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ message: message.ERROR.SERVER });
      }
      break;
    case 'DELETE':
      try {
        await Role.findByIdAndDelete(id);

        res.status(status.NO_CONTENT).json({ message: message.OK });
      } catch (error) {
        res.status(status.ERROR).json({ message: message.ERROR.SERVER });
      }
      break;
    default:
      res.status(status.NOT_ALLOW).json({ message: message.ERROR.NOT_ALLOWED });
  }
}
