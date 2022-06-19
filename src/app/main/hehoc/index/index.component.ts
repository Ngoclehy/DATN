import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  constructor(private http: HttpClient, private DataService: DataService) { }
  p: number = 1;
  id_hehoc:any;
  itemOnPage: number = 5;
  collection: any[] = [];
  keySearch: any = ""

  handleSearch() {

    this.DataService.GET('api/hehoc/getAll').subscribe(
      (res: any) => {
        //this.collection = []
        this.collection =res.filter((hehoc: any) => {
          return hehoc.tenHeHoc.toLowerCase().includes(this.keySearch.toLowerCase());
        })
        this.collection = this.collection.map((hehoc: any, i: any) => {
          return {
            index: i,
          ...hehoc
          }
        })
      //  console.log(this.collection)
      })
  }


  ngOnInit(): void {
    this.DataService.GET('api/hehoc/getAll').subscribe(
      (res: any) => {
        this.collection = res.sort((a:any,b:any)=>
        {
          if (a>b) return 1
          return -1
        })
        this.collection =this.collection.map((hehoc: any, i: any) => {
          return {
            index: i,
           ...hehoc
          }
        })
       // console.log(res)
      }
    )
  } getData(){
    this.DataService.GET('api/hehoc/getAll').subscribe(
      (res: any) => {
        this.collection = res.sort((a:any,b:any)=>
        {
          if (a>b) return 1
          return -1
        })
        this.collection =this.collection.map((hehoc: any, i: any) => {
          return {
            index: i,
           ...hehoc
          }
        })
       // console.log(res)
      }
    )
  }
  handleDelete(){
    this.DataService.DELETE('api/hehoc/delete','Id',this.id_hehoc).subscribe(
      (res:any)=>{
        this.close()
        this.getData()
    })

  }
  GetId(id:any){
    this.id_hehoc = id
    console.log(id)
  }
  close() {
    $("#delete-cat-modal").modal("hide");
  }
}
