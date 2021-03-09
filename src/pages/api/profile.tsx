import { NextApiRequest, NextApiResponse } from "next";

import { mongooseConnection } from "../../database/database";

import ProfileModel, { IProfileSchema } from "../../models/Profile";

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
    case "POST": {
      const {
        userId,
        githubId,
        login,
        name,
        image,
      }: IProfileSchema = request.body;

      const profileExists = await ProfileModel.findOne({ name });
      if (profileExists) {
        return response
          .status(202)
          .json({ error: "Profile already registered" });
      }

      try {
        const profile: IProfileSchema = await ProfileModel.create({
          userId,
          githubId,
          login,
          name,
          image,
          level: 1,
          currentExp: 0,
          nextLevelExp: 64,
          totalExp: 0,
          challengesCompleted: 0,
        });

        return response.status(200).json(profile);
      } catch (error) {
        return response.status(400).json({
          error: error?._message || "Failed to create a user",
        });
      }
    }

    default: {
      return response.status(404).json({
        error: "Route not found",
      });
    }
  }
};
