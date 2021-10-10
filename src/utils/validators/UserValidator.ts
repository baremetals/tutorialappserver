export const isEmailValid = (email: string) => {
  if (!email) return "Email cannot be empty";
  if (!email.includes("@")) {
    return "Please enter a valid email address.";
  }
  if (/\s+/g.test(email)) {
    return "Email cannot have whitespaces";
  }
  return "";
};

export interface UserNameTestResult {
  message: string;
  isValid: boolean;
}

export const isUserNameValid = (userName: string): UserNameTestResult => {
  const userNameTestResult: UserNameTestResult = {
    message: "",
    isValid: true,
  };

  if (userName.length < 2) {
    userNameTestResult.message = "UserName must be at least 2 characters";
    userNameTestResult.isValid = false;
    return userNameTestResult;
  }

  const regex = /^[a-zA-Z0-9\d-_]*$/;
  if (regex.test(userName.trim()) !== true) {
    userNameTestResult.message =
      "Username must only contain letters, numbers, hyphens or an underscore(a-z0-9/_)";
    userNameTestResult.isValid = false;
  }

  return userNameTestResult;
};
