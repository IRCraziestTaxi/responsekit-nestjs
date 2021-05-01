import { DynamicModule, Global, Module } from "@nestjs/common";
import { CommandBus, CqrsModule, EventBus, QueryBus } from "@nestjs/cqrs";
import { CommandResultService } from "./services/command-result.service";

const commandResultServiceFactory = () => ({
    provide: CommandResultService,
    useFactory: (
        commandBus: CommandBus,
        eventBus: EventBus,
        queryBus: QueryBus
    ) => new CommandResultService(commandBus, eventBus, queryBus),
    inject: [CommandBus, EventBus, QueryBus]
});

@Global()
@Module({})
export class ResponsekitModule {
    public static forRoot(): DynamicModule {
        const providers = [commandResultServiceFactory()];

        return {
            imports: [CqrsModule],
            providers,
            exports: providers,
            module: ResponsekitModule
        };
    }
}
