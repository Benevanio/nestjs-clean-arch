import { randomUUID as uuidv4 } from "node:crypto";

export abstract class Entity<Props = any> {
 public readonly _id: string;
 public readonly props: Props;

 constructor(props: Props, id?: string) {
   this._id = id ?? uuidv4();
   this.props = props;
 }

 get id() {
  return this.id;

 }
 toJSON(): Required<{ _id: string; props: Props }> {
   return {
     _id: this._id,
     props: this.props,
   };
 }
}
