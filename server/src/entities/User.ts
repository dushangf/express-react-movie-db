import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  //   constructor(
  //     _id: ObjectID,
  //     email: string,
  //     first_name: string,
  //     last_name: string,
  //     password: string
  //   ) {
  //     this._id = _id;
  //     this.email = email;
  //     this.first_name = first_name;
  //     this.last_name = last_name;
  //     this.password = password;
  //   }

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @Column()
  favorites: {
    title: string;
    poster_path: string;
    release_date: string;
    genre_ids: number[];
    vote_average: number;
  }[];
}
