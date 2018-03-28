import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  items = [];
  item;
  new_item = {
    title: '',
    description: ''
  };

constructor(private _httpService: HttpService){}

ngOnInit(){
}

getTasksFromService() {
  let observable = this._httpService.getAllItems();
  observable.subscribe((data) =>{
    this.items = data.json().data
    console.log(this.items)
  });
};

getItem(){
  let observable = this._httpService.getItem(this.item);
  observable.subscribe( (data) => {
    this.item = data.json().item
});
};

editItem(){
  let Observable = this._httpService.editItem(this.item);
  Observable.subscribe()
}

addItem(){
let Observable = this._httpService.addItem(this.new_item);
Observable.subscribe()
}

deleteItem(){
  let Observable = this._httpService.deleteItem(this.item)
  Observable.subscribe()
  };
};