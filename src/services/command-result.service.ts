import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, ICommand, IQuery, QueryBus, IEvent } from "@nestjs/cqrs";
import { CommandResult } from "@responsekit/core";

/**
 * Inject this service to get unified functionality for CQRS operations
 * for commads, events, and queries that return GenericResponses or throw Rejections.
 */
@Injectable()
export class CommandResultService {
    public constructor(
        private readonly _commandBus: CommandBus,
        private readonly _eventBus: EventBus,
        private readonly _queryBus: QueryBus
    ) {
    }

    public publish(event: IEvent): void {
        return this._eventBus.publish(event);
    }

    public async query<T>(query: IQuery): Promise<CommandResult<T>> {
        return this._queryBus.execute(query);
    }

    public async send<T>(command: ICommand): Promise<CommandResult<T>> {
        return this._commandBus.execute(command);
    }
}
