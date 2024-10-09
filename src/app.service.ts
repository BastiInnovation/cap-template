import { Injectable } from '@nestjs/common';

import axios from 'axios';
import { getDestinationServiceCredentials, getServiceCredentials } from '@sap-cloud-sdk/connectivity/dist/scp-cf';
import { DestinationOrFetchOptions, getDestination } from "@sap-cloud-sdk/connectivity";
import { requests } from "@sap/xssec";

@Injectable()
export class AppService {
  
  getVcapApplication() {
    return JSON.parse(process.env.VCAP_APPLICATION);
  }

  getHostName() {
    return this.getVcapApplication().application_uris[0];
  }

  /** Returns a list of subscribed tenants (independent from their onboarding state) */
  public async getSubscriptions(): Promise<string[]> {
    const credentials = getServiceCredentials("saas-registry");
    const response = await axios.post(credentials.url + "/oauth/token?grant_type=client_credentials", 
      {}, { auth: { username: credentials.clientid, password: credentials.clientsecret } });
    const token = response.data.access_token;
    // fetch subscriptions
    const subscriptions = await axios.get(credentials.tenant_onboarding_url + "/api/v2.0/subscription", {
      headers: { Authorization: `Bearer ${token}` } });
    const baseUrl = JSON.parse(process.env.VCAP_APPLICATION).application_uris[0];
    return subscriptions.data.map(subscription => {
      const url = subscription.subscriptionUrl;
      return url.substring(8, url.indexOf(baseUrl)-1);
    });
  }

  private async getDestination(tenant): Promise<DestinationOrFetchOptions> {
    const token = await new Promise((resolve, _reject) => requests.requestClientCredentialsToken(tenant, getDestinationServiceCredentials(), null, (err, token) => resolve(token)));
    return await getDestination({destinationName: process.env.DESTINATION_NAME, jwt: token as string, iasToXsuaaTokenExchange: false, useCache: true });
  }
}
