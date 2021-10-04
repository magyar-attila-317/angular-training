# Routing

As we are creating an SPA (Single Page Application), routing works a bit differently than before. We are not loading a
complete new HTML file each time we navigate somewhere new, we just render a different component tree in the same one.

We're going to use the standard routing library of Angular available from the `@angular/router` package.

## Configuration

You will need to import `Routes` and `RouterModule` to set up basic routing.  
`Routes` is any array defining the available routes for the router and the `RouterModule.forRoot()` method configures
the router.

Let's see an example where this configuration is all done in the `app.module.ts` file that you already know:

```typescript
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: '', component: HomeComponent}, // no slash in the path string, as the base "/" is defined in the index.html
  {path: 'wizards', component: WizardListComponent},
  {path: 'wand/:id', component: WandDetailsComponent},
  {path: 'wands', component: WandListComponent},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  //...
  imports: [
    RouterModule.forRoot(routes)
  ]
  //...
})
export class AppModule {
}
```

> Before you ask, yes, the CLI helps with routing as well. When you generate a new application with `ng new` the CLI asks if you would like to add routing. If you choose yes, the configuration seen above will be created with one difference: it will be move to a separate module called `app-routing.module.ts`. That is where you can define your routes. Check out the files of this project for the details.

#### Route details

- Each object in the `routes` array maps a url path to a component.
- The `:id` in the third route is a token for a route parameter. The mapped component can access the parameter value and
  use it.
- The `**` path is a wildcard. The router will select this route if the requested URL doesn't match paths defined
  earlier in the config.
- The order of the routes in the config matters as the router uses a _first match wins_ strategy. If it finds a matching
  route, it is not going to look for more. This is why the wildcard path should be placed below the more specific ones,
  at the end of the array.

## RouterOutlet

Configuration is only part of the job of implementing routing in our app. Another major part is defining a place, a part
in the HTML where the router can display the views produced by navigation actions. This is done with the `RouterOutlet`
directives.  
In this basic example, we are going to have a _navigation bar_ component containing all the links which will always be
visible.

##### app.component.html

```angular2html

<app-navbar></app-navbar>
<router-outlet></router-outlet>
``` 

`<router-outlet></router-outlet>` marks the spot in the template where the router should display the component we
navigate to.

## RouterLink

To define the links in the `Navbar` component, we are going to use the `RouterLink` directive on the `a` tags instead of
the 'href' attribute.

##### navbar.component.html

```angular2html
<a routerLink="/">Home</a>
<a routerLink="users">Users</a>
<a routerLink="dogs">Dogs</a>
```

The `routerLink` directive connects the router to the navigation links (the `a` tags of the navbar).

## Route parameters

The current route path and its parameters are available through a built-in service called `ActivatedRoute`.  
Most importantly, this service provides access to route specific parameter information in the form of maps wrapped in,
yeah you guessed it, __observables__.  
Let's say we've navigated to a link with the _param_ named 'id' (e.g.: www.example.com/penguins/37 where the route path
was defined as `penguins/:id`).  
After importing and injecting this service we can get info about this route parameter.

```typescript
import {ActivatedRoute} from '@angular/router';

...

penguinId: string;

constructor(private
activatedRoute: ActivatedRoute
)
{
  this.activatedRoute.paramMap.subscribe(
    paramMap => this.penguinId = paramMap.get('id')
  )
```

## Programmatic navigation

There are some cases when we want to navigate inside our application from code instead of by clicking a link. A typical
case would be after communicating to a server and based on the response (success or error) we would like to go to
different pages. There is another service provided for us called `Router`, which has a `navigate`
method that does just what we need.

After importing and injecting this service into our component, we can use this method, providing an array of navigation
options as argument. The array takes target paths and parameters as well.

```typescript
import {Router} from '@angular/router';

...

constructor(private
router: Router
)
{
}

goToPenguinDetails(penguinId
:
number
)
{
  this.router.navigate(['/penguins', penguinId])
}
```

## Active Link

Angular has a special directive called `routerLinkActive`, which can dynamically add a css class to the element (it
works on the wrapping element too, if it is a `<li>` for example):

```html

<li class=”link” routerLinkActive=”active-link”>
  <a routerLink=”/dogs”>
    Dogs
  </a>
</li>
```

If we have a few links on our navigation bar, this will make sure the link that is connected to the page we are
currently on will look differently, which gives us better user experience.

It is important to know that when trying to match the currently active link, angular's router is going to look for a
link that matches the beginning of the path of the current route, meaning the home ("")
path will always be matched and styled, even if we are on the "dogs" url (and so will "dog", "do" and "d"). To avoid
this problem, we need to provide another directive, `routerLinkActiveOptions` with a config object:

```html

<li class=”link” routerLinkActive=”active-link” [routerLinkActiveOptions]=”{exact: true}”>
  <a routerLink=”/dogs”>
    Dogs
  </a>
</li>

```

[//]: # (TODO - Fordítani)

## Egymásba ágyazott útvonalak

Egy szuper feature az Angular Routingban, hogy létrehozhatunk úgynevezett egymásba ágyazott útvonalakat. Ezáltal
lehetőségünk van az útvonaltól függően, egy bizonyos komponensen belül egy másik konkrét komponens megjelenítésére.

Tegyük fel, hogy egy közösségi oldalt építünk. Itt a profil oldalunkon különböző komponenseket tudunk megjeleníteni,
például az a személyes adataink és az üzeneteink. A beágyazott útvonalakon keresztül lehetőségünk van rá, hogy ez a
hierarchia az URL-en keresztül is felépíthető legyen.

```typescript
const routes: Routes = [
  {path: '', redirectTo: 'home'},
  {path: 'find', redirectTo: 'search'},
  {path: 'home', component: HomeComponent},
  {
    path: 'profile/:profileId',
    component: ProfileComponent,
    children: [
      {path: '', redirectTo: 'details'},
      {path: 'details', component: ProfileDetailsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  },
  {path: '**', component: HomeComponent}
];
```

Természetesen így, mivel két helyen is van útvonal választás, ezért a ProfileComponent templatejének szintén
tartlamaznia kell egy újabb `<router-outlet></router-outlet>` elemet.

[//]: # (TODO - Feladatot átmásolni)

## Exercise

Complete the code of this repository to make the Wizard Database application work properly!

## Further reading

[Routing & Navigation](https://angular.io/guide/router)
