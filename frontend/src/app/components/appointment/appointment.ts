import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apiservice } from '../../apiservice';

@Component({
  selector: 'app-appointment',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment.html',
  styleUrls: ['./appointment.css'],
  standalone: true
})
export class Appointment {
  appointmentForm: FormGroup;
  timeSlots: string[] = [
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00'
  ];

  constructor(private fb: FormBuilder, private api: Apiservice) {
    this.appointmentForm = this.fb.group({
      customerQueryId: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      pickupRequired: [false]
    });
  }

  onSubmitAppointment(): void {
    if (this.appointmentForm.valid) {
      this.api.createAppointment(this.appointmentForm.value).subscribe({
        next: (res) => {
          alert('Appointment created successfully! Ticket: ' + res.data.ticketNumber);
          this.appointmentForm.reset();
        },
        error: (err) => {
          alert('Failed to create appointment!');
          console.error(err);
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
