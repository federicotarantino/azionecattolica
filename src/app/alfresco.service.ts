import { Injectable } from '@angular/core';
import {AlfrescoApi, NodesApi, SearchApi} from "@alfresco/js-api";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlfrescoService {

  public alfrescoApi: AlfrescoApi | undefined;
  public nodesApi: NodesApi | undefined;
  public searchApi: SearchApi | undefined;
  public root: string = "";

  constructor() {
    this.alfrescoApi = new AlfrescoApi({
      contextRoot: "alfresco",
      hostEcm: environment.host,
      provider: "ECM"
    });
    this.nodesApi = new NodesApi(this.alfrescoApi);
    this.searchApi = new SearchApi(this.alfrescoApi);
    // assicurarsi che esiste "Condiviso/ac"
    this.alfrescoApi.login(environment.username, environment.password).then(()=>{
      this.nodesApi?.getNode("-root-", {
        relativePath: "Condiviso/ac"
      }).then((item)=>{
        this.root = item.entry.id;
      })
    });
  }
}
