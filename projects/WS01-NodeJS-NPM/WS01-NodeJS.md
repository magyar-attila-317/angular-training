# NodeJS
Néhány érdekesség:
- Non-blocking thread - Egy szálon fut, a párhuzamosítást a Node végzi a háttérben az EventLoop-on keresztül.
- 2009 óta van jelen, nehéz életútja volt, rossz volt eleinte a fogadtatása a JavaScript *sajátosságai* miatt
- Óriási community, rengeteg library *( NPM ivós játék )*

Az alábbi paranccsal tudunk inicializálni egy üres projektet:
```shell
npm init
```

A lelke a `package.json` fájl. Ebben tudunk mindent felkonfigurálni.
### Dive-in!
Hozzunk létre egy script.js fájlt az alábbi kóddal:
```javascript
console.log('Hello NodeJS!');
```
Majd indítsuk el a következő paranccsal:
```shell
node script.js
```

ESModule rendszer:
- Egyszerűen tudunk további könyvtárakat behúzni, és használni

```shell
npm i express
```

### Miért jó nekünk ez az egész?
Hozzunk létre egy server.js fájlt az alábbi kóddal:
```javascript
const express = require('express');
const app = express();
app.get('/', (req, resp) => {res.send('Hello!');});
app.listen(3000, () => console.log('App running on localhost:3000'));
```
Majd indítsuk el a következő paranccsal:
```shell
node server.js
```

### Hogyan tudunk TS fájlokat futtatni?
Ezt a Node nem tudja a TS formában futtatni, ezt először le kell fordítani natív JS kódra.
 
- Telepítsük a TS libraryt globálisan:  
```shell
    npm i -g typescript
    tsc -v
```
Hozzunk létre egy `hello-typescript.ts` fájlt  
```typescript
const doStuff = (): void => {
    const textToPrint: string = 'Hello Typescript!';
    console.log(textToPrint);
};
doStuff();
```
Majd az alábbi kóddal fordítsuk le:
```shell
    tsc hello-typescript.ts
```
Ez létre fogja hozni a javascript megfelelőjét a kódunknak, ezt már tudjuk futtatni a Node-al:  
```shell
    node hello-typescript.js
```
