import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationServiceService} from '../../service/security/authentication-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginParentGroup: FormGroup;

  constructor(private formChildGroup: FormBuilder,
              private auth :AuthenticationServiceService,
              private router: Router) { }
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
    this.auth.executeAuthentication(
      this.loginParentGroup.controls['user'].value.email,
      this.loginParentGroup.controls['user'].value.password
    ).subscribe({
      next: response =>{
        this.router.navigateByUrl("/orders");

      },
      error: er=> {
        console.log("Invalid Email or Password")
      }
    })
  }
}
