import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ODataServiceHandler } from './odata-service-handler';
import cds from '@sap/cds';
import { HttpAdapterHost } from '@nestjs/core';

@Module({
  imports: [],
  providers: [ODataServiceHandler],
})
export class OdataModule implements NestModule {
  constructor(
    private handler: ODataServiceHandler,
    private adapterHost: HttpAdapterHost,
  ) {}

  async configure(_consumer: MiddlewareConsumer) {
    await cds
      .serve('SampleService')
      .in((this.adapterHost.httpAdapter as any))
      .from("cds")
      .at('/odata')
      .with(this.handler.serviceHandler);
  }
}
