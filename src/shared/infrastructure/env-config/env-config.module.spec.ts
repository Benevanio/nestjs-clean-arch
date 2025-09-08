import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigModule } from './env-config.module';
import { EnvConfigService } from './env-config.service';

describe('EnvConfigModule', () => {
  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule],
    }).compile();
    expect(module).toBeDefined();
    const service = module.get<EnvConfigService>(EnvConfigService);
    expect(service).toBeDefined();
  });

  it('should provide EnvConfigService', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule],
    }).compile();
    const service = module.get<EnvConfigService>(EnvConfigService);
    expect(service).toBeInstanceOf(EnvConfigService);
  });

  it('should configure with forRoot', async () => {
    const dynamicModule = EnvConfigModule.forRoot({ isGlobal: true });
    expect(dynamicModule.module).toBe(EnvConfigModule);
    expect(dynamicModule.imports?.[0]).toBeInstanceOf(Object);
    expect(dynamicModule.providers).toContain(EnvConfigService);
    expect(dynamicModule.exports).toContain(EnvConfigService);
  });

  it('should import ConfigModule', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), EnvConfigModule],
    }).compile();
    const service = module.get<EnvConfigService>(EnvConfigService);
    expect(service).toBeDefined();
  });
});
