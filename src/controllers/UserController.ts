import argon2 from "argon2";
import { User } from "../entities/User";
import {
  isEmailValid,
  isUserNameValid,
} from "../utils/validators/UserValidator";
import { isPasswordValid } from "../utils/validators/PasswordValidator";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import Redis from "ioredis";
import { Message } from "../entities/Message";
import {
  ACCOUNT_ACTIVATED,
  PASSWORD_RESET,
  profileImage,
  backgroundImg,
  IMAGE_CHANGE,
  PROFILE_INFO_CHANGE,
} from '../lib/constants';


import { getConnection } from 'typeorm';
import { QueryArrayResult } from './QuerryArrayResult';
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

 const user = await User.findOne({
  where: { email } || { username },
 });

 if (user && user?.isDisabled) {
   return {
     messages: [
       'Your account has been deactivated. Please reactivate your account',
     ],
   };
 }



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

  const generatedToken = v4();
  const slug = generatedToken + '-' + trimmedUsername; 
  const hashedPassword = await argon2.hash(password);



  const userEntity = await User.create({
    email: trimmedEmail,
    username: trimmedUsername,
    fullName: fullName,
    password: hashedPassword,
    profileImage,
    backgroundImg,
    userIdSlug: slug,
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


  return {
    user: userEntity,
  };
};

export const activateUser = async (id: string): Promise<string> => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return 'User not found.';
  }

  if (user.confirmed) {
    return 'Your account is already confirmed.';
  }

  user.confirmed = true;
  user.save();

  // notification code goes here
  const msg = await Message.create({
    user,
    title: `Welcome ${user.username}`,
    body: "Thanks for joining Baremetals Academy. Your account is now activated and you may register for courses.",
    type: ACCOUNT_ACTIVATED,
  }).save();

  if (!msg) {
    return 'Message was not created.';
  }

  await sendEmail(
    user.email,
    `Hi ${user.username}, \Thanks for joining Baremetals Academy. Your account is now activated and you may register for courses.`,
    'Account Activated.'
  );

  return 'Your account is now confirmed.';
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

  if (user.isDisabled) {
    return {
      messages: [
        'Your account has been deactivated. Please reactivate your account',
      ],
    };
  }

  const passwordMatch = await argon2.verify(user.password, password);
  if (!passwordMatch) {
    return {
      messages: ["Password is invalid."],
    };
  }
  user.isOnline = true
  user.lastModifiedBy = user.username;
  user.lastModifiedOn = new Date(); 
  user.save();
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

  user.isOnline = false;
  user.lastModifiedBy = user.username;
  user.lastModifiedOn = new Date();
  user.save();

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
  user.isOnline = true;
  return {
    user: user,
  };
};

export const changePassword = async (
  id: string,
  currentPassword: string,
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

  const passwordMatch = await argon2.verify(user.password, currentPassword);
  if (!passwordMatch) {
    return 'Current Password is invalid.';
  }

  const hashedPassword = await argon2.hash(newPassword);
  user.password = hashedPassword;
  user.lastModifiedBy = user.username;
  user.lastModifiedOn = new Date(),
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

  const msg = await Message.create({
    user,
    title: `Password Reset`,
    body: 'Your password has been changed successfully',
    type: PASSWORD_RESET,
  }).save();

  if (!msg) {
    return 'Message was not created.';
  }

  await sendEmail(
    user.email,
    `Hi ${user.username}, \Your password has been changed successfully`,
    'Password Reset.'
  );

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

export const editMe = async (
  id: string,
  email: string,
  username: string,
  fullName: string,
  description: string,
  location: string,
): Promise<string> => {

  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return 'User not found.';
  }

  if (!user.confirmed) {
    return 'User has not confirmed their registration email yet.';
  }

  const usernameResult = isUserNameValid(username);
  if (!usernameResult.isValid) {
    return 'Username must have min 2 characters and must only contain letters, numbers, hyphens or an underscore(a-z0-9/_)';
  }

  const trimmedEmail = email.trim().toLowerCase();
  const trimmedUsername = username.trim().toLowerCase();
  const emailErrorMsg = isEmailValid(trimmedEmail);
  
  if (emailErrorMsg) {
    return emailErrorMsg;
  }

  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({
      email: trimmedEmail,
      username: trimmedUsername,
      fullName,
      description,
      location,
      lastModifiedBy: trimmedUsername,
      lastModifiedOn: new Date(),
    })
    .where('id = :id', { id: id })
    .execute();

  // user.email = trimmedEmail;
  // user.username = trimmedUsername;
  // user.fullName = fullName;
  // user.save();

  // notification code goes here
  const msg = await Message.create({
    user,
    title: `Profile Info Change`,
    body: 'Your profile details has been changed successfully',
    type: PROFILE_INFO_CHANGE,
  }).save();

  if (!msg) {
    return 'Message was not created.';
  }

  await sendEmail(
    user.email,
    `Hi ${user.username}, \nYour profile details has been changed successfully`,
    'Profile Info Change.'
  );
  return 'Details changed successfully.';
};

