export const checkRole = async (
  roleArry: string[] | Array<String>,
  role: string
) => {
  for (let i = 0; i < roleArry.length; i++) {
    if (roleArry[i] === role.split(" ").toString()) {
      return true;
    }
  }
};

export const checkUser = async (role: string) => {
  if (role === "user") {
    return true;
  }
};

export const verifyRole = async (role: string) => {};
