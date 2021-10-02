import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, ParsedRequestUrl, RequestInfoUtilities, RequestCore } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users = [
      { id: 1, firstName: 'Eugenia', lastName: 'Borovskova', password: '111', email: 'belka.sixa@yandex.ru' },
    ];
    const posts = [
      { id: 1, title: 'The first Article', author: 'AD', image: 'gallery-image-1.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
      { id: 2, title: 'The second Article', author: 'AD', image: 'gallery-image-2.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
      { id: 3, title: 'The third Article', author: 'AD', image: 'gallery-image-3.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
      { id: 4, title: 'The fourth Article', author: 'AD', image: 'gallery-image-4.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
      { id: 5, title: 'The fifth Article', author: 'AD', image: 'gallery-image-5.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
      { id: 6, title: 'The sixth Article', author: 'AD', image: 'gallery-image-6.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
      { id: 7, title: 'The seventh Article', author: 'AD', image: 'gallery-image-2.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
      { id: 8, title: 'The eighth Article', author: 'AD', image: 'gallery-image-4.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
      { id: 9, title: 'The nineth Article', author: 'AD', image: 'gallery-image-6.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
      { id: 10, title: 'The tength Article', author: 'AD', image: 'gallery-image-3.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
      { id: 11, title: 'The eleventh Article', author: 'AD', image: 'gallery-image-1.jpg', publishdate: '2021-06-19T07:22Z', excert: 'This is the summary...' },
    ];
    return { users, posts };
  }
  // parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
  //   let newUrl = url.replace(/api\/users\/signup/, '/api/users/');
  //   newUrl = url.replace(/api\/users\/login/, '/api/users/');
  //   const parsed = utils.parseRequestUrl(newUrl);
  //   console.log('parseRequestUrl override of', `${url}`, ':', parsed);
  //   return parsed;

  // }

  getToken(user: any) {
    return 'this is a token';
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'posts') {
      return this.getArticles(reqInfo);
    }
    return undefined;
  }
  getArticles(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const users = reqInfo.collection.find((user: any) => {
        return reqInfo.req['body'].email === user.email && reqInfo.req['body'].password === user.password;
      });

      let responseBody = {};

      if (users) {
        responseBody = {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          bio: users.bio,
          image: users.image,
          email: users.email,
          token: this.getToken(users)
        };
      }

      const options: ResponseOptions = responseBody ?
        {
          body: dataEncapsulation ? { responseBody } : responseBody,
          status: 200
        } :
        {
          body: { error: `'User' with email='${responseBody}' not found` },
          status: 404
        };

      options.statusText = options.status === 200 ? 'OK' : 'Not found';
      options.headers = reqInfo.headers;
      options.url = reqInfo.url;
      return options;

    });
  }

  //overriding post
  post(reqInfo: RequestInfo) {
    if (reqInfo.id === 'login') {
      console.log('from login');

      return reqInfo.utils.createResponse$(() => {
        const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
        const users = reqInfo.collection.find((user: any) => {
          return reqInfo.req['body'].email === user.email && reqInfo.req['body'].password === user.password;
        });

        let responseBody = {};

        if (users) {
          responseBody = {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            bio: users.bio,
            image: users.image,
            email: users.email,
            token: this.getToken(users)
          };
        }

        const options: ResponseOptions = responseBody ?
          {
            body: dataEncapsulation ? { responseBody } : responseBody,
            status: 200
          } :
          {
            body: { error: `'User' with email='${responseBody}' not found` },
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
