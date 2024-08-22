import { Request, Response } from "express";
import { db } from "../utils/firebase-admin";
import moment from "moment";
import { createUserService, getUserService } from "../services/auth.service";
import { get } from "http";

export const getUser = async (req: Request, res: Response) => {
  try {
    const email =  req.params.email as string;
    if (!email) {
      return res.status(400).send("Email is required");
    }
    const user = await getUserService(email);
    if(user.length === 0){
      return res.status(404).send("User not found");
    }
    return res.status(200).send(user);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const {email} = req.body;
    if (!email) {
      return res.status(400).send("Email is required");
    }
    const newUser = await createUserService(email);
    return res.status(201).send(newUser);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}