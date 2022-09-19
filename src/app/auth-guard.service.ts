import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      //state: RouterStateSnapshot is for getting the URL from the webpage 
      return this.auth.user$.pipe(map(  user => {
        if (user) { return true; }
  
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }));
    
  }

}
