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
      const githubId = request.query.githubId as string;

      if(!githubId) {
        return response.status(400).json({ error: "Missing query params" });
      }

      try {
        const profile = await ProfileModel.findOne({ githubId: Number(githubId) });

        return profile
          ? response.status(200).json(profile)
          : response.status(404).json({ error: "Profile not found" });
      } catch (error) {
        return response.status(400).json({
          error: error?._message || "Failed to search a user",
        });
      }
    }

    case "PUT": {
      const githubId = request.query.githubId as string;

      if(!githubId) {
        return response.status(400).json({ error: "Missing query params" });
      }

      const {
        level,
        currentExperience,
        totalExperience,
        challengesCompleted
      }: IProfileSchema = request.body;

      if(!level || !currentExperience || !totalExperience || !challengesCompleted ) {
        return response.status(400).json({ error: "Missing body params" });
      }

      try {
        //@ts-ignore
        const profile = await ProfileModel.findOneAndUpdate(
          { githubId: Number(githubId) },
          {
            level,
            currentExperience,
            totalExperience,
            challengesCompleted
          },
          {
            new: true,
          }
        );

        return profile
          ? response.status(202).json(profile)
          : response.status(404).json({ error: "Profile not found" });
      } catch (error) {
        return response
          .status(400)
          .json({ error: error?._message || "Failed to update a profile" });
      }
    }

    default: {
      return response.status(404).json({
        error: "Route not found",
      });
    }
  }
};
