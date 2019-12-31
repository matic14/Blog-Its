import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('post') post: any;

  // tslint:disable-next-line: no-output-rename
  // tslint:disable-next-line: no-output-on-prefix
  @Output('onDelete') onDelete = new EventEmitter();

  postData: any = {};
  user: any = {};

  constructor() { }

  ngOnInit() {
    this.postData = this.post.data();
    this.user = firebase.auth().currentUser;

  }

  delete() {
    firebase.firestore().collection('posts').doc(this.post.id).delete();
    this.onDelete.emit();
  }
}
