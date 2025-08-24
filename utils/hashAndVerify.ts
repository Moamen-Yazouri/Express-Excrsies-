import * as argon2 from "argon2";

export const createArgon2Hash = async (password: string): Promise<string> => {
    const hash = await argon2.hash(password);
    return hash;
}

export const verifyArgon2Hash = async (password: string, hash: string): Promise<boolean> => {
    const isVerified = await argon2.verify(hash, password);
    return isVerified;
}
