import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginParentGroup: FormGroup;

  constructor(private formChildGroup: FormBuilder) { }

  ngOnInit(): void {
    this.myFormLogin()
  }

  myFormLogin(){
    this.loginParentGroup = this.formChildGroup.group(
      {
      user:this.formChildGroup.group({
        email: [''],
        password: ['']
      })
    })
  }

  login(){
    alert(this.loginParentGroup.controls['user'].value.email)
    alert(this.loginParentGroup.controls['user'].value.password)
  }
}
