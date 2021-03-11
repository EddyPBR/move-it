import { NextApiRequest, NextApiResponse } from "next";

import { mongooseConnection } from "../../database/database";

import ProfileModel from "../../models/Profile";

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
        const profile = await ProfileModel.find().sort({ totalExperience: -1 });

        return profile
          ? response.status(200).json(profile)
          : response.status(202).json({});
      } catch (error) {
        return response.status(400).json({
          error: error?._message || "Failed to create a profile ranking",
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
