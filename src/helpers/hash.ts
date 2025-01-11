
import bcrypt from 'bcrypt';

export const hashPassword =  async (password: string, hash: string) => {
    const response = await bcrypt.compare(password,hash);
    return response;
}



