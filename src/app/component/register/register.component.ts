import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private auth: AuthService) {
    
  }

  ngOnInit(): void {
      
  }


  register(){
    if(this.email == ""){
      alert("Please enter email");
      return;
    }

    if(this.password == ""){
      alert("Please enter password");
      return;
    }

    this.auth.register(this.email, this.password);
    this.email = "";
    this.password = "";
  }

}
