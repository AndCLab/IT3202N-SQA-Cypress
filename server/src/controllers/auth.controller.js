import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRY = "30m";

/**
 * storing refreshTokenMap in memory.
 * everytime server restarts it logs out every user.
 * Map containing refresh token associated with userId
 * @type {Map<string, string>}
 */
const refreshTokenMap = new Map();

export async function register(req, res, next) {
  const { username, password } = req.body;

  try {
    const duplicateUser = await authService.getByUsername(username);
    if (duplicateUser) {
      res.status(409);
      throw new Error("username already taken");
    }

    await authService.createUser(username, password);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await authService.getByUsername(username);
    if (!user) {
      res.status(401);
      throw new Error("username not found");
    }

    if (!authService.comparePassword(password, user.password)) {
      res.status(401);
      throw new Error("incorrect password");
    }

    const accessToken = jwt.sign(
      { id: user.id, username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      }
    );
    const refreshToken = jwt.sign(
      { id: user.id, username },
      process.env.REFRESH_TOKEN_SECRET
    );

    refreshTokenMap.set(user.id, refreshToken);
    console.log("refreshTokenMap", refreshTokenMap);

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/refresh",
    });

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export function refreshToken(req, res, next) {
  const refreshToken = req.cookies["refreshToken"];

  if (refreshToken == null) {
    return res.status(401).json({
      message: "no refresh token",
    });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "error verifying the token",
      });
    }

    if (refreshTokenMap.get(user.id) !== refreshToken) {
      return res.status(401).json({
        message: "not the users token",
      });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      }
    );

    res.cookie("accessToken", accessToken, { httpOnly: true });
    return res.sendStatus(200);
  });
}

export function logout(req, res, next) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  refreshTokenMap.delete(req.user.id);
  console.log('refreshTokenMap', refreshTokenMap)
  return res.sendStatus(204);
}
