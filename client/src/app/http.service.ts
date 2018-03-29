import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {
  constructor(private _http: Http){
    }

getAllItems(){
  return this._http.get('/items')
};

getItem(item){
  return this._http.get(`/items/${item._id}`, item);
};

editItem(item){
  return this._http.put(`/items/${item._id}`, item);
};


addItem(new_item){
  return this._http.post('/items', new_item);
};

deleteItem(item){
  return this._http.delete(`/items/${item._id}`, item);
};
};
