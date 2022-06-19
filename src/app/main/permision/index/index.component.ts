import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DataService } from 'src/app/core/services/data.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private DataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService
  ) { }

  p: number = 1;
  permisionId: any;
  itemOnPage: number = 5;
  collection: any[] = [];
  keySearch: any = ""
  actions: any[] = [];
  ngOnInit(): void {
    this.getData()
  }
  handleSearch() {

    this.DataService.GET('api/permision/getAll').subscribe(
      (res: any) => {
        //this.collection = []
        this.collection = res.filter((permision: any) => {
          return permision.name.toLowerCase().includes(this.keySearch.toLowerCase());
        })
        this.collection = this.collection.map((permision: any, i: any) => {
          return {
            index: i,
            ...permision
          }
        })
        //  console.log(this.collection)
      })
  }
  getData() {
    this.DataService.GET('api/permision/getAll').subscribe(
      (res: any) => {
        this.collection = res.sort((a: any, b: any) => {
          if (a > b) return 1
          return -1
        })
        this.collection = this.collection.map((permision: any, i: any) => {
          return {
            index: i,
            ...permision
          }
        })
        // console.log(res)
      }
    )
  }
  handleDelete() {
    var promise= new Promise((resolve)=>{
      this.DataService.DELETE('api/PermisionAction/DeletePermisionAction','id', this.permisionId).subscribe(
        res =>{
          resolve(res)
        },
        error=>this.notificationService.alertErrorMS("Thông bao",error)
      )
    })
    promise.then((res)=>
    {
      this.DataService.DELETE('api/Permision/Delete','id', this.permisionId).subscribe(res=>{
        this.close()
        this.getData()
      })

    })

  }
  GetId(id: any) {
    this.permisionId = id
    console.log(id)
  }
  close() {
    $("#delete-cat-modal").modal("hide");
  }
}
