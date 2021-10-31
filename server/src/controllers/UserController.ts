import argon2 from "argon2";
import { User } from "../entities/User";
import {
  isEmailValid,
  isUserNameValid,
} from "../utils/validators/UserValidator";
import { isPasswordValid } from "../utils/validators/PasswordValidator";
import { Group } from "../entities/Group";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import Redis from "ioredis";
import { Message } from "../entities/Message";
import {
  ACCOUNT_ACTIVATED,
  profileImage,
  backgroundImg,
} from "../lib/constants";
import { MsgResult } from "./MsgController";

export class UserResult {
  constructor(public messages?: Array<string>, public user?: User) {}
}




export const register = async (
  email: string,
  username: string,
  fullName: string,
  password: string
): Promise<UserResult> => {
  const redis = new Redis();
  const result = isPasswordValid(password);
  if (!result.isValid) {
    return {
      messages: [
        "Passwords must have min length 8, 1 upper character, 1 number, and 1 symbol",
      ],
    };
  }

  const usernameResult = isUserNameValid(username);
  if (!usernameResult.isValid) {
    return {
      messages: [
        "Username must have min 2 characters and must only contain letters, numbers, hyphens or an underscore(a-z0-9/_)",
      ],
    };
  }

  const trimmedEmail = email.trim().toLowerCase();
  const trimmedUsername = username.trim().toLowerCase();
  const emailErrorMsg = isEmailValid(trimmedEmail);
  if (emailErrorMsg) {
    return {
      messages: [emailErrorMsg],
    };
  }

  const hashedPassword = await argon2.hash(password);
  const groupId: any = 2;

  const group = await Group.findOne({
    id: groupId,
  });

  if (!group) {
    return {
      messages: ["group not found."],
    };
  }

  const userEntity = await User.create({
    email: trimmedEmail,
    username: trimmedUsername,
    fullName: fullName,
    password: hashedPassword,
    profileImage,
    backgroundImg,
    groups: [group],
  }).save();

  userEntity.password = ""; // blank out for security

  const token = v4();

  await redis.set(
    ACCOUNT_ACTIVATED + token,
    userEntity.id,
    "ex",
    1000 * 60 * 60 * 24 * 2
  ); // 48 hours

  await sendEmail(
    email,
    `<a href="http://localhost:3000/activate-account/${token}">Activate your account</a>`,
    `Thanks for signing up ${username}`
  );

  console.log(token)

  return {
    user: userEntity,
  };
};

export const activateUser = async (id: string): Promise<MsgResult> => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return {
      messages: ["User not found."],
    };
  }

  if (user.confirmed) {
    return {
      messages: ["Your account is already confirmed."],
    };
  }

  user.confirmed = true;
  user.save();

  // notification code goes here
  const msg = await Message.create({
    user,
    title: `Welcome ${user.username}`,
    body: "Thanks for joining the Baremetals tutorial community. Your account is now activated and you may register for courses.",
    type: ACCOUNT_ACTIVATED,
  }).save();

  if (!msg) {
    return {
      messages: ["Message was not created."],
    };
  }

  return {
    msg: msg
  };
};


export const login = async (
  usernameOrEmail: string,
  password: string
): Promise<UserResult> => {
  // console.log(usernameOrEmail);
  const user = await User.findOne(
    usernameOrEmail.includes("@")
      ? { where: { email: usernameOrEmail } }
      : { where: { username: usernameOrEmail } }
  );
  if (!user) {
    return {
      messages: [userNotFound(usernameOrEmail)],
    };
  }

  if (!user.confirmed) {
    return {
      messages: ["User has not confirmed their registration email yet."],
    };
  }

  const passwordMatch = await argon2.verify(user.password, password);
  if (!passwordMatch) {
    return {
      messages: ["Password is invalid."],
    };
  }

  return {
    user: user,
  };
};

export const logout = async (username: string): Promise<string> => {
  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return userNotFound(username);
  }

  return "User logged off.";
};

export const me = async (id: string): Promise<UserResult> => {
  const user = await User.findOne({
    where: { id },
    relations: [
      "posts",
      "posts.comments",
      "comments",
      "comments.post",
    ],
  });

  if (!user) {
    return {
      messages: ["User not found."]
    };
  }

  if (!user.confirmed) {
    return {
      messages: ["User has not confirmed their registration email yet."]
    };
  }

  user.password = "";
  return {
    user: user,
  };
};

export const changePassword = async (
  id: string,
  newPassword: string
): Promise<string> => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return "User not found.";
  }

  if (!user.confirmed) {
    return "User has not confirmed their registration email yet.";
  }

  const hashedPassword = await argon2.hash(newPassword);
  user.password = hashedPassword;
  user.save();

  // notification code goes here
  return "Password changed successfully.";
};

export const resetPassword = async (
  newPassword: string,
  id: string
): Promise<string> => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return "User not found.";
  }

  const hashedPassword = await argon2.hash(newPassword);
  user.password = hashedPassword;
  user.save();

  // notification code goes here
  return "Password changed successfully.";
};

export const forgotPassword = async (
  usernameOrEmail: string
): Promise<string> => {
  const redis = new Redis();
  const user = await User.findOne(
    usernameOrEmail.includes("@")
      ? { where: { email: usernameOrEmail } }
      : { where: { username: usernameOrEmail } }
  );
  if (!user) {
    return userNotFound(usernameOrEmail);
  }

  if (!user.confirmed) {
    user.confirmed = true;
  }

  const token = v4();

  await redis.set(
    "RESET_PASSWORD" + token,
    user.id,
    "ex",
    1000 * 60 * 60 * 24 * 2
  ); // 48 hours

  await sendEmail(
    user.email,
    `<a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`,
    "Reset Password Request."
  );

  return "Please check your email for for reset link"
};

function userNotFound(usernameOrEmail: string) {
  return usernameOrEmail.includes("@")
    ? `User with email ${usernameOrEmail} not found.`
    : `User with username ${usernameOrEmail} not found.`;
}

// To do 
// add notifications for reset password, activation and change password.

// export const deleteMe = async (): Promise{}
// export const editMe = async (): Promise{}

// Admin only feature
// export const deleteUser = async (): Promise{}
// export const editUser = async (): Promise{}

