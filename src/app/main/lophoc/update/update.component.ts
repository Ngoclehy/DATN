import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
declare const Validator: any, $: any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private utilityService: UtilityService,

    private notiService: NotificationService,
    private dataService: DataService
  ) {}
  lop: any = {};
  lops: any = {};
  hehoc: any = [];
  hocsinh: number = 0;
  giaovien: number = 0;
  currentId = this.router.snapshot.paramMap.get('id');
  disabled='disabled';
  
  hocsinhByLop: any = [];
  hocsinhs: any = [];
  giaovienByLop: any = [];
  giaoviens: any = [];
  giaovienOther: any = [];

  hocsinhOther: any = [];
  // onchange idHocSinh
  idHocSinh: any;
  //onchange idGiaoVien
  idGiaoVien: any;
  p: number = 1;

  getData() {
    this.dataService
      .GET('api/lophoc/getById?id=' + this.currentId)
      .subscribe((lop: any) => {
        this.dataService.GET('api/hehoc/getAll').subscribe((hehocs: any) => {
          lop.hehoc = '';
          this.hehoc = hehocs;
          hehocs.forEach((hehoc: any) => {
            if (lop.id_HeHoc == hehoc.id_HeHoc) lop.hehoc = hehoc.tenHeHoc;
          });
          console.log(lop.hehoc);
          this.dataService
            .GET('api/giaovien/getAll')
            .subscribe((giaoviens: any) => {
              lop.giaovien = [];
              giaoviens.forEach((giaovien: any) => {
                if (giaovien.id_LopHoc == lop.id_LopHoc)
                  lop.giaovien.push(giaovien);
              });
              this.dataService
                .GET('api/hocsinh/getAll')
                .subscribe((hocsinhs: any) => {
                  this.hocsinhs = hocsinhs;
                  lop.hocsinh = [];
                  hocsinhs.forEach((hocsinh: any) => {
                    if (hocsinh.id_LopHoc == lop.id_LopHoc)
                      lop.hocsinh.push(hocsinh);
                  });

                  this.lop = lop;
                  this.hocsinh = lop.hocsinh.length;
                  this.giaovien = lop.giaovien.length;
                 
                  // lấy học sinh theo lớp học
                  this.hocsinhByLop = this.lop.hocsinh;
                  this.hocsinhOther = [...this.hocsinhs];

                  this.hocsinhs.forEach((val: any, i: any) => {
                    this.hocsinhByLop.forEach((val1: any) => {
                      if (val.id_HocSinh == val1.id_HocSinh) {
                        this.hocsinhOther.forEach((e: any, index: any) => {
                          if (e.id_HocSinh == val.id_HocSinh) {
                            this.hocsinhOther.splice(index, 1);
                          }
                        });
                      }
                    });
                  });
                  this.giaovienByLop = this.lop.giaovien;
                  this.giaovienOther = [...giaoviens];

                  giaoviens.forEach((val: any, i: any) => {

                    this.giaovienByLop.forEach((val1: any) => {
                      if (val.id_GiaoVien == val1.id_GiaoVien) {
                        this.giaovienOther.forEach((e: any, index: any) => {
                          if (e.id_GiaoVien == val.id_GiaoVien) {
                            this.giaovienOther.splice(index, 1);
                          }
                        });


                      }
                    });
                  });
                  console.log(this.giaovienOther)
                  this.dataService
                    .GET('api/lophoc/getAll')
                    .subscribe((lops: any) => {
                      this.giaovienOther.forEach((gv: any) => {
                        gv.tenLop = 'Chưa có lớp nào';
                        lops.forEach((lop: any) => {
                          if (gv.id_LopHoc == lop.id_LopHoc) {
                            gv.tenLop = lop.tenLop;
                          }
                        });
                      });

                    });

                  this.dataService
                    .GET('api/lophoc/getAll')
                    .subscribe((lops: any) => {
                      this.hocsinhOther.forEach((hs: any) => {
                        hs.tenLop = 'Chưa có lớp nào';
                        lops.forEach((lop: any) => {
                          if (hs.id_LopHoc == lop.id_LopHoc) {
                            hs.tenLop = lop.tenLop;
                          }
                        });
                      });
                    });
                });
            });
        });
      });
  }
  validate() {
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#tenLop'),
        Validator.isRequired('#select_cat'),
      ],
      onSubmit: (data: any) => {
        data = {
          id_LopHoc: this.currentId,
          // slug:this.utilityService.makeSeoTitle(data.tenHeHoc),
          ...data,
        };
        //console.log(data)
        this.dataService.PUT('api/lophoc/update', data).subscribe(
          (res: any) => {
            this.notiService.alertSuccessMS(
              'thông báo',
              'Bạn đã thêm thành công .'
            );
            this.getData();

            $('#exampleModal-infor').modal('hide');
          },
          (err) =>
            this.notiService.alertErrorMS(
              'Thông báo',
              'có lỗi xảy ra vui lòng thử lại'
            )
        );
      },
    });
  }

  addHocSinh() {
    let listHocsinhId: any = [];
    $('input[name]:checked').each((i: any, element: any) => {
      listHocsinhId.push(element.value);
    });

    let updateHocsinh = (id: any) => {
      return new Promise((rs: any, rj: any) => {
        this.dataService
          .GET('api/hocsinh/getById?id=' + id)
          .subscribe((hocsinh: any) => {
            this.dataService
              .PUT('api/hocsinh/update', {
                ...hocsinh,
                id_LopHoc: this.currentId,
              })
              .subscribe((res) => rs(res));
          });
      });
    };
    let request: any = [];
    listHocsinhId.forEach((id: any) => {
      request.push(updateHocsinh(id));
    });
    Promise.all(request).then((res: any) => {
      this.getData();
      $('#exampleModal-add').modal('hide');
    });
  }

  onChangeIdHocSinh(idHocSinh: any) {
    this.idHocSinh = idHocSinh;
  }

  handleDeleteHocSinh() {
    this.dataService
      .GET('api/hocsinh/getById?id=' + this.idHocSinh)
      .subscribe((hocsinh: any) => {
        this.dataService
          .PUT('api/hocsinh/update', {
            ...hocsinh,
            id_LopHoc: 0,
          })
          .subscribe((hocsinh: any) => {
            this.getData();
            $('#modal-delete-hocsinh').modal('hide');
          });
      });
  }

  addGiaoVien() {
    let listGiaoVienId: any = [];
    let lengthListGiaoVienId: any = [];
    $('input[name]:checked').each((i: any, element: any) => {
      listGiaoVienId.push(element.value);
    });
    lengthListGiaoVienId = listGiaoVienId.length;
    //console.log(listGiaoVienId)
    this.dataService
      .GET('api/lophoc/getById?id=' + this.currentId)
      .subscribe((lop: any) => {
        this.dataService
        .GET('api/giaovien/getAll')
        .subscribe((giaoviens: any) => {
          lop.giaovien = [];
          giaoviens.forEach((giaovien: any) => {
            if (giaovien.id_LopHoc == lop.id_LopHoc)
              lop.giaovien.push(giaovien);
          });
          this.giaovien = lop.giaovien.length;
          console.log(this.giaovien)
          if(lengthListGiaoVienId+this.giaovien<=2)
          {
            let updateGiaoVien = (id: any) => {
      return new Promise((rs: any, rj: any) => {
        this.dataService
          .GET('api/giaovien/getById?id=' + id)
          .subscribe((giaovien: any) => {
            this.dataService
              .PUT('api/giaovien/update', {
                ...giaovien,
                id_LopHoc: this.currentId,
              })
              .subscribe((res) => rs(res));

          });
      });
    };
    let request: any = [];
    listGiaoVienId.forEach((id: any) => {
      request.push(updateGiaoVien(id));
    });
    Promise.all(request).then((res: any) => {
      this.getData();
      $('#exampleModal-addGV').modal('hide');
    });
          }else {
            alert("Lớp học có tối đa 2 giáo viên")
          }
        })
      })
     
    
    
    // let updateGiaoVien = (id: any) => {
    //   return new Promise((rs: any, rj: any) => {
    //     this.dataService
    //       .GET('api/giaovien/getById?id=' + id)
    //       .subscribe((giaovien: any) => {
    //         this.dataService
    //           .PUT('api/giaovien/update', {
    //             ...giaovien,
    //             id_LopHoc: this.currentId,
    //           })
    //           .subscribe((res) => rs(res));

    //       });
    //   });
    // };
    // let request: any = [];
    // listGiaoVienId.forEach((id: any) => {
    //   request.push(updateGiaoVien(id));
    // });
    // Promise.all(request).then((res: any) => {
    //   this.getData();
    //   $('#exampleModal-addGV').modal('hide');
    // });

  }


  onChangeIdGiaoVien(idGiaoVien: any) {
    this.idGiaoVien = idGiaoVien;
  }

  handleDeleteGiaoVien() {
    this.dataService
      .GET('api/giaovien/getById?id=' + this.idGiaoVien)
      .subscribe((giaovien: any) => {
        this.dataService
          .PUT('api/giaovien/update', {
            ...giaovien,
            id_LopHoc: 0,
          })
          .subscribe((giaovien: any) => {
            this.getData();
            $('#modal-delete-giaovien').modal('hide');
          });
      });
  }

  ngOnInit(): void {
    this.validate();
    this.getData();
    this.dataService.GET('api/lophoc/getAll').subscribe((res: any) => {
      this.lops = res;
      //console.log(this.lops)
    });
  }
}
