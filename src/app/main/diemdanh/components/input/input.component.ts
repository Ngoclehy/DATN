import { Router } from '@angular/router';
import { DataService } from './../../../../core/services/data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-input]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  inputs: ['item'],
})
export class InputComponent implements OnInit {
  constructor(private DataService: DataService, private router: Router) {}
  @Input() item: any;
  @Output() data = new EventEmitter<any>();

  @Input() diHoc: any;
  @Input() anTrua: any;

  @Input() isUpdate = false;

  ngDoCheck() {
    this.data.emit({
      ...this.item,
      diHoc: this.diHoc,
      anTrua: this.anTrua,
    });
  }

  handleChangeDiHoc(e: any) {
    this.diHoc = e.target.checked;
    if (this.diHoc == false) {
      this.anTrua = false;
    }

    // if (this.isUpdate == true) {
    //   this.DataService.PUT('api/diemdanh/update', {
    //     ...this.item,
    //     diHoc: this.diHoc,
    //     anTrua: this.anTrua,
    //   }).subscribe((res) => {});
    // }
  }

  handleChangeAnTrua(e: any) {
    this.anTrua = e.target.checked;
    // if (this.isUpdate == true) {
    //   this.DataService.PUT('api/diemdanh/update', {
    //     ...this.item,
    //     diHoc: this.diHoc,
    //     anTrua: this.anTrua,
    //   }).subscribe((res) => {});
    // }
  }

  ngOnInit(): void {}
}
