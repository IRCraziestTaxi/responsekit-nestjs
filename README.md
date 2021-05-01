# @responsekit/nestjs
Helpers for integrating responsekit into nestjs.

## Installation
After creating your Nest.JS application, install `@responsekit/core` and `@responsekit/nestjs`:

```
npm i @responsekit/core @responsekit/nestjs
```

## Other Prerequisites
In order to extend `CommandResultService`, `@nestjs/cqrs` must also be installed.

## RejectionFilter
The `RejectionFilter` intercepts `Error`s, `HttpException`s, and `Rejection`s thrown by the application and transforms them into a `GenericResponse` with the appropriate status if defined by a caught `Rejection`.

## RejectionPipe
The `RejectionPipe` intercepts validation errors thrown by `class-validator` on request bodies transformed by `class-transformer`.

## Using RejectionFilter and/or RejectionPipe
In `main.ts`, use the `useGlobalFilters` and `useGlobalPipes` methods.

```ts
import { NestFactory } from "@nestjs/core";
import { RejectionFilter, rejectionPipe } from "@responsekit/nestjs";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Use RejectionFilter globally.
    app.useGlobalFilters(new RejectionFilter());
    // Use RejectionPipe globally.
    app.useGlobalPipes(rejectionPipe);
    await app.listen(3000);
}
bootstrap();
```

## CommandResultSercice
`CommandResultService` allows application-wide processing of `@nestjs/cqrs` commands, events, and queries that return `GenericResponse`s or throw `Rejection`s. To use `CommandResultService` globally in your application, import `ResponsekitModule.forRoot()` in your `AppModule`.

```ts
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppleModule } from "./apple/apple.module";
import { OrangeModule } from "./orange/orange.module";
import { ResponsekitModule } from "@responsekit/nestjs";

@Module({
    imports: [
        AppleModule,
        OrangeModule,
        // Use CommandResultService globally.
        ResponsekitModule.forRoot()
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
```

Note that in order to use `CommandResultService`, `@nestjs/cqrs` must be installed.

Now you can inject `CommandResultService` anywhere in your application.

```ts
import { Body, Controller, Post, Res } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";
import { CommandResultService } from "@responsekit/nestjs";
import { Response } from "express";
import { AddAppleCommand } from "./commands/add-apple/add-apple.command";

@Controller("apples")
export class AppleController extends CommandResultController {
    public constructor(private readonly _service: CommandResultService) {
        super();
    }

    @Post()
    public async addApple(
        @Body()
        command: AddAppleCommand,
        @Res()
        response: Response
    ): Promise<Response> {
        const addResult = await this._service.send(command);

        return this.sendResponse(addResult, response);
    }
}
```

## Demonstration
See [`responsekit-nestjs-demo`](https://github.com/IRCraziestTaxi/responsekit-nestjs-demo) for a demonstration of the usage of this library in a Nest.JS application.