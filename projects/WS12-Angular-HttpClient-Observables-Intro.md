[//]: # (TODO - Kiegészíteni // - Query params)

# HTTP

Most front-end applications communicate with backend services over the HTTP protocol. Angular offers a simplified HTTP
API in the form of `HttpClient` imported from `@angular/common/http`. This client returns observables from HTTP method
calls.

## Setup and use

In order to start using the client, we have to import the `HttpClientModule` in our AppModule.

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Having imported the module, we can inject the HttpClient into an application class, and use it to make http requests.

```typescript
import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.css']
})
export class MatchComponent {

  homeTeamScore: number;
  awayTeamScore: number;
  viewerData = {numOfViewers: 455343, topNationality: 'Hungary'};

  constructor(private http: HttpClient) {
  }

  //send a get request, handle response data and errors
  updateScores() {
    this.http.get<any>('http://football.com/api/result')
      .subscribe(
        data => {
          this.homeTeamScore = data.homeTeamScore;
          this.awayTeamScore = data.awayTeamScore;
        },
        error => console.log(`Error occurred: ${error}`
        )
      );
  }

  //send a post request, handle errors
  postViewerData() {
    this.http.post('http://football.com/api/viewerdata', this.viewerData)
      .subscribe(
        () => console.log('Viewer data posted successfully'),
        error => console.log(`Error occurred: ${error}`)
      );
  }
}
```

> Note:
> The http client's methods are _generic_, meaning we can provide the data type the request is expecting
> as response. Here, the _get_ request is expecting a response of type __'any'__, which is not really useful,
> but it helps avoid some warning messages from the IDE. In real life applications, when we know the
> response format, we create an __interface__ of that type and provide that as the generic type.

## Moving the HTTP calls into a service

With simple calls and response handling like in the example, it can be tempting to write http requests in the component
itself, but it is considered bad practice. This layer of frontend-backend communication should be separated to a
service.

__Service class:__

```typescript
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) {
  }

  // returns the observable that we get from the HTTP API
  getResult(): Observable<any> {
    return this.http.get<any>('http://football.com/api/result');
  }

  postViewerData(viewerData: any): Observable<any> {
    return this.http.post('http://football.com/api/viewerdata', viewerData);
  }
}
```

__The component:__

```typescript
...

constructor(private
matchService: MatchService
)
{
}

getResult()
{
  this.matchService.getResult()
    .subscribe(  //we subscribe to the observable returned by the service
      //response handling logic
    )
}

postViewerDAta()
{
  this.matchService.postViewerData(viewerData)
    .subscribe(
      //response handling logic
    )
}
```

## Request configuration

There are many scenarios where a specific http header is required for a successful request. You might need to declare
the 'Content-Type', or add an Authorization token. We can set the headers, along with other configuration details using
an options object. Every http method call, ie.: `get`, `post`, `put`, `delete` available in HttpClient takes a object as
the last argument.

```typescript
...

//HttpHeaders needs to be imported from '@angular/common/http'
headers: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'my-auth-token'
});

postViewerData(viewerData
:
any
)
{
  return this.http.post('http://football.com/api/viewerdata', viewerData, {headers: headers});
}

```

[//]: # (TODO - Feladatot átmásolni)

## Http request exercise

Work in the folder named `WS12-Angular-HttpClient-Observables-Intro`. Check out the .ts and .html files of the
star-wars-planets component under`src/app/components`, the planet-loader-service under `src/app/services` and start the
application by executing`ng serve WS12-Angular-HttpClient-Observables-Intro`.

1. Make the HttpClientModule available for the whole application.
2. Inject the HttpClient into `PlanetLoaderService` and prepare a get request to the provided url
3. Inject the service to `StarWarsPlanetsComponent` and use it to load the planet data.
4. By clicking on the div with the text 'Load planets' in it (the one that looks like a button), call the `loadPlanets`
   method
5. Display every planets `name` and `population` by iterating through the `planets` array.

_Note:_ You can check the full JSON schema of the planet data at [swapi](https://swapi.co/api/planets)

## Further reading

- [HTTP](https://angular.io/guide/http)
