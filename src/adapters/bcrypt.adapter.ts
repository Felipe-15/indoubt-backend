import { Encryptor } from 'src/interfaces/encryptor.interface';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptAdapter implements Encryptor {
  async hash(payload: string): Promise<string> {
    const hash = await bcrypt.hash(payload, 10);
    return hash;
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    const isValid = await bcrypt.compare(payload, hashed);
    return isValid;
  }
}
