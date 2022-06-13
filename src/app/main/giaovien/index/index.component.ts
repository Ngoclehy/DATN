import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/core/services/data.service';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(private http: HttpClient, private DataService: DataService) {}
  p: number = 1;
  itemOnPage: number = 5;
  collection: any[] = [];
  keySearch: any = '';
  id_GiaoVien: any;
  handleSearch() {
    this.DataService.GET('api/giaovien/getAll').subscribe((res: any) => {
      this.collection = [];
      res.forEach((e: any) => {
        if (e.hoTen.toLowerCase().includes(this.keySearch.toLowerCase())) {
          this.collection.push(e);
        }
      });
      this.collection = this.collection.map((e: any, i: any) => {
        return {
          index: i,
          id_GiaoVien: e.id_GiaoVien,
          id: e.id,
          hoTen: e.hoTen,
          gioiTinh: e.gioiTinh,
          diaChi: e.diaChi,
          soDienThoai: e.soDienThoai,
        };
      });
      console.log(this.collection);
    });
  }
  ngOnInit(): void {
    this.DataService.GET('api/giaovien/getAll').subscribe((giaoviens: any) => {
      this.DataService.GET('api/lophoc/getAll').subscribe((lops: any) => {
        giaoviens.forEach((giaoviens: any) => {
          giaoviens.lop = '';
          lops.forEach((lop: any) => {
            if (giaoviens.id_LopHoc == lop.id_LopHoc) {
              giaoviens.lop = lop.tenLop;
            }
          });
        });
        // console.log(giaoviens)
        this.collection = giaoviens.map((val: any, i: any) => {
          return {
            index: i,
            ...val,
          };
        });
      });
    });
  }
  getData() {
    this.DataService.GET('api/giaovien/getAll').subscribe((res: any) => {
      this.collection = res.sort((a: any, b: any) => {
        if (a > b) return 1;
        return -1;
      });
      this.collection = this.collection.map((giaovien: any, i: any) => {
        return {
          index: i,
          ...giaovien,
        };
      });
      // console.log(res)
    });
  }
  handleDelete() {
    this.DataService.DELETE(
      'api/giaovien/delete',
      'Id',
      this.id_GiaoVien
    ).subscribe((res: any) => {
      this.close();
      this.getData();
    });
  }
  close() {
    $('#delete-cat-modal').modal('hide');
  }
  GetId(id: any) {
    this.id_GiaoVien = id;
    console.log(id);
  }
}
