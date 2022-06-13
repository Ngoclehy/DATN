import { DataService } from './../../../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css'],
})
export class ChitietComponent implements OnInit {
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private DataService: DataService
  ) {}

  decodedString: any;
  tenlop = '';

  diemdanhList: any = [];
  lophocList: any;
  hocsinhList: any;

  ngOnInit(): void {
    this.getLopHocs();
    this.getHocSinhs();
    this.router.params.subscribe((e) => {
      this.decodedString = atob(e.id).split(' ');
      this.DataService.GET(`api/lophoc/getAll`).subscribe((e: any) => {
        this.tenlop = e.find((r) => {
          return r.id_LopHoc == this.decodedString[0];
        })?.tenLop;
        return e;
      });
      this.getDiemDanhList(this.decodedString[0], this.decodedString[1]);
    });
  }

  getLopHocs() {
    this.DataService.GET(`api/lophoc/getAll`).subscribe(
      (e) => (this.lophocList = e)
    );
  }

  getHocSinhs() {
    this.DataService.GET(`api/hocsinh/getAll`).subscribe(
      (e) => (this.hocsinhList = e)
    );
  }

  getDiemDanhList(idLopHoc: any, date: any) {
    this.DataService.GET('api/diemdanh/getAll').subscribe((res: any) => {
      this.diemdanhList = res
        .filter((e) => e.idLopHoc == idLopHoc && e.date == date)
        .map((e, i) => ({
          ...e,
          index: i + 1,
          tenHocsinh: this.hocsinhList
            ? this.hocsinhList?.find((r) => {
                return r.id_HocSinh == e.idHocSinh;
              })?.hoTen
            : this.getDiemDanhList(idLopHoc, date),
          ngaysinh: this.hocsinhList
            ? this.hocsinhList?.find((r) => {
                return r.id_HocSinh == e.idHocSinh;
              })?.namSinh
            : this.getDiemDanhList(idLopHoc, date),
          tenLopHoc: this.lophocList
            ? this.lophocList?.find((r) => {
                return r.id_LopHoc === e.idLopHoc;
              }).tenLop
            : this.getDiemDanhList(idLopHoc, date),
        }))
        .sort((a, b) => {
          if (a.tenHocsinh > b.tenHocsinh) {
            return 1;
          }
          return -1;
        })
        .map((e, i) => ({ ...e, index: i + 1 }));
    });
  }
}
