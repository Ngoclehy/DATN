import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private http: HttpClient,
    private DataService: DataService) { }
  p: number = 1;
  permisionId: any;
  itemOnPage: number = 5;
  collection: any[] = [];
  keySearch: any = ""

  handleSearch() {

    this.DataService.GET('api/user/getAll').subscribe(
      (res: any) => {
        //this.collection = []
        this.collection =res.filter((user: any) => {
          return user.name.toLowerCase().includes(this.keySearch.value.toLowerCase());
        })
        this.collection = this.collection.map((user: any, i: any) => {
          return {
            index: i,
          ...user
          }
        })
      //  console.log(this.collection)
      })
  }
  ngOnInit(): void {
    this.getData();

  }
  getData(){
    this.DataService.GET('api/user/getAll').subscribe(
      (res: any) => {

        res.forEach((value:any)=>{
          value.subdata=value.subdata.map((val:any)=>{
            return val.name
          }).join(', ')

        })
       this.collection = res
        this.collection =this.collection.map((user: any, i: any) => {
          return {
            index: i,
           ...user
          }
        })
       console.log(res)
      }
    )
  }


}
