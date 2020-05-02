import { Component, OnInit } from '@angular/core';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx'
import { ActionSheetController } from '@ionic/angular';
import * as Tesseract from 'tesseract.js'
@Component({
  selector: 'app-camera-scan',
  templateUrl: './camera-scan.component.html',
  styleUrls: ['./camera-scan.component.scss'],
})
export class CameraScanComponent implements OnInit {

  selectedPhoto: string
  scannedPhotoText: string
  attend: boolean = false

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
  ) { }

  ngOnInit() { }

  async selectPhoto() {
    let actionSheet: HTMLIonActionSheetElement = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use library',
          handler: () => {
            this.getPhoto(this.camera.PictureSourceType.PHOTOLIBRARY)
          }
        },
        {
          text: 'Take photo',
          handler: () => {
            this.getPhoto(this.camera.PictureSourceType.CAMERA)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    actionSheet.present()
  }

  scanPhoto() {
    this.attend = true
    Tesseract.recognize(this.selectedPhoto).then(result => {
      this.scannedPhotoText = result.data.text
      console.log(result)
      this.attend = false

    })
  }

  getPhoto(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    }).then(imageData => {
      this.selectedPhoto = `data:image/jpeg;base64,${imageData}`
    })
  }
}
