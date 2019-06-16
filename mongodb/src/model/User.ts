import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
});

export interface IUser extends mongoose.Document {
  email: string,
  name: string
}

export default mongoose.model<IUser>('user', UserSchema);
