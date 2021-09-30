import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, ParsedRequestUrl, RequestInfoUtilities } from 'angular-in-memory-web-api';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users = [
      { id: 1, firstName: 'Eugenia', lastName: 'Borovskova', password: '111', email: 'belka.sixa@yandex.ru' },
    ];
    return { users };
  }
  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    let newUrl = url.replace(/api\/users\/signup/, '/api/users/');
    newUrl = url.replace(/api\/users\/login/, '/api/users/');
    const parsed = utils.parseRequestUrl(newUrl);
    console.log('parseRequestUrl override of', `${url}`, ':', parsed);
    return parsed;

  }

  //overriding post
  post(reqInfo: RequestInfo) {

    if (reqInfo.id === 'signup') {
      reqInfo.id = '';
      console.log('from signup');

    } else if (reqInfo.id === 'login') {
      reqInfo.id = '';
      console.log('from login');
      //response 
      return reqInfo.utils.createResponse$(() => {
        let body = reqInfo.req.body;
        let usr = reqInfo.collection.filter((user: any) => {
          return user.email === body.email && user.password === body.password;
        });

        let resBody = {};
        const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;

        if (usr.length) {
          let cuser = usr[0];

          resBody =
          {
            id: cuser.id,
            firstName: cuser.firstName,
            lastName: cuser.lastName,
            email: cuser.email,
            token: 'this is a not an original one'
          };
        }

        const options: ResponseOptions = resBody ?
          {
            body: dataEncapsulation ? { resBody } : resBody,
            status: 200
          } :
          {
            body: { error: `'User' with email='${resBody.email}' not found` },
            status: 404
          };

        options.statusText = options.status === 200 ? 'OK' : 'Not found';
        options.headers = reqInfo.headers;
        options.url = reqInfo.url;
        return options;

      });
    }
  }
}
