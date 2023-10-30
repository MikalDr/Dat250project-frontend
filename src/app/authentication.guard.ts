import { CanActivateFn, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
      const router: Router = inject(Router);

    //URLS accessable without login are put like this
    if (state.url == "/room/**") {
      return true;
    }

    if (state.url == "/my-topics") {
      return true;
    }

    if (state.url == "/login") {
      return true;
    }

    let token = sessionStorage.getItem("token");

    if (!token) {
      return router.createUrlTree(["/login"]);
    }

    return true;
};
