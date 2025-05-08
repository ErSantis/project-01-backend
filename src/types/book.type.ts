export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publisher: string;
  publicationDate: Date;
  isAvailable: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
