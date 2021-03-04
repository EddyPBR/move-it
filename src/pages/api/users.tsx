import { NextApiRequest, NextApiResponse } from "next";

import { mongooseConnection } from "../../database/database";

import UserModel, { IUserSchema } from "../../models/User";

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { method } = request;

  try {
    await mongooseConnection();
  } catch (error) {
    return response.status(500).json({
      error: error?._message || "Fail to connect with database",
    });
  }

  switch (method) {
    case "POST":
      const { accessKey, name, image }: IUserSchema = request.body;

      const userExists = await UserModel.findOne({ accessKey });
      if (userExists) {
        return response.status(403).json({ error: "User already registered" });
      }

      try {
        const user: IUserSchema = await UserModel.create({
          accessKey,
          name,
          image,
        });

        return response.status(200).json(user);
      } catch (error) {
        return response.status(400).json({
          error: error?._message || "Failed to create a user",
        });
      }

    default:
      return response.status(404).json({
        error: "Route not found",
      });
  }
};
