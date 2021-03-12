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
    case "GET": {
      try {
        const profile = await ProfileModel.find().select("level name totalExperience challengesCompleted image").sort({ totalExperience: -1 }) as Array<IProfileSchema>;

        return profile
          ? response.status(200).json(profile)
          : response.status(202).json({});
      } catch (error) {
        return response.status(400).json({
          error: error?._message || "Failed to get leaderboard",
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
