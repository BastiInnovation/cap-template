import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OdataModule } from './odata/odata.module';

@Module({
  imports: [ConfigModule.forRoot(), 
            OdataModule
          ],
  controllers: [AppController, ],
  providers: [AppService, ],
  exports: []
})
export class AppModule {
  constructor() {
   
  }
}

/**
 * Since injected services are only accessible within the DI context, this helper class
 * provides static accessors for such  services when required e.g. within Factories.
 */

