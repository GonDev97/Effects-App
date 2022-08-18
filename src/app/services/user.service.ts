import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://reqres.in/api'

  constructor(private httpClient: HttpClient) { 

  }

  getUsers(){
    return this.httpClient.get(`${this.url}/users?per_page=6`)
           .pipe(
            map((res: any) => {
              return res['data']
            })
           )
  }

}
