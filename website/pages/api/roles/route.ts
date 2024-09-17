/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";

import { verifyToken } from "@/middlewares";
import connectMongoDB from "@/lib/mongo/mongodb";
import Role from "@/models/roles";
import { message, status } from "@/constant";

const formatedRole = (roles: { _id: any; roleName: any; }) => {
  return {
    id: roles._id,
    roleName: roles.roleName
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    await connectMongoDB();

    if (req.method === 'POST') {
      const { roleName } = req.body;

      const role = await Role.create({ roleName });
      const getRole = formatedRole(role);

      return res.status(201).json({ message: 'Role create', role: getRole });
    } else if (req.method === 'GET') {
      const roles = await Role.aggregate([
        {
          $addFields: {
            id: '$_id'
          }
        },
        {
          $project: {
            _id: 0,
            id: 1,
            roleName: { $ifNull: ['$roleName', ''] },
          }
        }
      ]);

      return res.status(200).json({ message: 'Roles:', roles: roles });
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (err) {

    return res.status(status.ERROR).json({ message: message.ERROR.SERVER, err });
  }
}

export default handler
