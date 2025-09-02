import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env-config.interface';

@Injectable()
export class EnvConfigService  implements EnvConfig{
  [x: string]: any;
  constructor(private configService: ConfigService) {}
  getAppPort(): number {
    return this.configService.get<number>('PORT', 3000);
  }
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }
}
