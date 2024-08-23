import { db } from "../utils/firebase-admin";
import moment from "moment";

export const getUserService = async (email: string) => {
  const user = await db.collection("users").where('email','==', email).get();
  const userArray = user.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
  }));
  return userArray;
}

export const createUserService = async (email: string) => {
  const newUser = await db.collection("users").add({
    email,
    createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  });
  return newUser;
}