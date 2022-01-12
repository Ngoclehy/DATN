import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

declare const $: any
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(
    private router: Router,
    private DataService: DataService,
    private notifiService: NotificationService
  ) {}

  p: number = 1;
  itemOnPage: number = 5;
  collection: any[] = [];
  keySearch: any = '';
  idPhieuThu: number = 0;
  date: any = ''
  getAllPhieuThu() {
    this.DataService.GET('api/phieuthu/getAll').subscribe((phieuthus: any) => {
      this.DataService.GET('api/hocsinh/getAll').subscribe((hocsinhs: any) => {
        phieuthus.forEach((phieuthu: any) => {
          phieuthu.hocsinh = {};
          hocsinhs.forEach((hocsinh: any) => {
            if (phieuthu.id_HocSinh == hocsinh.id_HocSinh) {
              phieuthu.hocsinh = { ...phieuthu.hocsinh, ...hocsinh };
            }
          });
        });
        phieuthus = phieuthus.reverse().map((value: any, index: any) => {
          return {
            index: index + 1,
            ...value,
          };
        });
        this.collection = phieuthus;
      });
    });
  }

  onChangeIdPhieuThu(idPhieuThu: any) {
    this.idPhieuThu = idPhieuThu;
  }

  handleDelete() {
    this.DataService.DELETE(
      'api/phieuthu/delete',
      'Id',
      this.idPhieuThu
    ).subscribe((res) => {
      this.getAllPhieuThu();
      $('#delete-cat-modal').modal('hide');
    });
    
  }

  handleSearch() {
    this.DataService.GET('api/phieuthu/getAll').subscribe((phieuthus: any) => {
      this.DataService.GET('api/hocsinh/getAll').subscribe((hocsinhs: any) => {
        phieuthus.forEach((phieuthu: any) => {
          phieuthu.hocsinh = {};
          hocsinhs.forEach((hocsinh: any) => {
            if (phieuthu.id_HocSinh == hocsinh.id_HocSinh) {
              phieuthu.hocsinh = { ...phieuthu.hocsinh, ...hocsinh };
            }
          });
        });
        if(this.date != '') {
          phieuthus = phieuthus.filter((value: any) => {
            return value.ngayThu == this.date
          })
        }
        let _phieuthus = [...phieuthus];
        phieuthus = _phieuthus.filter((value: any) => {
          return value.hocsinh.hoTen
            .toLowerCase()
            .includes(this.keySearch.toLowerCase());
        });
        if (phieuthus.length < 1) {
          phieuthus = _phieuthus.filter((value: any) => {
            return value.tenPhieuThu
              .toLowerCase()
              .includes(this.keySearch.toLowerCase());
          });
        }
        phieuthus = phieuthus.reverse().map((value: any, index: any) => {
          return {
            index: index + 1,
            ...value,
          };
        });
        this.collection = phieuthus;
      });
    });

    // if (this.collection.length < 1) {
    //   this.collection = this.collection.filter((value: any) => {
    //     return value.tenPhieuThu.includes(this.keySearch);
    //   });
    // }
  }

  filterDate(date: any) {
    this.date = date;
  }

  ngOnInit(): void {
    this.getAllPhieuThu();
  }
}
