import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Deferred } from './defer.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  createDefer: Deferred<void>;
  removeDefer: Deferred<void>;

  constructor(private db: AngularFireDatabase) { }

  create(name: string, login: string, password: string): Promise<void> {
    this.createDefer = new Deferred<void>();
    let ref = this.db.list("users");
    let user = {
      "login": login,
      "name": name,
      "password": password,
      "locked": false
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
    this.db.list("users").remove(key).then(() => {
      this.removeDefer.resolve();
    });
    return this.removeDefer.promise;
  }
}