import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const accessToken = req.cookies['accessToken'];
  if (accessToken == null) {
    return res.status(401).send('No Access Token')
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send('Invalid Access Token')
    }
    req.user = user;
    next();
  });
}