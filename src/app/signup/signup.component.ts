import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
public signupForm !: FormGroup;
  constructor(private fb : FormBuilder, private http :HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname : ['', Validators.required],
      mobileno : ['', Validators.required],
      emailid : ['', Validators.required],
      passward : ['', Validators.required],
     

    })
  }
  signup(){
    this.http.post<any>('http://localhost:3000/SignupUsers',this.signupForm.value)
    .subscribe( res =>{
      alert("signup Successfull!!!")
      this.signupForm.reset();
      this.router.navigate(['login'])
    })
  }

}
