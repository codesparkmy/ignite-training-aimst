import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import axios from 'axios';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  image = null;
  constructor() {}

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });

    var formData = new FormData();

    formData.append(
      'files-0',
      this.dataURItoBlob(
        image.dataUrl.replace('data:image/*', 'data:image/png')
      ),
      'filename.png'
    );

    var result = await axios.post(
      'http://ignite.codespark.com.my/api/Digi/filestore/image',
      formData,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZmlxQGNvZGVzcGFyay5jb20ubXktRGlnaSIsImp0aSI6IjU4YTJkZGIzLTJjZTMtNGQ4Zi1hMWZmLWNmY2U0YzlhMDBlOCIsInByb2plY3RzIjoiRGlnaToqIiwiZXhwIjoxNjMwNTcwODYwLCJpc3MiOiJyZWFjdGl2ZS5jb20ubXkifQ.Wl-3zueEpr8oQjCwjl9XUMzjhKqvC5wE8LF8L5pRwKw',
        },
      }
    );

    this.image =
      'http://ignite.codespark.com.my/api/fs/Digi/image/' + result.data.id;
  }

  public dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else byteString = encodeURI(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }
}
