  import { Component, OnInit } from '@angular/core';
  import { AuthService } from '../../shared/auth.service';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
  })

  export class LoginComponent implements OnInit {

    email: string = "";
    password: string = "";

    constructor(private auth: AuthService) {
      
    }



    ngOnInit(): void {
        
    }

    login(){
      if(this.email == ""){
        alert("Please enter email");
        return;
      }

      if(this.password == ""){
        alert("Please enter password");
        return;
      }

      this.auth.login(this.email, this.password);
      this.email = "";
      this.password = "";
    }

    signInWithGoogle() {
      this.auth.googleSignIn();
    }
  }
