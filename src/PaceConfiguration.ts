import {v4 as uuidv4} from 'uuid';
import SourceManager from './SourceManager';
import JSONHttpEndpointSource from './source/JSONHttpEndpointSource';
import JSONObjectSource from './source/JSONObjectSource';

export default class PaceConfiguration {
  raw_configuration: any;
  clean_configuration: any;
  sourceManager: SourceManager;

  constructor(sourceManager: SourceManager, configuration: any){
    this.sourceManager = sourceManager;
    this.raw_configuration = configuration;

    this.load();
  }

  private addJSONHttpEndpoint(uid: string, source: any){
    var sourceObj = new JSONHttpEndpointSource(
      source.name,
      source.description || "",
      source.endpointURL,
      source.statusURL,
      source.headers || ""
    );

    sourceObj.setUID(uid);

    this.sourceManager.addSource(sourceObj);
  }

  private addJSONObject(uid: string, source: any){
    var sourceObj = new JSONObjectSource(
       source.name,
       source.description || "",
       source.object
    );

    sourceObj.setUID(uid);

    this.sourceManager.addSource(sourceObj);
  }

  load() {
    var sources = this.raw_configuration['sources'];

    if(sources && Array.isArray(sources)){
      for(const source of sources){
        var uid = source.uid || uuidv4();
        var name = source.name;
        var type = source.type;

        if(!name || !type){
          console.log(`Cannot add source, missing name and type.`);
          continue;
        }

        switch(type){
          case 'JSONHttpEndpoint':
            this.addJSONHttpEndpoint(uid, source);
            break;
          case 'JSONObject':
            this.addJSONObject(uid, source);
            break;
          default:
            console.log(`Cannot add source. Unsupported type: ${type}`);
            break;
        }
      }
    }
  }
}
