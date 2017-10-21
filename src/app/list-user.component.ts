import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { LoadingModalComponent } from './loading-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './list-user.component.html'
})

export class ListUserComponent {
  @ViewChild('loadingModal') loadingModal: LoadingModalComponent;
  users: Observable<any[]>;

  constructor(private user:UserService) {
    this.users = user.list();
  }

  remove(key: string) {
    this.loadingModal.show()
      .then(() => {
        this.user.remove(key)
          .then(() => {
            this.loadingModal.hide()
          })
      })
  }
}