[//]: # (TODO - Fordítani)

[//]: # (TODO - Életszerű példát berakni)

# Template References - Hivatkozás a templatere a kódból

Bizonyos esetben szükségünk lehet arra, hogy elérjük DOM-ban található elemeket, vagy éppen a komponenseket, és azokkal
interakcióba léphessünk. Ezekre több lehetőségünk is van.

##### Sablon változók

A sablon változók használatával elnevezhetjük a templateben lévő komponensünket, és arra ezután tudunk hivatkozni máshol
is a templateben. A `#` használatával tudunk deklarálni ilyen változót, egyszerűen csak utána írva a változó nevét:

```angular2html

<app-my-first-component
  #firstComponent
></app-my-first-component>
```

Innentől ezt a változót a templateben bárhol elérhetjük.

```angular2html
<input
  #ref1
  type="text"
  name="firstName"
  [(ngModel)]="form.firstName"
/>
<span>Value: {{ ref1.value }}</span>
```

[//]: # (TODO - Template Referencing - Detail)

#### @ViewChild, @ViewChildren, @ContentChild, @ContentChildren

Ezekkel a dekorátorokkal tudjuk elérni a templateünkben lévő komponenseket, vagy HTML elemeket. Mindegyik dekorátor
hasonlóan működik, 1 vagy 2 paramétert vár ahol az első egy valamilyen selector, ami alapján megpróbálja kikeresni a
templateből a megfelelő elemeket. A selectorok az alábbiak lehetnek:

- Bármilyen olyan osztály neve, amin van @Component vagy @Directive dekorátor
- Egy sablon változó neve
- Olyan Service neve, amelyik benne van valamelyik gyermek komponensben

#### @ViewChild vs @ContentChild

A lényegi különbség a kettő között annyi, hogy míg a ViewChild komponensestől adja vissza a találatokat, értsd.: benne
lesz a `<my-first-component></my-first-component>` element-tag is. Fontos, hogy ezek a propertyk csak a komponens
inicializálása UTÁN lesznek betöltve. Pontosabban:

- a `@ViewChild/ren` az `ngAfterViewInit` lifecycle hook után lesznek elérhetőek
- a `@ContentChild/ren` az `ngAfterContentInit` lifecycle hook utána lesznek elérhetőek

#### Child vs. Children

Ezek között pedig annyi a különbség, hogy mivel a selector gyakran több elemre is ráhúzható így több találat is lehet, a
Child az csak a legelsőt fogja visszaadni, míg a Children az összeset, egy `Query` objektumba csomagolva

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, AfterContentInit {

  @ViewChild('firstComponent') viewRef: ElementRef | undefined = undefined;

  public ngAfterViewInit(): void {
    if (this.viewRef) {
      console.log(this.viewRef);
    }
  }

}
```

[//]: # (TODO - Feladatot írni)
