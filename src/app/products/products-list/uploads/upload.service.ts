import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';

import {Upload} from './upload';

@Injectable()
export class UploadService {

  uploadPhotoList: FirebaseListObservable<Upload[]>;
  constructor(private db: AngularFireDatabase) {
  }

  photos: Upload[] = [];
  snapshotRef;
  bytesTransferred;
  totalBytes;
  currentUpload: Upload;

  pushUpload(upload: Upload) {

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`products/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        this.snapshotRef = snapshot as firebase.storage.UploadTaskSnapshot;
        this.bytesTransferred = (this.snapshotRef).bytesTransferred;
        this.totalBytes = (this.snapshotRef).totalBytes;
        upload.progress = Math.trunc((this.bytesTransferred / this.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
      }
    );
  }

  saveFileData(newProductId: string) {
    this.db.object(`/products/${newProductId}/photo`).update({
      name: this.currentUpload.name,
      url: this.currentUpload.url
    });
  }
}
