import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { microserviceURI } from '../../MicroserviceURI';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {
  constructor(private httpClient: HttpClient) {}

  get(){
    return this.httpClient.get(microserviceURI.officesUri);
  }

  getById(id:string){
    return this.httpClient.get(microserviceURI.officesUri + "/" + id);
  }

  create(body:any){
    return this.httpClient.post(microserviceURI.officesUri, body);
  }

  update(id:string, model:any){
    return this.httpClient.put(microserviceURI.officesUri + "/" + id, model)
  }

  changeStatus(id:string){
    return this.httpClient.put(microserviceURI.officesUri + id + "/status", null)
  }
}
