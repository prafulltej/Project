import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public loginForm! : FormGroup
  constructor(private fb : FormBuilder, private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['',Validators.required],
      passward : ['',Validators.required]
    })
  }
  hello:any
  login(){
    this.http.get<any>('http://localhost:3000/SignupUsers')
    .subscribe (res =>{
      const user = res.find((a:any) =>{
        this.hello = a.fullname
        console.log(this.hello)
          return a.emailid === this.loginForm.value.email && a.passward === this.loginForm.value.passward 
      });
      if(user){
        alert("login successful")
        console.log("GIT LOGing")
        this.loginForm.reset();
        console.log("before passing = ",this.hello)
        this.router.navigate(['dashboard'],{queryParams :{ hi : this.hello}})
      }else{
        alert("user not found!!!")
      }
    })
  }

}
