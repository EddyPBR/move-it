import { NextApiRequest, NextApiResponse } from "next";

import { mongooseConnection } from "../../../database/database";

import ProfileModel, { IProfileSchema } from "../../../models/Profile";

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
      const githubId = request.query;

      try {
        const profile = await ProfileModel.findOne(githubId);

        return profile
          ? response.status(200).json(profile)
          : response.status(404).json({ error: "Profile not found" });
      } catch (error) {
        return response.status(400).json({
          error: error?._message || "Failed to search a user",
        });
      }
      break;
    }

    case "PUT": {
      const githubId = request.query;

      const {
        level,
        currentExperience,
        totalExperience,
      }: IProfileSchema = request.body;

      try {
        const profile = await ProfileModel.findOneAndUpdate( { githubId: githubId }, { level: level, currentExperience: currentExperience, totalExperience, total Experience });
        return response.status(202).json(profile);
      } catch (error) {
        return response.status(400).json({ error: error?._message || "Failed to update a profile" });
      }
    }

    default: {
      return response.status(404).json({
        error: "Route not found",
      });
    }
  }
};
