import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Apiservice } from '../../apiservice';

@Component({
  selector: 'app-home',
  imports: [RouterLink,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected title = 'deep-mobile-app';
//title = 'deep-mobile-repairing';
  
  // Mobile menu state
  isMobileMenuOpen = false;
  contactForm!: FormGroup;
  
   constructor(private api: Apiservice,
    private fb: FormBuilder
   ) {
     this.contactForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: [''],
      phone_number: ['', Validators.required],
      device_model: ['', Validators.required],
      issue_description: ['', Validators.required],
    });
   }
  // FAQ data
  faqs = [
    {
      question: 'How long does a typical repair take?',
      answer: 'Most screen and battery replacements are completed within 30-45 minutes. More complex repairs like water damage or motherboard issues may take 2-3 hours.',
      isOpen: false
    },
    {
      question: 'Do you use genuine parts?',
      answer: 'Yes, we use genuine or high-quality OEM parts for all repairs. We\'ll always inform you about the parts options and their warranties before starting any repair.',
      isOpen: false
    },
    {
      question: 'What is your warranty policy?',
      answer: 'We offer a 90-day warranty on all repairs, covering both parts and labor. The warranty doesn\'t cover physical damage or liquid damage after the repair.',
      isOpen: false
    },
    {
      question: 'Do I need an appointment?',
      answer: 'Walk-ins are welcome, but we recommend calling ahead to ensure we can serve you immediately. For complex repairs, we may schedule an appointment to provide better service.',
      isOpen: false
    }
  ];
  
  // Services data
  services = [
    {
      title: 'iPhone Repair',
      description: 'Screen, battery, camera & other iPhone issues fixed.',
      price: 'Starting at ₹1999',
      icon: 'smartphone',
      link: '/iphone'
    },
    {
      title: 'Android Repair',
      description: 'All Android brands – screen, charging, motherboard.',
      price: 'Starting at ₹1499',
      icon: 'cpu',
      link: '/android'
    },
    {
      title: 'Windows Laptop',
      description: 'Keyboard, motherboard, OS installation & upgrades.',
      price: 'Starting at ₹999',
      icon: 'laptop',
      link: '/windows'
    },
    {
      title: 'MacBook Repair',
      description: 'Battery, screen & professional MacBook services.',
      price: 'Starting at ₹2999',
      icon: 'monitor',
      link: '/macbook'
    },
    {
      title: 'iPad Repair',
      description: 'Screen & battery replacement for all iPad models.',
      price: 'Starting at ₹2499',
      icon: 'tablet',
      link: '/ipad'
    },
    {
      title: 'Accessories',
      description: 'Chargers, earphones, smartwatch & gadgets repair.',
      price: 'Starting at ₹499',
      icon: 'headphones',
      link: '/accessories'
    }
  ];
  
  // Testimonials data
  testimonials = [
    {
      rating: 5,
      text: '30 minutes me screen bilkul nayi jaisi! Highly recommended.',
      name: 'Rahul Sharma',
      service: 'iPhone 12 Screen Replacement'
    },
    {
      rating: 5,
      text: 'Fair pricing & professional kaam. Phone fir se new jaisa.',
      name: 'Sudha Gupta',
      service: 'Samsung Battery Replacement'
    },
    {
      rating: 5,
      text: 'Quick service & helpful staff. Highly satisfied!',
      name: 'Vikas Patel',
      service: 'Laptop Motherboard Repair'
    }
  ];
  
  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  // Close mobile menu
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
  
  // Toggle FAQ
  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
  
    onSubmitContactForm(): void {
    if (this.contactForm.valid) {
      this.api.submitQuery(this.contactForm.value).subscribe({
        next: (res) => {
          alert('Query submitted successfully!');
          console.log(res);
          this.contactForm.reset();
        },
        error: (err) => {
          alert('Something went wrong!');
          console.error(err);
        },
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }



  
  // Smooth scroll to section
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMobileMenu();
  }
  
  // Generate star rating array
  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < rating);
  }
  
  // Get service icon emoji
  getServiceIcon(iconName: string): string {
    const iconMap: { [key: string]: string } = {
      'smartphone': '📱',
      'cpu': '🔧',
      'laptop': '💻',
      'monitor': '🖥️',
      'tablet': '📟',
      'headphones': '🎧'
    };
    return iconMap[iconName] || '📱';
  }
}
