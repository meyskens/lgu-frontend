import {User} from "./user";

export class Reservatie {
  _id: string;
  reason: string;
  user: User;
  //room: Room;
  from: Date;
  to: Date;
  feedback: string;
  confirmed: boolean;
}
