import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class CloudStorageService {

    constructor(private storage: Storage) { }

    uploadImage(file: File) {
        if (file) {
            const storageRef = ref(this.storage, file.name);
            uploadBytesResumable(storageRef, file);
        }
    }
    // service logic here
}