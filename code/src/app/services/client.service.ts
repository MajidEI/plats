import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CONSTANST } from '~utils/constanst';
import { Client } from '~app/models/client';
import { Response } from '~app/models/response';

import { Provider } from '~base/provider';
import { Observable } from 'rxjs';

@Injectable()
export class ClientService implements Provider {
  loading = true;

  constructor(
    private http: HttpClient,
  ) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +localStorage.getItem('token')
  });

  getList(): Observable<Client[]> {
    console.log("lllllllllllllllolo")
    return this.http.get<Client[]>(
      CONSTANST.routes.client.list,
      { headers: this.headers }
    );
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANST.routes.client.delete.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  getOne(id: number): Observable<Response> {
    return this.http.get<Response>(
      CONSTANST.routes.client.get.replace(':id', String(id)),
      { headers: this.headers }
    );
  }

  save(client: Client): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.client.save,
      {
        nom: client.nom,
        categorie: client.categorie,
        prix: client.prix,
        description: client.description,
        image: client.image
      },
      { headers: this.headers }
    );
  }

}
