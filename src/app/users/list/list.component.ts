import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { loadUsers } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  public users: User[] = []; 
  public loading: boolean = false;
  public error:any;

  public listUsersSubscription: Subscription | undefined;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    this.listUsersSubscription = this.store.select('users').subscribe(({users,loading,error}) => {
      console.log(users);
      this.users = [...users];
      this.loading = loading;
      this.error = error;
    })

    this.store.dispatch(loadUsers());

  }

  ngOnDestroy(): void {
    this.listUsersSubscription?.unsubscribe();
  }

}
