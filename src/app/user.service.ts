import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Deferred } from './defer.service';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators/first';

@Injectable()
export class UserService {
  createDefer: Deferred<void>;
  removeDefer: Deferred<void>;
  authDefer: Deferred<boolean>;

  constructor(private db: AngularFireDatabase) { }

  create(name: string, login: string, password: string): Promise<void> {
    this.createDefer = new Deferred<void>();
    const ref = this.db.list('users');
    const user = {
      'login': login,
      'name': name,
      'password': password,
      'locked': false
    };
    ref.push(user).then(() => {
      this.createDefer.resolve();
    });

    return this.createDefer.promise;
  }

  list(): Observable<{}[]> {
    return this.db.list('users').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  remove(key: string): Promise<void> {
    this.removeDefer = new Deferred<void>();
    this.db.list('users').remove(key).then(() => {
      this.removeDefer.resolve();
    });
    return this.removeDefer.promise;
  }

  auth(login: string, pass: string): Promise<boolean> {
    this.authDefer = new Deferred<boolean>();
    this.db.list('users', ref => ref.orderByChild('login').equalTo(login).limitToFirst(1)).snapshotChanges()
      .forEach(changes => {
        const r = changes.filter(c => {
          const u = c.payload.val();
          return u.password === pass;
        });
        if (r.length > 0) {
          this.authDefer.resolve(r[0].payload.val().password === pass);
        } else {
          this.authDefer.resolve(false);
        }
      });
    return this.authDefer.promise;
  }
}
