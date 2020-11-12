import { Component, OnDestroy, OnInit } from '@angular/core';
import {interval, Subscription,Observable} from 'rxjs';
import {map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{

  private firstObsSubscription:Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription=interval(1000).subscribe(count=>{
    // console.log(count);
    const customIntervalObservable = Observable.create(observer=>
    {
      let count=0;
      setInterval(()=>{

        observer.next(count);
        if(count===2){
          observer.complete();
        }
        if(count>3){
          observer.error(new Error('Count is greater 3'));
        }
        count++;
      },1000);
    } );

    //academind.com
    //pipe operator to modify before the obervable delivers to its observers
    // in the pipe chan filter if return true map and subscription happens, if it returns false nor map nor subscription happens

    this.firstObsSubscription=customIntervalObservable.pipe(filter(
      data=>{
        return data>0;
      }
    ),map( (data:number) =>{
      return 'Round: '+(data + 1);
          })).subscribe(data=>{
      console.log(data);
    }, error =>{
      console.log(error);
      alert(error.message);
    }, ()=>{
      console.log('completed');
    })
  }

  ngOnDestroy():void {
    this.firstObsSubscription.unsubscribe();
  }

}
