import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Users } from "../Entities/userEntity.js";
import { RequestWithUser, Roles, UserObj } from "../Utils/types.js";

const createToken = (user: UserObj) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = hashedPassword;
    user.role = role ?? Roles.CUSTOMER;

    await user.save();

    const userObj = {
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    const token = createToken(userObj);

    res.status(201).json({
      message: "User created successfully",
      user: { ...userObj, token },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  } finally {
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = createToken(user);

    const useObj = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };

    res.status(200).json({ ...useObj, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  } finally {
    return;
  }
};

export const currentUser = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const id = req.user?.id!;
    const user = await Users.findOneBy({ id });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const token = createToken(user);

    const useObj = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };

    res.status(200).json({ ...useObj, token });
  } catch (error) {
    res.status(401).json({ message: "Token not found or not valid" });
  }
};

export const deleteUser = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    if (req.user?.id !== req.body?.uid) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this user" });
      return;
    }

    const result = await Users.delete({ id: req.user?.id });

    if (result.affected === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateUser = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  const user = await Users.findOneBy({ email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const isSameUser = req.user?.id === user?.id;

  if (!isSameUser) {
    res.status(403).json({ message: "Email already in use" });
    return;
  }

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  try {
    const updatedUser = await Users.save({
      id: user.id,
      first_name: req.body.first_name ?? user.first_name,
      last_name: req.body.last_name ?? user.last_name,
      email: req.body.email ?? user.email,
      password: req.body.password ?? user.password,
      role: user.role,
    });

    res.status(200).json({
      user: {
        id: updatedUser.id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
