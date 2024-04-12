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
