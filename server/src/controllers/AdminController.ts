// import { getRepository } from 'typeorm';
import { Support } from '../entities/SharedEntity';
import { isPostBodyValid, isPostTitleValid } from '../utils/validators/PostValidators';
import { isEmailValid } from '../utils/validators/UserValidator';
import { QueryArrayResult } from './QuerryArrayResult';


export const createSupportMessage = async (
  fullName: string,
  email: string,
  subject: string,
  body: string,
  username?: string
): Promise<QueryArrayResult<Support>> => {
  //   const userRepository = getRepository(User);

  const trimmedEmail = email.trim().toLowerCase();

  const emailErrorMsg = isEmailValid(trimmedEmail);
  if (emailErrorMsg) {
    return {
      messages: [emailErrorMsg],
    };
  }
  const titleMsg = isPostTitleValid(subject);
  if (titleMsg) {
    return {
      messages: [titleMsg],
    };
  }
  const bodyMsg = isPostBodyValid(body);
  if (bodyMsg) {
    return {
      messages: [bodyMsg],
    };
  }

  const support = await Support.create({
    fullName,
    email,
    subject,
    body,
    username,
    createdBy: fullName,
    lastModifiedBy: fullName,
  }).save();

  if (!support) {
    return {
      messages: ['Failed to create support message.'],
    };
  }

  return {
    messages: ["Your message has been sent to support, we hope to get back to you within 48 hours."],
  };
};