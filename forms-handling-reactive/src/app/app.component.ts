import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      //nested
      'userData': new FormGroup({
         // FormsControl에 3개의 paraments는 initial state, 
      //validator는 두번째에 넣는다.    
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([new FormControl])
    });
  }

  onSubmit(){
    console.log(this.signupForm);
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    //tell Typescript, this is type FormArray && inside the outer parenthesis is FormArray!!
    (<FormArray>this.signupForm.get('hobbies')).push(control)

  }
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl):{[s: string]: boolean}{
    if(this.forbiddenNames.indexOf(control.value)){
      return {'nameIsForbidden': true};
    } 
    return null;
  }
}
