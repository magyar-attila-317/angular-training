[//]: # (TODO - Lefordítani)

# Adatok átalakítása pipe-ok segítségével

Aki többet dolgozott már terminálban,, akkor a pipe-ok koncepciója bizonyosan ismerősen fog csengeni, felhasználásuk nem
igazán tér el az Angularban sem

A pipe-ok egyszerű metódusok amik képesek fogadni valamilyen értéket, azt átalakítani, majd az átalakított értéket
visszaadni. Ezeket általánosan a template-kben használjuk, de van rá mód, hogy a TS kódban is felhasználjuk őket.

Az Angular jónéhány ilyen beépített pipe-ot tartalmaz, amit használhatunk:

[Date Pipe](https://angular.io/api/common/DatePipe): Megformáz egy dátumot lokális formátumra.  
[UpperCasePipe](https://angular.io/api/common/UpperCasePipe): Nagybetűssé alakít egy szövegrészletet.  
[LowerCasePipe](https://angular.io/api/common/LowerCasePipe): Kisbetűssé alakít egy szövegrészletet.  
[CurrencyPipe](https://angular.io/api/common/CurrencyPipe): Számot alakít át helyi pénzem stringgé.  
[DecimalPipe](https://angular.io/api/common/DecimalPipe): Decimális formátumra alakít egy számot.  
[PercentPipe](https://angular.io/api/common/PercentPipe): Százalék stringgé alakít egy számot.

Ahhoz, hogy ezeket használni tudjuk egy újabb modult kell beimportálni az alkalmazásunkba, méghozzá a `CommonModule`-t
az `@angular/core`-ból. Viszont ezt a `BrowserModule` szintén tartalmazza, ezért ez a lépés jelenleg elhagyható.

```typescript
//...
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    //...
  ],
  imports: [
    //...
    CommonModule
  ],
  providers: [
    //...
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
}
```

Próbáljuk is ki ezeket a projektünkben!

```angular2html

<pre>
  DatePipe: Formats a date value according to locale rules. {{curretDate | date : 'yyyy. MMMM dd'}}
  UpperCasePipe: Transforms text to all upper case. {{'my text'| uppercase}}
  LowerCasePipe: Transforms text to all lower case. {{'MY TEXT'| lowercase}}
  CurrencyPipe: Transforms a number to a currency string, formatted according to locale rules. {{ 1000 | currency:'USD':'symbol'}}
  DecimalPipe: Transforms a number into a string with a decimal point, formatted according to locale rules. {{1 | number:'5.5'}}
  PercentPipe: Transforms a number to a percentage string, formatted according to locale rules. {{ 0.65 | percent}}
</pre>
```

Ezeket a pipe-okat akár egymás után is köthetjük!

```angular2html

<pre>
  {{curretDate | date : 'yyyy. MMMM dd' | uppercase}}
</pre>
```

## Custom pipe-ok készítése

Hozzunk létre egy saját pipe-ot ami képes levágni egy hosszabb szöveget

```shell
ng generate pipe pipes/sliceText
```

Ez az alábbi báziskódot fogja eredményezni:

```typescript
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sliceText',
})
export class SlicePipe implements PipeTransform {

  transform(value: string, ...args: number[]): unknown {
  }

}
```

Itt nincs is más dolgunk, mint implementáljuk a transzformációt a kapott `value`-ra amit alkalmazni szeretnénk, majd ezt
visszatérési értékként visszadobjuk a `return` kulcsszóval.

Ezután már egyszerűen használhatjuk is az új pipe-unkat a megadott selector megadásával.

```angular2html
<p>Our custom pipe: {{'Long text to be sliced' | sliceText}}</p>
```

### Argumentumok átadása, és használata:

Ahogy az előző példában már láthattuk a `transform()` metódus az átalakítandó `value`-n felül képes argumentumokat is
fogadni. Ezeket a templateben `:` jellel elválasztva tudjuk felsorolni:

```angular2html
<p>Our custom pipe: {{'Long text to be sliced' | sliceText:1:3}}</p>
```

A metódus signaturet természetesen megváltozathatjuk, így olvashatóbbá téve a kódunkat:

```typescript
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sliceText',
})
export class SlicePipe implements PipeTransform {

  transform(value: string, mandatoryField: number, optionalField?: number): unknown {
    if (optionalField) {
      return value.slice(mandatoryField, optionalField);
    } else {
      return value.slice(0, mandatoryField);
    }

  }

}
```

### Pipes - gyakorlófeladat

- Listázzunk ki számokat 1-10-ig, egy `<li>` elementben *ngFor segítségével
- Hozzunk létre egy saját pipe-ot `oddOrEven` néven, ami eldönti egy számról hogy páros-e vagy páratlan, és ennek
  függvényében ad vissza egy stringet az alábbi formában:  
  ``PÁROS! - 2``  
  ``PÁRATLAN - 3``
- Alkalmazzuk ezt a pipeot a `<li>` elemeink kimenetére ( a számokra )
- Hozzunk létre egy újabb pipe-ot `splitter` néven, ami képes egy tagoló karakter alapján elválasztani stringeket, és
  visszaadja a legelső stringet a darabokból.
- Kössük az első pipe-unk után az utóbbit, és adjuk át neki a `-` karaktert, mint paramétert
