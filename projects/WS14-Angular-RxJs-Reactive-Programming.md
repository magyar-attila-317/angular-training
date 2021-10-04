[//]: # (TODO - Fordítani)

[//]: # (TODO - RxJS - Detail)

# RxJS - Reactive Extension for JavaScript

Microsoft fejlesztette, eredetileg Rx.NET, több nyelvhez is elérhető (Java, Python, Ruby, JS)

A fő célja, aszinkron és esemény alapú programok létrehozása observable-ök felhasználásával.

Főbb funkcionalitások:

- Adatok összegyűjtése
- Manipulációja
  - Átalakítás
  - Szűrés
  - Feldolgozás
- Adatok összefűzése
- Gyorsítótárazása

## Miért az RxJS?

- Különböző logikai egységei összefűhetőek
- A feliratkozás által képes folyamtosan figyelni, hogy van-e újabb érkező adat
- Lazy - A kiértékelés csak akkor fut le, mikor szeretnék
- Beépített hibakezelés
- Leállítható

## Hol jelenik meg meg az RxJS az Angularban?

- Routing ( pl params )
- Reactive Forms ( pl. control.valueChanges() )
- HttpClient

## Mit takar ez a Reactive Development?

- Gyorsan képes reagálni felhasználói beavatkozásra
- Hibatűrő
- Reagál az állapotváltozásokra

## Hogyan is használunk fel egy observable-t?

Küldő oldal: (observable)

- Elindítjuk az adatfolyamot ( subscribe() )
  - Újabb adatok 'emittálódnak' a folyamba/stream-be
- Az adatok keresztül haladnak bizonyos feldolgozó egységeken ( pipe-olás )

Fogadó oldal: (observer)

- Feldolgozzuk a következő (Next) elemet
- Hiba történt, lekezeljük
- Az adatfolyam befejeződött
- Fogadóként lehetőségünk van megállítani a folyamot. (unsubscribe() )

## Pull versus Push

Pull and Push are two different protocols that describe how a data Producer can communicate with a data Consumer.

### What is Pull?

In Pull systems, the Consumer determines when it receives data from the data Producer. The Producer itself is unaware of
when the data will be delivered to the Consumer.

Every JavaScript Function is a Pull system. The function is a Producer of data, and the code that calls the function is
consuming it by "pulling" out a single return value from its call.

ES2015 introduced generator functions and iterators (function*), another type of Pull system. Code that calls
iterator.next() is the Consumer, "pulling" out multiple values from the iterator (the Producer).

### What is Push?

In Push systems, the Producer determines when to send data to the Consumer. The Consumer is unaware of when it will
receive that data.

Promises are the most common type of Push system in JavaScript today. A Promise (the Producer) delivers a resolved value
to registered callbacks (the Consumers), but unlike functions, it is the Promise which is in charge of determining
precisely when that value is "pushed" to the callbacks.

## Hogyan hozhatunk létre saját observable-t?

```typescript
const myStream = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.next(4);
  subscriber.complete();
});
//Vagy
const myStream = of(1, 2, 3, 4);
const myStream = from([1, 2, 3, 4]);

//*******************
export class Component implements AfterViewInit {
  @ViewChild('firstComponent', {read: ElementRef}) ref: ElementRef | undefined = undefined;

  ngAfterViewInit(): void {
    if (this.ref) {
      const clickStream = fromEvent(this.ref.nativeElement, 'click')
        .subscribe(console.log);
    }
  }
}

//*******************
const num = interval(1000)
  .subscribe(console.log);

```

## Leiratkozás egy Observable-ről

Azon túl, hogy néha valamilyen okból indokolt lehet, hogy egy adatfolyamot leállítsunk, ha ez mindig megtörténik
elkerülhetők a memory-leak-ek.

```typescript

const subscription = someObservable.subscribe(...);
subscription.unsubscribe();

```

## RxJS Operátorok ( A teljesség igénye nélkül )

Az Observable által emittált adatokkal különböző műveleteket tudunk végezni, ezeknek a bekötése a .pipe() metódussal
történik. Ebben paraméterként kell átadnunk az egyes műveleteket(egyszerűen, vesszővel elválasztva), amik egymás után
végre fognak hajtódni az emittált értékeken.

[RxJS Operátorok](https://rxjs.dev/api)

[Nah de melyikre is van szükségem?](https://rxjs.dev/operator-decision-tree)

Néhány példa:

```typescript
// map - átalakíthatjuk az adatot az adatfolyamban
of(1, 2, 3, 4, 5)
  .pipe(
    map(item => item * 2)
  )
  .subscribe(console.log);

// tap - belekukkanthatunk az adatfolyamba
of(1, 2, 3, 4, 5)
  .pipe(
    map(item => item * 2),
    tap(console.log)
  )
  .subscribe(console.log);

// take - bekorlátozhatjuk, hogy összesen hány darab adatot fogadunk, hasznos lehet, ha például egy végtelen stream-re 
// iratkozunk fel (interval())
interval(1000)
  .pipe(take(10))
  .subscribe(console.log);

```

## Let's be reactive!

Klasszikus adatbetöltés:

```typescript
class Component implements OnInit, OnDestroy {

  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        products => this.products = products,
        console.warn
      )
  }

  ngOnDestory() {
    this.productService.getProducts().unsubscribe()
  }

}
```

...Ugyanez, reaktívan!

```typescript
class Component implements OnInit {

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products$ = this.productService.getProducts()
  }

}
```

Majd a templateben:

```angular2html

<div *ngIf="products$ | async as products">
  <div *ngFor="let product of products">
    {{product | json}}
  </div>
</div>

```

## Hibakezelés

### A cactchError operátor - catch and replace

```typescript

class Service {
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products')
      .pipe(
        catchError(err => {
          console.warn(err);
          return of([{id: 0, name: 'dummyProduct'}])
        })
      )
  }
}
```

### A throwError operátor - catch and rethrow

```typescript
class Service {
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products')
      .pipe(
        catchError(this.handlerError)
      )
  }

  handlerError(error: any): Observable<never> {
    // ...
    return throwError(processedErrorMessage)
  }

}
```

## Streamek összekapcsolása

### forkJoin

Ez akkor lehet igazán hasznos, ha például több HTTP kérést szeretnénk bevárni, majd ezeket eredményét egyszerre
felhasználni.

#### Próbáljuk ki az alábbi linkekkel:

https://my.api.mockaroo.com/product.json?key=ba2bc330
https://my.api.mockaroo.com/categories.json?key=ba2bc330

### withLatestFrom és combineLatest

Nézzünk meg a cikkben szereplő ábrákat, hogy könyebben megértsük ezek működését:  
https://coding-time.co/rx-combinelatest-vs-withlatestfrom/

## Hands-on

Dolgozzatok együtt a `WS14-Angular-RxJS-Reactive-Programming` könyvtárban, és alakítsátok át az alkalmazást a Reaktív programozás néhány
elvét alkalmazva!

Saját webszerver indításhoz/fájlkiszolgáláshoz telepítsük majd indítsuk el az alábbi packaget:

```shell
$ npm i -g http-server
$ cd ./WS14-Angular-RxJs-Reactive-Programming/server-data
$ http-server --cors
```

### AsyncPipe

Egyszerűsíthetjük a service osztályainkat, és azok meghívását olyan módon, hogy a templatenek egyből az Observable-t
adjuk át. Majd erre, ha rárakjuk az `async` pipe-ot, az Angular automatikusan fel fog iratkozni erre, kiveszi belőle az
adatokat, majd ezt a rendelkezésünkre is bocsájtja.

### Alakítsuk át a fogadott adatokat!

Alakítsuk át a visszakapott product listát úgy, hogy az árukat megnövejük 20%-al! Használjuk a map() operátort!

### Fűzzük össze a products és categories listákat!

A products-ba mappeljük bele a hozzátartozó kategória nevét!

### Szűrjük le a termék listát a kiválasztott kategória alapján!

Használjunk egy Subjectet amikor változik a SelectBox kiválaszott eleme

Módosítsuk BehaviourSubjectre!

## További olvasnivalók

[Streamek összekapcsolása](https://nishugoel.medium.com/forkjoin-combinelatest-withlatestfrom-50574d1c21ad)
