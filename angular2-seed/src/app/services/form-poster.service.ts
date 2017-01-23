import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Employee } from '../models/employee.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FormPoster {


    constructor(private http: Http) {

    }
    private extractData(res: Response) {
        let body = res.json();
        return body.fields || {};
    }

    private handleError(err: any) {
        console.log('post error: ' + err);
        return Observable.throw(err.statusText);
    }

    private extractLanguages(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    getLanguages(): Observable<any> {
        return this.http.get('http://localhost:3100/getLanguages')
            .delay(5000)
            .map(this.extractLanguages)
            .catch(this.handleError);
    }
    postEmployeeForm(employee: Employee) {
        let body = JSON.stringify(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3100/postEmployee', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}