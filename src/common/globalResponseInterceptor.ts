import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Data<T> {
  data: T;
}
@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Data<T>> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: data || {},
          code: 200,
          message: '请求成功',
          success: true,
        };
      }),
    );
  }
}
