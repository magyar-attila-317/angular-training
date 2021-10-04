# Angular

Angular is a platform and framework for building client applications in HTML and TypeScript.

The basic building blocks of an Angular application are `NgModules`, `components` and `services`.

- NgModules are basically parts of a large software (small applications only consist of a single module)
- Components define views (blocks of what you see on a web page) that Angular can choose among and modify according to
  the program logic and data
- Services provide specific functionality not directly related to views, and they can be injected into components as
  dependencies

In fact, these building blocks are all simply _classes_ (YAY ES6!) with `decorators` that mark their type, and provide
metadata to Angular on how to use them.

### The angular.json file

### Modules

When an application gets big, it is often separated into different _modules_ (software parts).`NgModule` is a container
for a cohesive block of code. It declares a compilation context for a set of components to form functional units.

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],   // our root component is declared. Should we have any other components, they would be declared here as well
  imports: [BrowserModule],  // every external module that we use in the .ts files of the declared components need to be listed here 
  exports: [],                 // In case, we are developing a library or a submodule, than we must define here what components we wish to expose
  providers: [],                 // We must declare our services in this array
  bootstrap: [AppComponent]    // this only needs to be set in the root module
})
export class AppModule {
}
```

Every Angular app has a root module, conventionally named `AppModule` that resides in a file named app.module.ts. You
launch your app by bootstrapping the root NgModule. We must explicitly declare all the components, services and other
code files that belong to the module.

The decorator of an NgModule class is `@NgModule()`. This is a function that takes a single metadata object with the
following properties:

- declarations: The components that belong to this module
- exports: The declarations that should be visible by other modules
- imports: Pieces of code declared in other modules that are needed in this module
- providers: Declaration of services that this module contributes to the app
- bootstrap: The root component that Angular creates and inserts into the index.html

> Note:   
The `import` statement at the top of the file lets us use code that was _exported_ from another file.  
The `imports` property in the meta object of the @NgModule decorator lists the other Modules that we are going to use in this module.

### Components

Components are the most important pieces of the Angular puzzle, as their job is to connect our application logic, data
and HTML with the DOM. A component is a class decorated with the `@Component()` decorator, which associates it with an
HTML template and one or more CSS files.

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',                 // more on this later 
  templateUrl: './app.component.html',  // the HTML template file associated with the component
  styleUrls: ['./app.component.css']    // the CSS file associated with the component
})
export class AppComponent {
  //data and program logic goes here
}
```

This is an example of the root component, which lives in a file named app.component.ts. The root component is a
must-have for every Angular app.

The template associated with the component is an HTML file with some superpowers, provided by some Angular-specific
markup.

Almost all HTML syntax is valid template syntax. One notable exception is the `<script>` element, which is forbidden
here.

### Services and dependency injection

When building an app based on components, data and logic will always pop up that is not associated with any specific
view, but needs to be shared across components. This is where service classes and dependency injection come in.

Dependency injection keeps our components lean and efficient, as they pass some common functionality to services and
focus on their own thing. For example, components don't have to deal with the implementation of fetching data from a
server, custom validation, logging and so forth. These tasks are delegated to service classes.

### Getting started

Now that we are familiar with the building blocks, let's check them out in action. For that we are going to use the
Angular CLI, a command-line tool used to initialize, develop, scaffold, and maintain Angular applications. It will also
be our best friend during our time with Angular.

First we need to install the tool with the following command in your terminal:

```
npm install -g @angular/cli
```

To create a basic Angular project that can be up and running in just a few minutes, choose a directory (making sure it
is not a directory of this project) and enter the following command:

```
ng new project-name
```

When prompted, choose `No` for routing and `CSS` for styling. We are going to talk about these later.

This creates an Angular workspace for us, with all the workspace-wide configuration files and a root application. We can
start this root application by going to the root folder (same as the project name):

```
cd project-name
```

and firing up a live development server:

```
ng serve
``` 

Now going to the browser and typing `http://localhost:4200` we can see our basic angular app running.

> Note:  
Upon closer inspection, you might notice that we have an `index.html` and a `main.ts` file in the `src` folder of the root app. These are the entry points for the whole application.

In the body of the index.html there is only one empty, but not self closing tag, `<app-root></app-root>`. This tag is
the selector for the root component of our application, defined in app.component.ts. The exact value is set as the value
of the `selector` key of the `@Component()` decorator.

The `main.ts` file contains only a few, but extremely important lines of code. It imports and bootstraps our root module
so that we can run our Angular application in the browser.

## Further Reading

- [ng serve flags](https://angular.io/cli/serve)
- [Architecture overview](https://angular.io/guide/architecture)
- [CLI overview](https://angular.io/cli)
- [Video course on Udemy](https://www.udemy.com/course/the-complete-guide-to-angular-2/)
