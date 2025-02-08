import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'angular-reactive-forms';
  registerForm: FormGroup;
  isSubmitted: boolean = false;
  roles = [
    { id: 1, title: 'developer' },
    { id: 2, title: 'admin' },
  ];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roleId: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.registerForm.get('roleId')?.valueChanges.subscribe(roleId => {
      console.log('SEND API REQUEST AND UPDATE ROLE', roleId);
      
    });
  }

  onSubmit(): void {
    console.log(
      'submitted form',
      this.registerForm.value,
      this.registerForm.invalid
    );
    this.isSubmitted = true;
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.registerForm.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched || this.isSubmitted));
  }
}
