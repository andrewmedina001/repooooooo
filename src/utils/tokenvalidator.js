import { PrismaConnector } from "../prisma.js";
import prisma from "@prisma/client";
import _ from "lodash";
import jwt from "jsonwebtoken";

export const validateToken = async (req, res, next) => {
  if (_.isNil(req.headers.authorization)) {
    return res.status(401).json({
      message: "Token is required",
    });
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer asdasdasdasd.asdasdasdasd.asdasdasds"
    if (_.isNil(token)) {
      throw new Error("Token is required");
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);
    // console.log(payload);

    const user = await PrismaConnector.user.findUniqueOrThrow({
      where: {
        id: payload.id,
      },
      include: {
        carts: true,
      }
    });
    req.user = user;
    next();
    
  } catch (error) {
    return res.status(400).json({
      message: "Invalid token",
      content: error.message,
    });
  }
};
