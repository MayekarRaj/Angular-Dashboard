import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  email: string = "";

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
      
  }

  forgotPassword() {
    this.auth.forgotPassword(this.email);
    this.email = '';
  }
}
