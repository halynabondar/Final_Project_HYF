import bcrypt from 'bcryptjs';

export const saltAndHashPassword = async (password, salt) => {
  return await bcrypt.hash(password + salt, 10);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
