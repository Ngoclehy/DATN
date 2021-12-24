import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  $:any=document.querySelector.bind(document);
  constructor() { }

  ngOnInit(): void {
    //load thẻ body
    this.$('body').classList.add('bg-gradient-primary');
}
ngOnDestroy(){
  this.$('body').classList.remove('bg-gradient-primary');
 }

}
