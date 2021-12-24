import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  id_LopHoc: any;
  itemOnPage: number = 5;
  collection: any[] = [];
  keySearch: any = '';
  handleSearch() {
    this.DataService.GET('api/lophoc/getAll').subscribe((res: any) => {
      //this.collection = []
      this.collection = res.filter((lophoc: any) => {
        return lophoc.tenLop
          .toLowerCase()
          .includes(this.keySearch.value.toLowerCase());
      });
      this.collection = this.collection.map((lophoc: any, i: any) => {
        return {
          index: i,
          ...lophoc,
        };
      });
      //  console.log(this.collection)
    });
  }

  ngOnInit(): void {
   this.getData()
  }

  getData() {
    this.DataService.GET('api/lophoc/getAll').subscribe((lops: any) => {
      this.DataService.GET('api/hehoc/getAll').subscribe((hehocs: any) => {
        lops.forEach((lop: any) => {
          lop.hehoc = '';
          hehocs.forEach((hehoc: any) => {
            if (lop.id_HeHoc == hehoc.id_HeHoc) {
              lop.hehoc = hehoc.tenHeHoc;
            }
          });
        });

        this.DataService.GET('api/giaovien/getAll').subscribe(
          (giaoviens: any) => {
            lops.forEach((lop: any) => {
              lop.giaovien = [];
              giaoviens.forEach((giaovien: any) => {
                if (lop.id_LopHoc == giaovien.id_LopHoc) {
                  lop.giaovien.push(giaovien);
                }
              });
            });

            this.DataService.GET('api/hocsinh/getAll').subscribe(
              (hocsinhs: any) => {
                lops.forEach((lop: any) => {
                  lop.hocsinh = [];
                  hocsinhs.forEach((hocsinh: any) => {
                    if (lop.id_LopHoc == hocsinh.id_LopHoc) {
                      lop.hocsinh.push(hocsinh);
                    }
                  });
                });

                this.collection = lops.map((res: any, i: any) => {
                  return {
                    index: i,
                    ...res,
                  };
                });
                console.log(this.collection)
              }
            );
          }
        );
      });
    });
  }
  handleDelete() {
    this.DataService.DELETE('api/lophoc/delete', 'Id', this.id_LopHoc).subscribe(
      (res: any) => {
        console.log(1)
        this.getData();
        this.close();

      }
    );
  }
  GetId(id: any) {
    this.id_LopHoc = id;
    console.log(id);
  }
  close() {
    $('#delete-cat-modal').modal('hide');
  }
}
