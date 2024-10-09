import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  /** Meant for fetching CSRF tokens via header `'X-CSRF-Token': 'Fetch'` */
  @Get('/token')
  getCsrfToken(): any { return }
}
