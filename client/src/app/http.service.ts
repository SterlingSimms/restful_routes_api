import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient){
    this.getAllItems();
   }

 getAllItems(){
  let tempObservable = this._http.get('/items');
  tempObservable.subscribe(data => console.log("Got our items!", data));
};

getItem(id){
  let tempObservable = this._http.get(`/items/${id}`);
  tempObservable.subscribe(data => console.log("Got our item!", data));
};

putItem(id){
  let tempObservable = this._http.get(`/items/${id}`);
  tempObservable.subscribe(data => console.log("Item added!", data));
};

deleteItems(id){
  let tempObservable = this._http.get(`/items/${id}`);
  tempObservable.subscribe(data => console.log("Item deleted!", data));
};
}
