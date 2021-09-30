import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GaurdService implements CanActivate{

  constructor(private ruoter: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('currentUser')) {
      return true;
    }
    this.ruoter.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
