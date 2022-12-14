import { Availibity } from "../types/messageType";

export interface IBook {
  id: string;
  title: string;
  author: string;
  status: Availibity;
}
