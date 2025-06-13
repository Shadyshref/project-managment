import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();
    const teamsWithUserNames = await Promise.all(
      teams.map(async (team: any) => {
        let productOwnerUsername = null;
        let projectManagerUsername  = null;
        if (team.productOwnerUserId) {
          const productOwner = await prisma.user.findUnique({
            where: { userId: team.productOwnerUserId },
            select: { username: true },
          });
          productOwnerUsername = productOwner?.username ?? null;
        }
        if (team.projectManagerUserId) {
          const projectManager = await prisma.user.findUnique({
            where: { userId: team.projectManagerUserId },
            select: { username: true },
          });
          projectManagerUsername = projectManager?.username ?? null;
        }
        return {
          ...team,
          productOwnerUsername,
         projectManagerUsername 
        };
      })
    );

    res.json(teamsWithUserNames);
  } catch (error: any) {
    console.error("Error in getTeams:", error);
    res
      .status(500)
      .json({ message: `Error retrieving teams: ${error.message}` });
  }
};
