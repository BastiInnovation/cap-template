import { Injectable } from "@nestjs/common";
import { Service } from "@sap/cds";

/** Handles OData requests and orchestrates the respectiove service calls and transformation */
@Injectable()
export class ODataServiceHandler {
    constructor() {}

    /** CDS-OData-Handler instance which is invoked for each OData request  */
    serviceHandler = (srv: Service) => {
        srv.on('READ', 'Sample', async(_req) => {
            return [{id: "10001", name: "Sample1"}, {id: "10002", name: "Sample2"}]
        });
    }
}
