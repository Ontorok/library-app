import { Availibity } from "../types";

export interface IBook {
  id?: string;
  title: string;
  author: string;
  status: Availibity;
}
