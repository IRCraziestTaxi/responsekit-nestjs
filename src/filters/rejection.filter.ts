import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { GenericResponse, Rejection } from "@responsekit/core";
import { Response } from "express";

/**
 * Catches Errors, HttpExceptions, and Rejections
 * and returns an appropriate GenericResponse.
 */
@Catch()
export class RejectionFilter implements ExceptionFilter {
    public catch(
        exception: Error | Rejection | HttpException,
        host: ArgumentsHost
    ): Response {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const message = exception.message || "An error occurred.";
        let status = 500;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
        }
        else if (exception instanceof Rejection) {
            status = exception.reason;
        }

        return response
            .status(status)
            .json(new GenericResponse({
                message,
                status
            }));
    }
}
