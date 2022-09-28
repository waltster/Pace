import {v4 as uuidv4} from 'uuid';
import SourceStatus from '../SourceStatus';

export default abstract class DataSource {
    uid: string;
    name: string;
    description?: string;
    type: string;

    constructor(type: string, uid: string, name: string, description?: string){
      this.type = type;
      this.uid = uid || uuidv4();
      this.name = name;
      this.description = description || "";
    }

    protected abstract getDataInternal(): Promise<any>;
    abstract getStatus(): Promise<SourceStatus>;
    abstract doAuthentication(): Promise<boolean>;

    setUID(uid: string){
      this.uid = uid;
    }
    
    async getData(): Promise<any> {
      var data = await this.getDataInternal();

      return {
        uid: this.uid,
        name: this.name,
        type: this.type,
        data: data
      };
    }
}
