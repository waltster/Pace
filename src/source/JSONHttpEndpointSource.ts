import fetch from 'node-fetch';
import DataSource from './DataSource';
import SourceStatus from '../SourceStatus';

export default class JSONHttpEndpointSource extends DataSource {
  endpointURL: string;
  statusURL: string;
  headers: any;

  constructor(name: string, description: string, endpointURL: string, statusURL: string, headers: any){
    super("JSONHttpEndpoint", null, name, description);

    this.endpointURL = endpointURL;
    this.statusURL = statusURL;
    this.headers = headers;
  }

  protected async getDataInternal(): Promise<any> {
    try{
      console.log(`Sending request to ${this.endpointURL}`);

      var req = await fetch(this.endpointURL, {
        method: 'GET',
        headers: {
          ...this.headers,
        }
      });

      if(req.ok){
        return await req.json();
      }else{
        console.log(`${req.status} ${req.statusText}`)
        return null;
      }
    }catch(e){
      console.log(e);
      return null;
    }
  }


  async getStatus(): Promise<SourceStatus> {
    try{
      console.log(`Sending request to ${this.endpointURL}`);

      var req = await fetch(this.endpointURL, {
        method: 'GET',
        headers: {
          ...this.headers,
        }
      });

      if(req.ok){
        return new SourceStatus(this, "okay", "Source is connected");
      }else{
        return new SourceStatus(this, "error", "Unable to connect to service");
      }
    }catch(e){
      return new SourceStatus(this, "error", "Error occured while connecting to service");
    }
  }

  doAuthentication(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
