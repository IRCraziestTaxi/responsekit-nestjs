import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { GenericResponse, ResponseStatus } from "@responsekit/core";
import { ValidationError } from "class-validator";

/**
 * Intercepts errors thrown by class-validator violations
 * and returns an appropriate GenericResponse.
 */
export const rejectionPipe = new ValidationPipe({
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
        let firstErrorMessage = "";

        const constraints =
            errors
            && errors[0]
            && errors[0].constraints;

        if (constraints) {
            // Will get the first "value" in the "constraints dictionary".
            firstErrorMessage = constraints[Object.keys(constraints)[0]];
        }

        return new BadRequestException(new GenericResponse({
            message: firstErrorMessage || "Invalid request.",
            status: ResponseStatus.Failure
        }));
    }
});
