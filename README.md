## Sobre o Projeto

Esta é uma API Restful desenvolvida com Node.js, NestJS e TypeScript, seguindo os princípios de Clean Architecture, DDD (Domain-Driven Design) e Design Patterns. O projeto possui testes automatizados para garantir qualidade e confiabilidade.

### Principais Características
- Estrutura modular baseada em Clean Architecture
- Separação clara de camadas: Domain, Application, Infrastructure e Presentation
- Utilização de padrões de projeto (Design Patterns)
- Testes automatizados (unitários e e2e)
- Documentação e exemplos de uso

## Como Executar

Siga os passos abaixo para instalar as dependências, compilar e executar o projeto:

```bash
npm install
nest start
```

## Testes Automatizados

Execute os testes unitários e de integração:

```bash
npm run test      # Testes unitários
npm run test:e2e  # Testes end-to-end
npm run test:cov  # Cobertura de testes
```

## Estrutura de Pastas Sugerida

```
src/
  domain/         # Entidades, Value Objects, Interfaces, Regras de Negócio
  application/    # Casos de uso, Serviços de aplicação
  infrastructure/ # Repositórios, provedores externos
  presentation/   # Controllers, DTOs, validações
```

## Padrões e Práticas
- DDD: Modelagem do domínio e casos de uso
- Clean Architecture: Independência de frameworks e UI
- Design Patterns: Singleton, Factory, Repository, etc.
- Testes automatizados com Jest

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
