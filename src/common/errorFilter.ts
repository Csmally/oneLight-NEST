import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';
const errorMessage = {
  404: 'Not Found',
  401: '未经授权',
  403: '禁止访问',
  400: '请求无效',
  500: '服务器繁忙，请稍后再试',
  614: '服务器繁忙，请稍后重试',
};

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : 614;
    response.status(status).json({
      success: false,
      code: status,
      data: exception.message,
      message: errorMessage[status],
      path: request.url,
      time: moment().format(),
    });
  }
}
