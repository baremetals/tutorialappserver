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
  userName: string,
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

  const usernameResult = isUserNameValid(userName);
  if (!usernameResult.isValid) {
    return {
      messages: [
        "Username must have min 2 characters and must only contain letters, numbers, hyphens or an underscore(a-z0-9/_)"
      ],
    };
  }

  const trimmedEmail = email.trim().toLowerCase();
  const trimmedUsername = userName.trim().toLowerCase();
  const emailErrorMsg = isEmailValid(trimmedEmail);
  if (emailErrorMsg) {
    return {
      messages: [emailErrorMsg],
    };
  }

  const hashedPassword = await argon2.hash(password);

  const userEntity = await User.create({
    email: trimmedEmail,
    userName: trimmedUsername,
    fullName,
    password: hashedPassword,
  }).save();

  userEntity.password = ""; // blank out for security
  return {
    user: userEntity,
  };
};
export interface UserNameOrEmail {
  email?: string,
  userName?: string
}

export const login = async (
  userName: string,
  password: string
  // email?: string
): Promise<UserResult> => {
  const user = await User.findOne({
    where: { userName }
  });
  console.log(userName)
  if (!user) {
    return {
      messages: [userNotFound(userName)],
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

export const logout = async (userName: string): Promise<string> => {
  const user = await User.findOne({
    where: { userName },
  });

  if (!user) {
    return userNotFound(userName);
  }

  return "User logged off.";
};

function userNotFound(userName: string) {
  return `User with userName ${userName} not found.`;
}