import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Do, ResponseDo } from '../model/do';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  postDO(): Observable<Do[]> {
    const data = {
      id_item: '002821',
      lapso_inicio: '20241102',
      lapso_fin: '20241228',
    };

    return this.http.post<ResponseDo>(this.apiUrl + '/querys', data).pipe(
      map(({ data }) => {
        return data;
      })
    );
  }
}
