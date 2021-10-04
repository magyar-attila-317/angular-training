[//]: # (TODO - Dependency Injection - Detail)

- ProvidedIn anyagrésszel
- @Inject()
- Service lecserélése `{provides: X, useClass: Y}`

# Services

A service is typically a class that does something specific, like fetching data, validating user input, or logging.
These service classes can be injected into components, to make the tasks performed by the service available for them.

A service also allows bi-directional communication between components of any relation.

Here's a simple logger service:

```typescript
export class DogLoggerService {
  log(message: string) {
    console.log(message)
  }

  warn(message: string) {
    console.warn(message)
  }

  error(message: string) {
    console.error(message)
  }
}
```

## DI

Dependency Injection is wired into the Angular framework and used everywhere to provide components with services they
need. We can inject a service into a component via it's constructor:

```typescript
import {Component} from '@angular/core';
import {DogLoggerService} from '../dogLoggerService.service';

@Component({
  selector: 'app-dog-walking',
  templateUrl: './app-dog-walking.component.html',
  styleUrls: ['./app-dog-walking.component.css']
})
export class DogWalkingComponent {

  constructor(private logger: DogLoggerService) {
  }

  dogWalkingMethod() {
    this.logger.log('Dog walked!')
  }
}
```

Behind the scenes, the injector notices that our component depends on a service, and starts looking for a provider.
There are a couple of ways to make a _service_ available for dependency injection, but we are going to use the most
modern and recommended way, which is using the `@Injectable({providedIn: 'root'})` decorator:

```typescript
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DogLoggerService {
...
}
```

# Observables

With the help of a _service_ and an _observable_, we can implement communication between components without having to
build long chains of property and event binding.  
That sounds cool, but what the heck is an observable?

An observable is basically a data source that publishes (emits) data changes that _observers_ (consumers)
can _subscribe_ to. Whenever the data changes, the observer will know about it.

There are 3 types of changes:

- regular data change
- error
- completion

It is possible to create our own custom observables, but we very rarely need that. What we are going to do instead, is
use some built-in ones. They take care of the emission of data, so all we need to do is listen for these changes and
react to them. We can do this by _subscribing_
to the observable by calling its `subscribe()` method (shocking, I know):

```typescript
exampleObservable.subscribe()
```

When we _subscribe_ to an observable, we need to pass in callback functions as arguments, to handle the three types of
data changes that an observable can publish (they are called
`next`, `error` and `complete`). Only the _next_ function is mandatory, the others are optional, since some observables
may never emit errors or complete.

To see an example, let's assume there is an observable that emits a new random number every second and we want to catch
those numbers and log them to the console:

```typescript
randomNumberObservable.subscribe(
  number => console.log(number),  //'next' function | This is mandatory
  error => console.warn(error),   //'error' function | This is redundant, since we know there are no errors emitted
  () => console.log('Completed!') //'complete' function | This is also redundant, since the observable never completes
)
```

### Cross-component communication

There is a special built-in observable, called __Subject__, which we are going to use for cross-component communication.
We are going to store this _Subject_ object in a service as a simple object property:

```typescript
@Injectable({providedIn: 'root'})
export class KossuthLajosMessageService {

  regimentStatusUpdate = new Subject<string>();

}
```

This way, a component that injects this service can call the _Subject's_ `next()` method and "send" data to another
component that also injects the service and subscribes to its subject:

1. The message sender component:

```typescript
@Component({...})
export class KossuthLajosMessageSenderComponent {

  constructor(private messageService: KossuthLajosMessageService) {
  }

  onNoMoreRegiment() {
    this.messageService.regimentStatusUpdate.next('Elfogyott');
  }
}
```

2. The message receiver component:

```typescript
@Component({...})
export class KossuthLajosMessageReceiverComponent {

  weAllHaveToGo: boolean = false;

  constructor(private messageService: KossuthLajosMessageService) {
    this.messageService.regimentStatusUpdate.subscribe(
      regimentStatus => {
        if (regimentStatus === 'Elfogyott') {
          this.weAllHaveToGo = true;
        }
      }
    )
  }
}
```

Once the message receiver `subscribe()`-s to the observable instance, it begins publishing values.

> Note:
> Although Angular heavily uses observables, they are not part of either Angular or Typescript.
> They are part of a third party library, called __RxJS__.

[//]: # (TODO - Feladatot átmásolni)

## Cross-component communication exercise

We are going to create a little app that lets you pick a musical genre, lists a few artists of that genre and displays a
picture of the selected artist.

Work in the folder named __WS07-Services-Dependency-Injection__. Check out the starting .ts and .html files of the
different components, and start the app by executing `ng serve WS07-Services-Dependency-Injection`.

1. Display all the genres individually in the `AppComponent` by iterating through the `genres` array
2. When clicked, make the genre names call the `choseGenre()` function with the index of the selected genre
3. Let the `BandPickerComponent` receive the `genre` property from its parent's `chosenGenre`
4. Display the band names only for the chosen genre and handle clicking on them by calling the `displayBandImage()`
   function with the proper argument
5. In the `BandImageService` class create a property called `imageUrlUpdate` of type `Subject` (with the generic type
   string)
6. Let the `displayBandImage` function call the `imageUrlUpdate` Subject's `next` function and pass the url string to it
7. Have `BandImageComponent` subscribe to the `imageUrlUpdate` Subject and save the emitted data to the `imageUrl`
   instance variable
8. Let the html template use this `imageUrl` property as the source of its `img`

## Further reading

- [Services](https://angular.io/guide/architecture-services)
- [Observables](https://angular.io/guide/observables)
- [Creating our own observables](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14466296#content)
