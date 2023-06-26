import { JwtPayload } from "jsonwebtoken";

export type PayloadToken = {
  id: string,
  userName: string;
} & JwtPayload;
