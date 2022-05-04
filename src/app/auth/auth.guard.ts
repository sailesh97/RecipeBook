import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(private router: Router, private authService: AuthService, private store: Store<fromApp.AppState>){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            map((user) => {
                const isAuth = !!user;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            }
        ))
        // return this.authService.user.pipe(map((user) => {
        //     return !!user;
        // }), tap(isAuth => {
        //     if(!isAuth){
        //         this.router.navigate(['/auth']);
        //     }
        // }))
    }
}