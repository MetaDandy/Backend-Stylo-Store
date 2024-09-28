import { prisma } from "../db.js";
import { responses } from "../middlewares/responses.middleware.js";

// function for update a Season
const createSeason = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return responses.res400(res, "name");
    if (!description) return responses.res400(res, "description");

    const season = await prisma.season.create({
      data: {
        name,
        description,
      },
    });

    return responses.res201(res, season.name, season);
  } catch (error) {
    return responses.res500(res, error);
  }
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
  try {
    const { id } = req.params;

    const season = await prisma.season.findFirst({
      where: { deletedAt: null, id: Number(id) },
    });

    if (!season) return responses.res404(res, "season");

    await prisma.season.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return responses.res206(res, season.name);
  } catch (error) {
    return responses.res500(res, error);
  }
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
