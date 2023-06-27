import { compare, hash } from 'bcrypt';
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import { secret } from '../config.js';
import { PayloadToken } from '../types/payload.token.js';
import { HttpError } from '../types/http.error.js';

export class AuthServices {
  private static salt = 10;

  static createJWT(payload: PayloadToken) {
    const token = sign(payload, secret!);
    return token;
  }

  static verifyJWTGettingPayload(token: string) {
    try {
      const result = verify(token, secret!);
      if (typeof result === 'string') {
        throw new HttpError(498, 'Invalid token', result);
      }

      return result as PayloadToken;
    } catch (error) {
      throw new HttpError(498, 'Invalid token', (error as Error).message);
    }
  }

  static hash(value: string) {
    return hash(value, AuthServices.salt);
  }

  static compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
export { PayloadToken };

