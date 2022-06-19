import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

import { jsPDF } from 'jspdf';

declare const Validator: any, $: any;
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;
  public SavePDF(): void {
    var element = document.getElementById('content');
    var opt = {
      margin: 1,
      filename: 'output.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private notiService: NotificationService
  ) {}
  phieuThuId: any = this.route.snapshot.paramMap.get('id');
  phieuthu: any = {};
  giaoviens: any = [];
  hocsinhs: any = [];
  lophocs: any = [];
  idKhoanThu: any;
  p: number = 1;
  khoanthus: any;
  khoanthu: any = {};
  id_KhoanThu: any;
  hocsinhId: any;

  getPhieuThuById() {
    this.dataService
      .GET('api/phieuthu/getById?id=' + this.phieuThuId)
      .subscribe((phieuthu: any) => {
        console.log(phieuthu);
        this.dataService
          .GET('api/CTPhieuThu/getAll')
          .subscribe((ctphieuthus: any) => {
            phieuthu.ctphieuthus = [];
            ctphieuthus.forEach((ctphieuthu: any) => {
              if (phieuthu.id_PhieuThu == ctphieuthu.id_PhieuThu) {
                phieuthu.ctphieuthus.push(ctphieuthu);
              }
            });

            this.dataService
              .GET('api/khoanthu/getAll')
              .subscribe((khoanthus: any) => {
                phieuthu.ctphieuthus.forEach((ctphieuthu: any) => {
                  ctphieuthu.khoanthu = {};
                  khoanthus.forEach((khoanthu: any) => {
                    if (ctphieuthu.id_KhoanThu == khoanthu.id_KhoanThu) {
                      ctphieuthu.khoanthu = {
                        ...ctphieuthu.khoanthu,
                        ...khoanthu,
                      };
                    }
                  });
                });

                this.dataService
                  .GET('api/hocsinh/getById?id=' + phieuthu.id_HocSinh)
                  .subscribe((hocsinh: any) => {
                    this.dataService
                      .GET('api/lophoc/getAll')
                      .subscribe((lophocs: any) => {
                        const lopHoc = lophocs.find(
                          (e) => e.id_LopHoc == hocsinh.id_LopHoc
                        );
                        console.log(phieuthu);
                        phieuthu = { ...phieuthu, id_LopHoc: lopHoc.id_LopHoc };
                        this.phieuthu = phieuthu;
                        this.hocsinhId = this.phieuthu.id_HocSinh;
                        this.onChangeLopHoc(this.phieuthu.id_LopHoc);
                      });
                  });
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

  handleOnChangeHocSinh(e: any) {
    this.hocsinhId = e.target.value;
  }

  getKhoanThu() {
    this.dataService.GET('api/khoanthu/getAll').subscribe((khoanthus: any) => {
      this.dataService
        .GET('api/hocsinh/getById?id=' + this.hocsinhId)
        .subscribe((hocsinh: any) => {
          this.dataService
            .GET('api/lophoc/getAll')
            .subscribe((lophocs: any) => {
              this.dataService
                .GET('api/hehoc/getAll')
                .subscribe((hehocs: any) => {
                  const lophocByHocSinh = lophocs.find(
                    (lophoc) => lophoc.id_LopHoc == hocsinh.id_LopHoc
                  );
                  const heHocByLopHoc = hehocs.find(
                    (hehoc) => hehoc.id_HeHoc == lophocByHocSinh.id_HeHoc
                  );

                  this.khoanthus = khoanthus.filter(
                    (e) => e.heHoc == heHocByLopHoc.id_HeHoc || e.heHoc == 0
                  );

                  this.phieuthu.ctphieuthus.forEach((khoanthu: any) => {
                    this.khoanthus.forEach((val: any, index: any) => {
                      if (khoanthu.id_KhoanThu == val.id_KhoanThu) {
                        this.khoanthus.splice(index, 1);
                      }
                    });
                  });
                });
            });
        });
    });
  }

  insertCTPT(val: any) {
    this.dataService
      .GET('api/khoanthu/getById?id=' + val)
      .subscribe((khoanthu: any) => {
        this.dataService
          .POST('api/CTPhieuThu/insert', {
            id_PhieuThu: this.phieuThuId,
            id_KhoanThu: khoanthu.id_KhoanThu,
            soLuong: 1,
            thanhTien: khoanthu.soTienThu,
          })
          .subscribe((res) => {
            return res;
          });
      });
  }
  saveKhoanThu() {
    let listKhoanThuId: any = [];
    $('input[name]:checked').each((i: any, element: any) => {
      listKhoanThuId.push(element.value);
    });
    let requests: any = [];
    listKhoanThuId.forEach((val: any) => {
      requests.push(this.insertCTPT(val));
    });
    Promise.all(requests).then((res: any) => {
      this.notiService.alertSuccessMS('Thông báo', 'Bạn đã sửa thành công');
      setTimeout(() => {
        this.dataService
          .GET('api/CTPhieuThu/getAll')
          .subscribe((ctpts: any) => {
            ctpts = ctpts.filter(
              (ctpt: any) => ctpt.id_PhieuThu == this.phieuThuId
            );
            let total = ctpts.reduce(
              (acc: any, cur: any) => acc + cur.thanhTien,
              0
            );
            this.dataService
              .PUT('api/phieuthu/update', {
                ...this.phieuthu,
                tongTien: total,
              })
              .subscribe((res) => {
                this.getPhieuThuById();
                $('#modal-ThemKhoanThu').modal('hide');
              });
          });
      }, 1000);
    });
  }

  updateSoLuongKhoanThu(id_KhoanThu: any) {
    this.id_KhoanThu = id_KhoanThu;
    this.dataService
      .GET('api/CTPhieuThu/getById?id=' + id_KhoanThu)
      .subscribe((res: any) => {
        res.tenKhoanThu = '';
        this.dataService
          .GET('api/khoanthu/getById?id=' + res.id_KhoanThu)
          .subscribe((res1: any) => {
            res.tenKhoanThu = res1.tenKhoanThu;
            this.khoanthu = res;
            console.log(this.khoanthu);
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

  saveSoLuongKhoanThu(quantiy: any) {
    this.dataService
      .GET('api/CTPhieuThu/getById?id=' + this.id_KhoanThu)
      .subscribe((res: any) => {
        this.dataService
          .GET('api/khoanthu/getById?id=' + res.id_KhoanThu)
          .subscribe((res1: any) => {
            this.dataService
              .PUT('api/CTPhieuThu/update', {
                ...res,
                thanhTien: res1.soTienThu * quantiy,
                soLuong: quantiy,
              })
              .subscribe((res) => {
                setTimeout(() => {
                  this.dataService
                    .GET('api/CTPhieuThu/getAll')
                    .subscribe((ctpts: any) => {
                      ctpts = ctpts.filter(
                        (ctpt: any) => ctpt.id_PhieuThu == this.phieuThuId
                      );
                      let total = ctpts.reduce(
                        (acc: any, cur: any) => acc + cur.thanhTien,
                        0
                      );
                      this.dataService
                        .PUT('api/phieuthu/update', {
                          ...this.phieuthu,
                          tongTien: total,
                        })
                        .subscribe((res) => {
                          this.getPhieuThuById();
                          $('#modal-SuaSoluongKhoanThu').modal('hide');
                        });
                    });
                }, 1000);
              });
          });
      });
  }

  deleteKhoanThu(id_CTPhieuThu: any) {
    let data = { ...this.phieuthu };
    this.dataService
      .GET('api/CTPhieuThu/getById?id=' + id_CTPhieuThu)
      .subscribe((ctphieuthu: any) => {
        this.dataService
          .DELETE('api/CTPhieuThu/delete', 'Id', id_CTPhieuThu)
          .subscribe((res) => {
            delete data.ctphieuthus;
            this.dataService
              .PUT('api/phieuthu/update', {
                ...data,
                tongTien: data.tongTien - ctphieuthu.thanhTien,
              })
              .subscribe((res) => {
                this.getPhieuThuById();
              });
          });
      });
  }

  insertCTPhieuThu(idPhieuThu: any, data: any) {
    this.dataService
      .POST('api/CTPhieuThu/insert', {
        id_PhieuThu: idPhieuThu,
        id_KhoanThu: data.id_KhoanThu,
        soLuong: data.soLuong,
        thanhTien: data.soLuong * data.soTienThu,
      })
      .subscribe((res) => res);
  }

  validate() {
    Validator({
      form: '#formPhieuthu',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#tenPhieuThu'),
        Validator.isRequired('#tenGiaoVienPhieuThu'),
        Validator.isRequired('#hocSinhPhieuThu'),
        Validator.isRequired('#nguoiNopPhieuThu'),
        Validator.isRequired('#ngayThu'),
        Validator.isRequired('#phieuThuThang'),
      ],
      onSubmit: (data: any) => {
        Object.assign(data, {
          id_PhieuThu: this.phieuThuId,
          tongTien: this.phieuthu.tongTien,
        });
        this.dataService.PUT('api/phieuthu/update', data).subscribe((res) => {
          this.router.navigate([this.router.url]);
          this.notiService.alertSuccessMS('Thông báo', 'Cập nhập thành công');
        });
      },
    });
  }

  reload() {
    this.id_KhoanThu = this.id_KhoanThu;
    this.dataService
      .GET('api/CTPhieuThu/getById?id=' + this.id_KhoanThu)
      .subscribe((res: any) => {
        $('#quantity').val(this.khoanthu.soLuong);
      });
  }
  ngOnInit(): void {
    this.validate();
    this.getPhieuThuById();
    this.getAllGiaoVien();
    this.getAllLopHoc();
    this.getAllHocSinh();
  }
}
