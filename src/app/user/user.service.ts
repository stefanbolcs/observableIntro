import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class UserService {
    //you can call on it next() from the outside  in observables you just call next from the inside
    //for communication between components through services
    // for the Output() you still use EventEmitter
    activatedEmitter = new Subject<boolean>();
}