import express from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    let { first_name, last_name, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      password = await bcrypt.hash(password, 10);

      await User.create({ first_name, last_name, email, password });
      return res.status(200).send('data saved');
    }

    return res.status(409).send('Email already Registered');
  } catch (error) {
    return res.status(403).send('Internal server error.');
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({
        message: 'Email has not been registered. Please sign up.',
      });
    }

    const auth = await bcrypt.compare(password, user?.password || '');

    if (!auth) {
      return res.status(401).send({ message: 'Invalid password.' });
    }

    const token = jwt.sign(
      {
        id: user?._id,
        email: user?.email,
        first_name: user?.first_name,
      },
      process.env.JWT_SECRET || ''
    );

    return res.status(200).send({
      id: user._id,
      email: user.email,
      user: user.first_name,
      token: token,
      favorites: user.favorites,
      message: 'Successfully logged in.',
    });
  } catch (error) {
    return res.status(403).send('Internal server error.');
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    return res.send(user);
  } catch (error) {
    return res.send('Internal server error.');
  }
};

export const addFavorite = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, movie } = req.body;

    movie.delete = false;

    const user = await User.findOneAndUpdate(
      { email: email },
      { $push: { favorites: movie } },
      { new: true }
    );

    return res.status(200).send(user);
  } catch (error) {
    return res.status(403).send('Internal server error.');
  }
};

export const removeFavorite = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, movieID } = req.body;

    const user = await User.findOneAndUpdate(
      { email: email },
      { $pull: { favorites: { id: movieID } } },
      { new: true }
    );

    return res.status(200).send(user);
  } catch (error) {
    return res.status(403).send('Internal server error.');
  }
};

export const removeFavorites = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, movieIDs } = req.body;

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        $pull: {
          favorites: {
            id: {
              $in: movieIDs,
            },
          },
        },
      },
      { new: true }
    );

    return res.status(200).send(user);
  } catch (error) {
    return res.status(403).send('Internal server error.');
  }
};
