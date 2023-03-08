enum ENVIRONMENT {
  DEV = 'development',
  PROD = 'production',
}

export const detectEnv = (): string => {
  return process.env.NODE_ENV;
};
export const getUrl = (env: string): string => {
  switch (env) {
    case ENVIRONMENT.DEV:
      return 'http://localhost:3000/';
    case ENVIRONMENT.PROD:
      return '';
    default:
      return '';
  }
};

// program to generate random strings

export const generateString = (length: number): string => {
  console.log(process.env.SECRETE_KEY);
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!&$@#*%()';
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const generateUniqueID = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
