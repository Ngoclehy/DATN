import { NotificationService } from 'src/app/core/services/notification.service';
import { DataService } from 'src/app/core/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare const Validator: any, $: any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private notiService: NotificationService
  ) {}

  phieuChiId: any = this.route.snapshot.paramMap.get('id');
  phieuchi: any = {};
  giaoviens: any = [];
  hocsinhs: any = [];
  lophocs: any = [];
  idKhoanChi: any;
  p: number = 1;
  khoanchis: any;
  khoanchi: any = {};
  id_KhoanChi: any;

  getPhieuChiById() {
    this.dataService
      .GET('api/phieuchi/getById?id=' + this.phieuChiId)
      .subscribe((phieuchi: any) => {
        console.log(phieuchi);
        this.dataService
          .GET('api/CTPhieuChi/getAll')
          .subscribe((ctphieuchis: any) => {
            phieuchi.ctphieuchis = [];
            ctphieuchis.forEach((ctphieuchi: any) => {
              if (phieuchi.id_PhieuChi == ctphieuchi.id_PhieuChi) {
                phieuchi.ctphieuchis.push(ctphieuchi);
              }
            });

            this.dataService
              .GET('api/khoanchi/getAll')
              .subscribe((khoanchis: any) => {
                phieuchi.ctphieuchis.forEach((ctphieuchi: any) => {
                  ctphieuchi.khoanchi = {};
                  khoanchis.forEach((khoanchi: any) => {
                    if (ctphieuchi.id_KhoanChi == khoanchi.id_KhoanChi) {
                      ctphieuchi.khoanchi = {
                        ...ctphieuchi.khoanchi,
                        ...khoanchi,
                      };
                    }
                  });
                });

                this.phieuchi = phieuchi;
              });
          });
      });
  }

  getAllGiaoVien() {
    this.dataService.GET('api/giaovien/getAll').subscribe((giaoviens: any) => {
      this.dataService.GET('api/lophoc/getAll').subscribe((lophocs: any) => {
        giaoviens.forEach((giaovien: any) => {
          giaovien.lop = '';
          lophocs.forEach((lophoc: any) => {
            if (giaovien.id_LopHoc == lophoc.id_LopHoc) {
              giaovien.lop += lophoc.tenLop;
            }
          });
        });

        this.giaoviens = giaoviens.sort((a: any, b: any) => {
          if (a > b) return -1;
          return 1;
        });
      });
    });
  }

  getAllLopHoc() {
    this.dataService
      .GET('api/lophoc/getAll')
      .subscribe((lophocs) => (this.lophocs = lophocs));
  }

  getAllHocSinh() {
    this.dataService
      .GET('api/hocsinh/getAll')
      .subscribe((hocsinhs) => (this.hocsinhs = hocsinhs));
  }

  onChangeLopHoc(idLopHoc: any) {
    this.dataService.GET('api/hocsinh/getAll').subscribe((hocsinhs: any) => {
      if (idLopHoc == '0') {
        this.hocsinhs = hocsinhs;
      } else {
        this.hocsinhs = hocsinhs.filter(
          (hocsinh: any) => hocsinh.id_LopHoc == idLopHoc
        );
      }
    });
  }

  getKhoanChi() {
    this.dataService.GET('api/khoanchi/getAll').subscribe((khoanchis: any) => {
      let _khoanchis = [...khoanchis];
      this.phieuchi.ctphieuchis.forEach((khoanchi: any) => {
        khoanchis.forEach((val: any, index: any) => {
          if (khoanchi.id_KhoanChi == val.id_KhoanChi) {
            khoanchis.splice(index, 1);
          }
        });
      });
      this.khoanchis = khoanchis;
    });
  }

  insertCTPT(val: any) {
    this.dataService
      .GET('api/khoanchi/getById?id=' + val)
      .subscribe((khoanchi: any) => {
        this.dataService
          .POST('api/CTPhieuChi/insert', {
            id_PhieuChi: this.phieuChiId,
            id_KhoanChi: khoanchi.id_KhoanChi,
            soLuong: 1,
            thanhTien: khoanchi.soTienChi,
          })
          .subscribe((res) => {
            return res;
          });
      });
  }
  saveKhoanChi() {
    let listKhoanChiId: any = [];
    $('input[name]:checked').each((i: any, element: any) => {
      listKhoanChiId.push(element.value);
    });
    let requests: any = [];
    listKhoanChiId.forEach((val: any) => {
      requests.push(this.insertCTPT(val));
    });
    Promise.all(requests).then((res: any) => {
      this.notiService.alertSuccessMS('Thông báo', 'Bạn đã sửa thành công');
      setTimeout(() => {
        this.dataService
          .GET('api/CTPhieuChi/getAll')
          .subscribe((ctpts: any) => {
            ctpts = ctpts.filter(
              (ctpt: any) => ctpt.id_PhieuChi == this.phieuChiId
            );
            let total = ctpts.reduce(
              (acc: any, cur: any) => acc + cur.thanhTien,
              0
            );
            this.dataService
              .PUT('api/phieuchi/update', {
                ...this.phieuchi,
                tongTien: total,
              })
              .subscribe((res) => {
                this.getPhieuChiById();
                $('#modal-ThemKhoanChi').modal('hide');
              });
          });
      }, 1000);
    });
  }

  updateSoLuongKhoanChi(id_KhoanChi: any) {
    this.id_KhoanChi = id_KhoanChi;
    this.dataService
      .GET('api/CTPhieuChi/getById?id=' + id_KhoanChi)
      .subscribe((res: any) => {
        res.tenKhoanChi = '';
        this.dataService
          .GET('api/khoanchi/getById?id=' + res.id_KhoanChi)
          .subscribe((res1: any) => {
            res.tenKhoanChi = res1.tenKhoanChi;
            this.khoanchi = res;
          });
      });
  }

  Check(event: any) {
    var keyCode = event.keyCode;
    if (event.shiftKey) event.returnValue = false;
    else if (keyCode > 31 && (keyCode < 48 || keyCode > 57))
      event.returnValue = false;
    else event.returnValue = true;
  }

  saveSoLuongKhoanChi(quantiy: any) {
    this.dataService
      .GET('api/CTPhieuChi/getById?id=' + this.id_KhoanChi)
      .subscribe((res: any) => {
        this.dataService
          .GET('api/khoanchi/getById?id=' + res.id_KhoanChi)
          .subscribe((res1: any) => {
            this.dataService
              .PUT('api/CTPhieuChi/update', {
                ...res,
                thanhTien: res1.soTienChi * quantiy,
                soLuong: quantiy,
              })
              .subscribe((res) => {
                setTimeout(() => {
                  this.dataService
                    .GET('api/CTPhieuChi/getAll')
                    .subscribe((ctpts: any) => {
                      ctpts = ctpts.filter(
                        (ctpt: any) => ctpt.id_PhieuChi == this.phieuChiId
                      );
                      let total = ctpts.reduce(
                        (acc: any, cur: any) => acc + cur.thanhTien,
                        0
                      );
                      this.dataService
                        .PUT('api/phieuchi/update', {
                          ...this.phieuchi,
                          tongTien: total,
                        })
                        .subscribe((res) => {
                          this.getPhieuChiById();
                          $('#modal-SuaSoluongKhoanChi').modal('hide');
                        });
                    });
                }, 1000);
              });
          });
      });
  }

  deleteKhoanChi(id_CTPhieuChi: any) {
    let data = { ...this.phieuchi };
    this.dataService
      .GET('api/CTPhieuChi/getById?id=' + id_CTPhieuChi)
      .subscribe((ctphieuchi: any) => {
        this.dataService
          .DELETE('api/CTPhieuChi/delete', 'Id', id_CTPhieuChi)
          .subscribe((res) => {
            delete data.ctphieuchis;
            this.dataService
              .PUT('api/phieuchi/update', {
                ...data,
                tongTien: data.tongTien - ctphieuchi.thanhTien,
              })
              .subscribe((res) => {
                this.getPhieuChiById();
              });
          });
      });
  }

  insertCTPhieuChi(idPhieuChi: any, data: any) {
    this.dataService
      .POST('api/CTPhieuChi/insert', {
        id_PhieuChi: idPhieuChi,
        id_KhoanChi: data.id_KhoanChi,
        soLuong: data.soLuong,
        thanhTien: data.soLuong * data.soTienChi,
      })
      .subscribe((res) => res);
  }

  validate() {
    Validator({
      form: '#formPhieuchi',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#tenPhieuChi'),
        Validator.isRequired('#tenGiaoVienPhieuChi'),
        Validator.isRequired('#ngayChi'),
      ],
      onSubmit: (data: any) => {
        Object.assign(data, {
          id_PhieuChi: this.phieuChiId,
          tongTien: this.phieuchi.tongTien,
        });
        this.dataService.PUT('api/phieuchi/update', data).subscribe((res) => {
          this.router.navigate([this.router.url]);
          this.notiService.alertSuccessMS('Thông báo', 'Cập nhập thành công');
        });
      },
    });
  }

  reload() {
    this.id_KhoanChi = this.id_KhoanChi;
    this.dataService
      .GET('api/CTPhieuChi/getById?id=' + this.id_KhoanChi)
      .subscribe((res: any) => {
        $('#quantity').val(this.khoanchi.soLuong);
      });
  }
  ngOnInit(): void {
    this.validate();
    this.getPhieuChiById();
    this.getAllGiaoVien();
    this.getAllLopHoc();
    this.getAllHocSinh();
  }
}
