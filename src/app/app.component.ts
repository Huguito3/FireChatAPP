import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fireChat';

  //items: Observable<any[]>;
  constructor( public _cs:ChatService) {
    //db: AngularFirestore,
    //this.items = db.collection('chats').valueChanges();
  }

 
}
