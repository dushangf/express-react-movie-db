import express from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send(`Unauthorized. No token was found.`);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');

    req.body.decoded = decoded;
  } catch (error) {
    return res.status(401).send(`Unauthorized. Invalid token.`);
  }

  return next();
};

export default verifyToken;