export const editProfileImage = async (
  id: string,
  profileImg: string,

): Promise<string> => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return 'User not found.';
  }

  if (!user.confirmed) {
    return 'User has not confirmed their registration email yet.';
  }

  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({
      profileImage: profileImg,
      lastModifiedBy: user.username,
      lastModifiedOn: new Date(),
    })
    .where('id = :id', { id: id })
    .execute();

  // notification code goes here

  const msg = await Message.create({
    user,
    title: `Profile Image Change`,
    body: 'Your profile image has been changed successfully',
    type: IMAGE_CHANGE,
  }).save();

  if (!msg) {
    return 'Message was not created.';
  }

  await sendEmail(
    user.email,
    `Hi ${user.username}, \nYour profile image has been changed successfully`,
    'Profile Image Change.'
  );
  return `Your profile image has been changed successfully`;
};

export const editBackGroundImage = async (
  id: string,
  backgroundImage: string
): Promise<string> => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return 'User not found.';
  }

  if (!user.confirmed) {
    return 'User has not confirmed their registration email yet.';
  }

  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({
      backgroundImg: backgroundImage,
      lastModifiedBy: user.username,
      lastModifiedOn: new Date(),
    })
    .where('id = :id', { id: id })
    .execute();

  // notification code goes here
  const msg = await Message.create({
    user,
    title: `Background Image Change`,
    body: 'Your background image has been changed successfully',
    type: IMAGE_CHANGE,
  }).save();

  if (!msg) {
    return 'Message was not created.';
  }

  await sendEmail(
    user.email,
    `Hi ${user.username}, \Your background image has been changed successfully`,
    'Background Image Change.'
  );
  return `Your profile image has been changed successfully`;
};

export const deleteMe = async (
  id: string,
): Promise<string> => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return 'User not found.';
  }
  user.isDisabled = true;
  user.lastModifiedBy = user.username;
  user.lastModifiedOn = new Date();
  user.save();
  // notification code goes here
  // await sendEmail(
  //   user.email,
  //   `Hi ${user.username}, \Your account has been successfully deleted.`,
  //   'Account Deleted.'
  // );
  return 'Your account has been deleted.';
};

export const getUserBySlugId = async (userIdSlug: string): Promise<UserResult> => {
  const user = await User.findOne({
    where: { userIdSlug },
    relations: ['posts', 'posts.comments', 'posts.comments.user'],
  });

  if (!user) {
    return {
      messages: ['User not found.'],
    };
  }
  return {
    user: user,
  };
};

export const searchUsers = async (): Promise<QueryArrayResult<User>> => {
const users = await User.createQueryBuilder('user')
    .orderBy('user.createdOn', 'DESC')
    .take(10)
    .getMany();

  if (!users || users.length === 0) {
    return {
      messages: ['No users found.'],
    };
  }
  
  return {
    entities: users,
  };
};

function userNotFound(usernameOrEmail: string) {
  return usernameOrEmail.includes("@")
    ? `User with email ${usernameOrEmail} not found.`
    : `User with username ${usernameOrEmail} not found.`;
}

// export const editProfileImage = async (
//   id: string,
//   profileImg: string
// ): Promise<string> => {
//   const user = await User.findOne({
//     where: { id },
//   });

//   if (!user) {
//     return 'User not found.';
//   }

//   if (!user.confirmed) {
//     return 'User has not confirmed their registration email yet.';
//   }

//   await getConnection()
//     .createQueryBuilder()
//     .update(User)
//     .set({
//       profileImage: profileImg,
//       lastModifiedBy: user.username,
//       lastModifiedOn: new Date(),
//     })
//     .where('id = :id', { id: id })
//     .execute();

//   // notification code goes here

//   const msg = await Message.create({
//     user,
//     title: `Profile Image Change`,
//     body: 'Your profile image has been changed successfully',
//     type: IMAGE_CHANGE,
//   }).save();

//   if (!msg) {
//     return 'Message was not created.';
//   }

//   await sendEmail(
//     user.email,
//     `Hi ${user.username}, \nYour profile image has been changed successfully`,
//     'Profile Image Change.'
//   );
//   return `Success-${profileImg}`;
// };

// To do 
// change password.




