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
  errors;
  new_item = {
    title: '',
    description: ''
  };
  edit_form = false;

constructor(private _httpService: HttpService){}

ngOnInit(){
  this.item = {_id: '', title: '', description: ''};
  this.errors = '';
  this.getTasksFromService();
}

getTasksFromService() {
  let observable = this._httpService.getAllItems();
  observable.subscribe((data) =>{

    this.items = data.json().data
   
  });
};

showEditForm(item) {
  this.item.title = item.title;
  this.item.description = item.description;
  this.item._id = item._id
  this.edit_form = true;
}

getItem(){
  let observable = this._httpService.getItem(this.item);
  observable.subscribe( (data) => {
    this.item = data.json().item
});
};

editItem(){
  let observable = this._httpService.editItem(this.item);
  observable.subscribe(
    (data) => {
      this.getTasksFromService();
    },
    (err) => {
      this.errors = err;
    }
  )
}

addItem(){
let observable = this._httpService.addItem(this.new_item);
observable.subscribe(
  (data) => {
    this.getTasksFromService();
  },
  (err) => {
    this.errors = err;
  }
)
}

deleteItem(item){
  this.item.title = item.title;
  this.item.description = item.description;
  this.item._id = item._id
  let observable = this._httpService.deleteItem(this.item)
  observable.subscribe(
    (data) => {
      this.getTasksFromService();
    },
    (err) => {
      this.errors = err;
    }
  )
}
}