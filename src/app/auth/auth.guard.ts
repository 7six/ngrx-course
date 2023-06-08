import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selector";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppState>
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.store.pipe(
      select(isLoggedIn),
      tap((loggedIn) => {
        if(!loggedIn){
          this.router.navigateByUrl('/login')
        }
      })
    );
  }
}
