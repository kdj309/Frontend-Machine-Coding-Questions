import { ChangeEvent } from "react";

export interface info {
  name: string;
  email: string;
  number: string;
  city: string;
  interests: string[];
  address: string;
  theme: string;
}
export type InputChangeEvent = 
  | ChangeEvent<HTMLInputElement> 
  | ChangeEvent<HTMLTextAreaElement>;