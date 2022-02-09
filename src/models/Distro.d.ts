import { Document } from 'mongoose';

export type Popularity =
  | {
      '12Months': Array<string>;
      '6Months': Array<string>;
      '3Months': Array<string>;
      '4Weeks': Array<string>;
      '1Week': Array<string>;
    }
  | {};

export type Details = Array<
  [
    string,
    Array<{
      text: string;
      link: string;
    }>
  ]
>;

export type Flag = {
  country: string;
  flag: string;
};

export type Attributes = {
  osType: Array<string>;
  basedOn: Array<string>;
  origin: Array<string>;
  architecture: Array<string>;
  desktop: Array<string>;
  category: Array<string>;
  status: string;
  rank: Array<string>;
  flags: Array<Flag>;
};

export type Header = {
  title: string;
  attributes: Attributes;
  logo: string;
  description: string;
  banner: string;
};

export interface DistroModel {
  _id?: {
    $oid: string;
  };
  __v?: {
    $numberInt: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  slug: string;
  details: Details;
  header: Header;
  popularity: Popularity;
  rating: number;
}

export type DistroDocument = DistroModel & Document;
