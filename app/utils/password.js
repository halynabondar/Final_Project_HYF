import bcrypt from 'bcryptjs';

export const saltAndHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password + salt, 10);
  return { salt, hash };
};

export const verifyPassword = async (password, salt, hashedPassword) => {
  const hash = await bcrypt.hash(password + salt, 10);
  return hash === hashedPassword;
};
