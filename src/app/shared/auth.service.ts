import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  signOut, sendPasswordResetEmail, sendEmailVerification, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
// import { sendPasswordResetEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private fireauth: Auth, private router: Router) {}

  //login method
  login(email: string, password: string) {
      signInWithEmailAndPassword(this.fireauth, email, password).then( (res) => {
        localStorage.setItem("token", "true");
        this.router.navigate(["dashboard"]);

        if(res.user.emailVerified == true){
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['/verify-email'])
        }
      }, err => {
        alert("Something went wrong");
        this.router.navigate(["/login"]);
      })
  }

  // register method
  register(email: string, password: string){
    createUserWithEmailAndPassword(this.fireauth, email, password).then( (res) => {
      alert("Registration Successfull");
      this.router.navigate(["/login"]);
      this.sendEmailForVerification(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(["/register"]);
    })
  }

  // sign out
  logout() {
    signOut(this.fireauth).then( () => {
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
    }, err => {
      alert(err.message);
    })
  }

  //forgot password
  forgotPassword(email: string) {
    sendPasswordResetEmail(this.fireauth, email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert("Something went wrong!!!");
    })
  }

  //email verification
  sendEmailForVerification(user: any) {
    sendEmailVerification(user).then((res: any) => {
      this.router.navigate(['/verify-email']);

    }, (err: any) => {
      alert("Something went wrong. Couldnt send email to your registered email");
    })
  }

  //sign in with google
  googleSignIn() {
    return signInWithPopup(this.fireauth, new GoogleAuthProvider).then((res) => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user.uid));
    }, err => {
      alert(err.message);
    })
  }
}
