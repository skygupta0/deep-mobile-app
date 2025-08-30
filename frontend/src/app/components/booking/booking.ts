import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Apiservice } from '../../apiservice';

export interface ServiceRequest {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  device_model: string;
  issue_description: string;
  created_at: string;
}

export interface ServiceRequestResponse {
  success: boolean;
  data: ServiceRequest[];
}

@Component({
  selector: 'app-booking',
  imports: [CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class Booking {
 requests: ServiceRequest[] = [];
  loading = true;
  error = '';

  constructor(
    private apiService: Apiservice 
  ) {
    
  }

  ngOnInit() {
    this.loadRequests();
  }

  private loadRequests() {
    this.loading = true;
    this.error = '';
    
    this.apiService.getAllQueries() // Now properly accessible
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.requests = response.data;
          } else {
            this.error = 'Failed to load requests';
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading requests:', error);
          this.error = 'Error loading requests. Please try again.';
          this.loading = false;
        }
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(createdAt: string): string {
    const hoursDiff = this.getHoursDifference(createdAt);
    
    if (hoursDiff < 24) return 'status-new';
    if (hoursDiff < 72) return 'status-pending';
    return 'status-urgent';
  }

  getStatusText(createdAt: string): string {
    const hoursDiff = this.getHoursDifference(createdAt);
    
    if (hoursDiff < 24) return 'New';
    if (hoursDiff < 72) return 'Pending';
    return 'Urgent';
  }

  getNewRequestsCount(): number {
    return this.requests.filter(r => this.getHoursDifference(r.created_at) < 24).length;
  }

  getPendingRequestsCount(): number {
    return this.requests.filter(r => {
      const hoursDiff = this.getHoursDifference(r.created_at);
      return hoursDiff >= 24 && hoursDiff < 72;
    }).length;
  }

  getUrgentRequestsCount(): number {
    return this.requests.filter(r => this.getHoursDifference(r.created_at) >= 72).length;
  }

  private getHoursDifference(createdAt: string): number {
    const now = new Date();
    const created = new Date(createdAt);
    return (now.getTime() - created.getTime()) / (1000 * 60 * 60);
  }

  viewDetails(request: ServiceRequest) {
    console.log('View details for request:', request);
    // Implement your view details logic here
    // Example: this.router.navigate(['/requests', request.id]);
  }

  updateStatus(request: ServiceRequest) {
    console.log('Update status for request:', request);
    // Implement your update status logic here
    // Example: open a modal or navigate to update page
  }

  refreshRequests() {
    this.loadRequests();
  }
}
