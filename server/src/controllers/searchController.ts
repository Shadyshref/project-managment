import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const rawQuery = req.query.query;

  let queryParam: string = "";

  if (typeof rawQuery === "string") {
    queryParam = rawQuery;
  } else if (
    Array.isArray(rawQuery) &&
    rawQuery.length > 0 &&
    typeof rawQuery[0] === "string"
  ) {
    queryParam = rawQuery[0];
  } else {
    queryParam = "";
  }

  console.log(" Received search query:", queryParam);

  if (queryParam.length < 3) {
    res.json({ tasks: [], projects: [], users: [] });
    return;
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: queryParam, mode: "insensitive" } },
          { description: { contains: queryParam, mode: "insensitive" } },
        ],
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: queryParam, mode: "insensitive" } },
          { description: { contains: queryParam, mode: "insensitive" } },
        ],
      },
    });

    console.log("projects found:", projects.length);
    console.log(projects);

    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: queryParam, mode: "insensitive" } }],
      },
    });

    console.log("projects found:", projects.length);

    res.json({ tasks, projects, users });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error performing search: ${error.message}` });
  }
};
