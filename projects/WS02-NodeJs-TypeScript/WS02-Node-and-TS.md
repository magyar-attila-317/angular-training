# Hogyan tudunk létrehozni egy node-os projektet, ami TS-t használ?

```shell
npm init
npm i typescript
npx tsc --init 
```

Szkript fájl lefordítása:
```shell
npx tsc index.ts
```
...Ezt viszont futtatni minden alkalommal elég lélekörlő tud lenni, de szerencsére van rá automatizáció!
Az alábbi parancs elindít egy folyamatot, ami figyeli a könyvtárban lévő .ts fájlokat, és minden változtatásnál lefordítja azokat!
```shell
npx tsc -w 
```

# Ugródeszka ennek az egész folyamatnak: *Google Typescript Styles!*
- Ez létrehoz nekünk egy alap projektet
- Beállítja a Google standard Code rulejait
- Beállítja a prettier-t
- Beállítja az ESLint-et

```shell
    npx gts init
```
