import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { loadUser } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  idSubscription: Subscription | undefined ;
  userSubscription: Subscription | undefined ;
  user: User | undefined;
  public loading: boolean = false;
  public error:any;

  constructor( private router: ActivatedRoute, private store: Store<AppState>) {

  }

  ngOnInit(): void {

    this.userSubscription= this.store.select('user').subscribe(({user, loading, error}) => {
      if(!user) return;

      this.user = user;
      this.loading = loading;
      this.error = error;
    })


    this.idSubscription= this.router.params.subscribe( ({id}) => {
      console.log(id);

      this.store.dispatch(loadUser({id}))

    } )
  }

  ngOnDestroy(): void {
    this.idSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

}
