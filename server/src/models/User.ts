import { Schema, model } from 'mongoose';

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  favorites?: {
    title: string;
    poster_path: string;
    release_date: string;
    genre_ids: number[];
    vote_average: number;
  }[];
}

const UserSchema = new Schema<IUser>({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  password: { type: String },
  favorites: { type: Array },
});

const User = model<IUser>('User', UserSchema);

export default User;
