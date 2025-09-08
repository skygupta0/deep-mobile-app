import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apiservice } from '../../apiservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private api: Apiservice, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required], // Make required if needed
      phone_number: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm.updateValueAndValidity();
  }

  onSubmitRegisterForm(): void {
    if (this.registerForm.valid) {
      this.api.register(this.registerForm.value).subscribe({
        next: (res) => {
          alert('Registration successful!');
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Registration failed!');
          console.error(err);
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
