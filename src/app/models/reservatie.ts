import {User} from "./user";
import {Room} from "./room";

export class Reservatie {
  _id: string;
  reason: string;
  user: User;
  room: Room;
  from: Date;
  to: Date;
  feedback: string;
  confirmed: boolean;
}
