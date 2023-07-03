import { Controller } from "@nestjs/common";
import { CommandResultService } from "../src";

@Controller()
export class AppController {
    public constructor(private readonly _commandResultService: CommandResultService) {}

    // Note: You realistically wouldn't expose _commandResultService; this is just to test that it is defined.
    public get commandResultService(): CommandResultService {
        return this._commandResultService;
    }
}
