import { prisma } from "../db.js";
import { responses } from "../middlewares/responses.middleware.js";

// function for update a Season
const createSeason = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for update a Season
const updateSeason = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Season
const deleteSeason = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for view all Seasons
const viewSeason = async (req, res) => {
  try {
    const seasons = await prisma.season.findMany({
      where: { deletedAt: null },
    });

    return responses.res200(res, "Seasons", seasons);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Season
const viewOneSeason = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const SeasonController = {
  createSeason,
  updateSeason,
  deleteSeason,
  viewOneSeason,
  viewSeason,
};
