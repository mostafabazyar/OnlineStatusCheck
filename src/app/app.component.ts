import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  networkStatus: any;
  networkStatus$: Subscription = Subscription.EMPTY;
  private endpointPing = 'https://jsonplaceholder.typicode.com/todos';
  responseMessage: string | undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.checkNetworkStatus();
    this.getResponse();
  }
  module(arg0: string, arg1: string[]) {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  public pingServer(): Observable<string> {
    const options = {
      headers: new HttpHeaders({ accept: 'text/plain' }),
      responseType: 'text' as const,
    };
    return this.httpClient.get(this.endpointPing, options);
  }
  
  
  public getResponse(): void {
    const response$ = this.pingServer();
    response$.subscribe(
      (r: string) => {
        this.responseMessage = "its ok";
      },
      (error) => {
        this.responseMessage = error;
      }
    );
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        // console.log('status', status);
        this.networkStatus = status;
      });
  }
}
