import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {


  constructor(private http: HttpClient, private DataService: DataService) { }
  p: number = 1;
  itemOnPage: number = 5;
  collection: any[] = [];
  keySearch: any = ""
  hocsinhs=[];
  id_HocSinh:any;
  handleSearch() {

    this.DataService.GET('api/hocsinh/getAll').subscribe(
      (res: any) => {
        this.collection = []
        res.forEach((e: any) => {
          if (e.hoTen.toLowerCase().includes(this.keySearch.toLowerCase())) {
            this.collection.push(e)
          }
        })
        this.collection = this.collection.map((e: any, i: any) => {
          return {
            index: i,
            id_HocSinh: e.id_HocSinh,
            id: e.id,
            hoTen: e.hoTen,
            gioiTinh:e.gioiTinh,
            namSinh:e.namSinh,
            diaChi:e.diaChi,
            sdt:e.sdt,
            ngayDangKyHoc:e.ngayDangKyHoc,
            tenPhuHuynh: e.tenPhuHuynh,


          }
        })
        console.log(this.collection)
      })
  }
  getData(){
    this.DataService.GET('api/hocsinh/getAll').subscribe(
      (res: any) => {
        this.collection = res
        this.collection =this.collection.map((hocsinh: any, i: any) => {
          return {
            index: i,
           ...hocsinh
          }
        })
       // console.log(res)
      }
    )
  }
  ngOnInit(): void {
    this.DataService.GET('api/hocsinh/getAll').subscribe(
      (hocsinhs: any) => {


        this.DataService.GET('api/lophoc/getAll').subscribe(
          (lops:any)=>{
            hocsinhs.forEach((hocsinh:any)=>{
              hocsinh.lop=''
              lops.forEach((lop:any)=>{
                if(hocsinh.id_LopHoc==lop.id_LopHoc){
                  hocsinh.lop=lop.tenLop
                }
              })

            })
            console.log(hocsinhs)
            this.collection=hocsinhs.map((val:any, i:any)=>
            {
              return {
                    index: i,
                   ...val
                  }
            })
          }
        )
      }
    )
  }
  handleDelete(){
    this.DataService.DELETE('api/hocsinh/delete','Id',this.id_HocSinh).subscribe(
      (res:any)=>{
        this.close()
        this.getData()
    })

  }
  close() {
    $("#delete-cat-modal").modal("hide");
  }
  GetId(id:any){
    this.id_HocSinh = id
    console.log(id)
  }

}
