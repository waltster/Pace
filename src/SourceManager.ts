import DataSource from './source/DataSource';
import SourceStatus from './SourceStatus';

export default class SourceManager {
  sources: any;

  constructor(){
    this.sources = {};
  }

  hasSource(uid: string){
    return this.sources.hasOwnProperty(uid);
  }

  addSource(source: DataSource): boolean {
    if(!this.hasSource(source.uid)){
      this.sources[source.uid] = source;
      return true;
    }else{
      return false;
    }
  }

  removeSource(uid: string): boolean{
    if(this.hasSource(uid)){
      this.sources[uid] = undefined;
      return true;
    }else{
      return false;
    }
  }

  async getStatus(uid: string): Promise<SourceStatus> {
    if(!this.hasSource(uid)){
      return null;
    }else{
      return this.sources[uid].getStatus();
    }
  }

  async getData(uid: string): Promise<SourceStatus> {
    if(!this.hasSource(uid)){
      return null;
    }else{
      return this.sources[uid].getData();
    }
  }

  getAllSources(): DataSource[] {
    return Object.values(this.sources);
  }
}
