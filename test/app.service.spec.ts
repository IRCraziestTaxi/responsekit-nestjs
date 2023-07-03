import { Test, TestingModule } from "@nestjs/testing";
import { ResponsekitModule } from "../src";
import { AppService } from "./app.service";

describe("AppService", () => {
    let service: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ResponsekitModule.forRoot()],
            providers: [AppService]
        }).compile();

        service = module.get<AppService>(AppService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should have commandResultService", () => {
        expect(service.commandResultService).toBeDefined();
    });
});
