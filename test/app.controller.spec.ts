import { Test, TestingModule } from "@nestjs/testing";
import { ResponsekitModule } from "../src";
import { AppController } from "./app.controller";

describe("AppController", () => {
    let controller: AppController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ResponsekitModule.forRoot()],
            controllers: [AppController]
        }).compile();

        controller = module.get<AppController>(AppController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should have commandResultService", () => {
        expect(controller.commandResultService).toBeDefined();
    });
});
