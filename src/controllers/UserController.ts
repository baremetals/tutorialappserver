import argon2 from "argon2";
import { User } from "../entities/User";
import {
  isEmailValid,
  isUserNameValid,
} from "../utils/validators/UserValidator";
import { isPasswordValid } from "../utils/validators/PasswordValidator";




export class UserResult {
  constructor(public messages?: Array<string>, public user?: User) {}
}


export const register = async (
  email: string,
  username: string,
  fullName: string,
  password: string
): Promise<UserResult> => {
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

  const userEntity = await User.create({
    email: trimmedEmail,
    username: trimmedUsername,
    fullName: fullName,
    password: hashedPassword,
  }).save();

  userEntity.password = ""; // blank out for security

  return {
    user: userEntity,
  };
};


export const login = async (
  usernameOrEmail: string,
  password: string
): Promise<UserResult> => {
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
  return "Password changed successfully.";
};

function userNotFound(usernameOrEmail: string) {
  return usernameOrEmail.includes("@")
    ? `User with email ${usernameOrEmail} not found.`
    : `User with username ${usernameOrEmail} not found.`;
}