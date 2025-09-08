import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { EnvConfigService } from "./env-config.service";

describe('EnvConfigService', () => {
  let configService: ConfigService;
  let service: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ })],
      providers: [EnvConfigService],
    }).compile();

    configService = {
      get: jest.fn(),
    } as any;
    service = new EnvConfigService(configService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return app port from config', () => {
    (configService.get as jest.Mock).mockReturnValue(8080);
    expect(service.getAppPort()).toBe(8080);
    expect(configService.get).toHaveBeenCalledWith('PORT', 3000);
  });

  it('should return default app port if not set', () => {
    (configService.get as jest.Mock).mockReturnValue(undefined);
    expect(service.getAppPort()).toBe(undefined);
    expect(configService.get).toHaveBeenCalledWith('PORT', 3000);
  });

  it('should return node env from config', () => {
    (configService.get as jest.Mock).mockReturnValue('production');
    expect(service.getNodeEnv()).toBe('production');
    expect(configService.get).toHaveBeenCalledWith('NODE_ENV', 'development');
  });

  it('should return default node env if not set', () => {
    (configService.get as jest.Mock).mockReturnValue(undefined);
    expect(service.getNodeEnv()).toBe(undefined);
    expect(configService.get).toHaveBeenCalledWith('NODE_ENV', 'development');
  });
});
