// By default bcrypt is used for password hashing and verification!!!
import { hash, verify, type Options } from '@node-rs/argon2';

const Opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const hashPassword = async (password: string) => {
  const hashed = await hash(password, Opts);
  return hashed;
};

export const verifyPassword = async (data: {
  password: string;
  hashed: string;
}) => {
  const { password, hashed } = data;

  const result = await verify(password, hashed, Opts);
  return result;
};
