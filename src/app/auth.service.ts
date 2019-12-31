import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string , password: string) {
    return firebase.auth().signInWithEmailAndPassword(email , password);
  }

  signup(email: string , password: string , firstName: string , lastName: string) {
    return new Promise((resolve , reject) => {
      firebase.auth().createUserWithEmailAndPassword(email , password).then((response) => {

        const randamNumber = Math.floor(Math.random() * 1000);

        response.user.updateProfile({
          displayName: firstName + ' ' + lastName,
          photoURL: 'https://api.adorable.io/avatars/' + randamNumber
        }).then(() => {
          resolve(response.user);
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
