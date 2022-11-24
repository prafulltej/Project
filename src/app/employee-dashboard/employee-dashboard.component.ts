import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
formValue !: FormGroup;
employeeData !: any
  constructor( private fb : FormBuilder, private api : ApiService, private activate : ActivatedRoute) { }

  employeeModelObj : EmployeeModel = new EmployeeModel();
  showAdd! :boolean;
  showUpdate! :boolean;
  name:any
  ngOnInit(): void {

    this.activate.queryParamMap.subscribe((param) =>{
      this.name = param.get('hi')
      console.log("passing = ",param.get('hi') )
    })

    this.getAllEmployee()
    this.formValue = this.fb.group({
      firstname : [''],
      lastname : [''],
      email : [''],
      mobileno : [''],
      salary :['']
    })
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
postEmployeeDetails(){
  this.employeeModelObj.firstname = this.formValue.value.firstname;
  this.employeeModelObj.lastname = this.formValue.value.lastname;
  this.employeeModelObj.email = this.formValue.value.email;
  this.employeeModelObj.mobile = this.formValue.value.mobileno;
  this.employeeModelObj.salary = this.formValue.value.salary;

  this.api.postEmployee(this.employeeModelObj)
  .subscribe (res =>{
    console.log(res)
    alert("employee added successfully!!!");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
  }
  // ,
  // err =>
  // {
  //   alert('something went wrong')
  // }
  )
}

getAllEmployee(){
  this.api.getEmployee()
  .subscribe(res =>{
    this.employeeData =res
  })
}
deleteEmployee(row : any){
  this.api.deleteEmployee(row.id)
  .subscribe(res => {
    alert('employee deleted')
    this.getAllEmployee()
  })
}
onEdit(row : any){
  this.showAdd = false;
    this.showUpdate = true;
  this.employeeModelObj.id = row.id
  this.formValue.controls['firstname'].setValue(row.firstname)
  this.formValue.controls['lastname'].setValue(row.lastname)
  this.formValue.controls['email'].setValue(row.email)
  this.formValue.controls['mobileno'].setValue(row.mobile)
  this.formValue.controls['salary'].setValue(row.salary)

}
updateEmployee(){
  
  this.employeeModelObj.firstname = this.formValue.value.firstname;
  this.employeeModelObj.lastname = this.formValue.value.lastname;
  this.employeeModelObj.email = this.formValue.value.email;
  this.employeeModelObj.mobile = this.formValue.value.mobileno;
  this.employeeModelObj.salary = this.formValue.value.salary;

  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe ( res =>{
    alert("updated successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee()
  })
}
}
