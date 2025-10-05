import { inject, Injectable, Signal } from '@angular/core';
import { Page, Picture } from '../../../../entities';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PictureApi {

  private readonly http = inject(HttpClient);


getAll(page?: Signal<number>) {
    return httpResource<Page<Picture>>(() => {
      const params: any = {
        page: page ? page() : 1
      }
      return {
        url: environment.serverUrl + '/api/picture',
        params
      }
    });
  }

  
}
