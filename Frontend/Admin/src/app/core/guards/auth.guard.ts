import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    private userRoles: string[] = [];
    private hasRequiredRole: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authFackservice: AuthfakeauthenticationService
    ) { 

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): boolean | UrlTree {
        const accessToken = localStorage.getItem('access_token');
      
        if (accessToken) {
          interface DecodedToken {
            sub: string;
            Role: string[];
            exp: string;
            iat: string;
          }
          const decoded: DecodedToken = jwtDecode(accessToken);
          this.userRoles = decoded.Role;
      
          console.log("User Roles: ", this.userRoles);
      
          if (route.data.roles && Array.isArray(route.data.roles)) {
            const requiredRoles = route.data.roles as string[];
            console.log("Required Roles: ", requiredRoles);
      
            requiredRoles.forEach((requiredRole) => {
              if (this.userRoles.includes(requiredRole)) {
                this.hasRequiredRole = true;
              }
            });
      
            if (this.hasRequiredRole) {
              return true; // Allow access
            } else {
              console.log("User does not have the required role. Redirecting to login.");
              return this.router.createUrlTree(['/Page500']);
            }
          } else {
            console.log("No specific roles required for this route. Allowing access.");
            return true; // No specific roles required
          }
        }
      
        console.log("User is not authenticated. Redirecting to login.");
        return this.router.createUrlTree(['/auth/login']);
      }
      

}









    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     if (environment.defaultauth === 'firebase') {
    //         const currentUser = this.authenticationService.currentUser();
    //         if (currentUser) {
    //             // logged in so return true
    //             return true;
    //         }
    //     } else {
    //         const currentUser = this.authFackservice.currentUserValue;
    //         if (currentUser) {
    //             // logged in so return true
    //             return true;
    //         }
    //     }
    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    // }

