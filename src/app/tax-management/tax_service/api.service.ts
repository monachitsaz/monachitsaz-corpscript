import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})



export class ApiService {
  baseUrl="http://corpscript.ddns.net:3000/api/#/"
  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
  return this.http.get('http://corpscript.ddns.net:3000/api/v1/erp/inv/Tax');
  }

  getById(id:number):Observable<any>{
  return this.http.get('http://corpscript.ddns.net:3000/api/v1/erp/inv/Tax/'+id);

  }

  create(model:any):Observable<any>{
    return this.http.post('http://corpscript.ddns.net:3000/api/v1/erp/inv/Tax',model);

  }
  update(model:any,id:number):Observable<any>{
    return this.http.patch('http://corpscript.ddns.net:3000/api/v1/erp/inv/Tax/'+id,model);

  }
  delete(id:number):Observable<any>{
    return this.http.delete('http://corpscript.ddns.net:3000/api/v1/erp/inv/Tax/'+id);

  }


  login(email: string, password: string): Observable<any> {
    return this.http.post('http://corpscript.ddns.net:3000/api/v1/auth/signin', { email, password }, httpOptions)
  }
  getAuthToken(): string |null {
    return window.localStorage.getItem('token')
  }

  setToken(data: any) {
    window.localStorage.setItem('token', data.access_token);
    window.localStorage.setItem('email', JSON.stringify(data.username));
    window.localStorage.setItem('password', data.password);

  }
}
