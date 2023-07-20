import { Request, Response, NextFunction } from "express";
import passport from "passport";

// サインイン状態を判断するミドルウェア
export const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // passport認証を通過(サインイン)している場合はtrueを返す
  if (req.isAuthenticated()) {
    next();
  } else {
    next();
    res.redirect("/login");
  }
};