import DataSource from './source/DataSource';

export default class SourceStatus {
  readonly uid: string;
  status: any = {};
  name: string;
  type: string;
  
  constructor(source: DataSource, statusLevel: string, description?: string){
    this.uid = source.uid;
    this.name = source.name;
    this.type = source.type;
    this.status.level = statusLevel;
    this.status.description = description || "";
  }
}
