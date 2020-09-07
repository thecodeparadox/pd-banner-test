import { Injectable } from '@nestjs/common';
import { Message } from '@prodata-banner-creator/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome ProData Banner Generator API!' };
  }
}
