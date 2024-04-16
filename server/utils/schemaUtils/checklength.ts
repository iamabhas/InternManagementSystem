import user from "../../src/database/schema/user.schema";

export const EmailValidation: (email: string) => Promise<any> = async (
  email: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      reject(
        "Email Must Contain An Uppercase or LowerCase or an UnderScore Character"
      );
    } else {
      resolve(true);
    }
  });
};

export const userNameValidation: (username: string) => Promise<any> = (
  username: string
) => {
  return new Promise(async (resolve, reject) => {
    await user.findOne({ username: username }).then((result) => {
      if (result?.username !== username) {
        reject("Invalid Username , Please Try Again");
      }

      const check: boolean = username.length > 5 ? true : false;

      resolve(check);
    });
  });
};
