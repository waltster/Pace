import DataSource from './DataSource';
import SourceStatus from '../SourceStatus';

export default class JSONObjectSource extends DataSource {
  obj: any;

  constructor(name: string, description: string, obj: any){
    super("JSONObject", null, name, description);

    this.obj = obj;
  }

  protected async getDataInternal(): Promise<any> {
    return Promise.resolve(this.obj);
  }

  async getStatus(): Promise<SourceStatus> {
    return new SourceStatus(this, "okay", "Source is connected");
  }

  async doAuthentication(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
