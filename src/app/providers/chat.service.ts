import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { Mensaje } from "../interface/mensaje.interface";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
//import * as firebase from 'firebase/app';

@Injectable({
  providedIn: "root"
})
export class ChatService {
  // tslint:disable-next-line: whitespace
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login(provedor: string) {
    if (provedor === "google") {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }
  cargarMensajes() {
    // tslint:disable-next-line: whitespace
    this.itemsCollection = this.afs.collection<Mensaje>("chats", ref =>
      ref.orderBy("fecha", "desc").limit(5)
    );
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = [];
        mensajes.forEach(mensaje => {
          this.chats.unshift(mensaje);
          return this.chats;
        });
        //this.chats = mensajes;
      })
    );
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: this.getDate(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add(mensaje);
  }

  private getDate(): number {
    let today = new Date();
    let date =
      " " + today.getFullYear() + (today.getMonth() + 1) + today.getDate();
    console.log(date);
    let time = " " + today.getHours() + today.getMinutes() + today.getSeconds();
    console.log(time);
    let finalDate = (date + time).replace(/\s/g, "");
    console.log(finalDate);
    console.log(Number(finalDate));
    return Number(finalDate);
  }
}
