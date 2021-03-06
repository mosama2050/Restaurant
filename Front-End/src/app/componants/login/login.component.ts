import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationServiceService} from '../../service/security/authentication-service.service';
import {Router} from '@angular/router';
import {SpaceValidator} from '../../model/space-validator';

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
        email: new FormControl('',[
          Validators.required,
          SpaceValidator.onlyContainSpace,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        ]),
        password: new FormControl('',[
          Validators.required
        ])
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
  get email(){
    return this.loginParentGroup.get('user.email')
  }
  get password(){
    return this.loginParentGroup.get('user.password')
  }
}
