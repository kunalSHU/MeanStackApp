[![npm version](https://badge.fury.io/js/angular-svg-icon.svg)](https://badge.fury.io/js/angular-svg-icon)

Angular SVG Icon
=========

The **angular-svg-icon** is an Angular 6 service and component that provides a
means to inline SVG files to allow for them to be easily styled by CSS and code.

The service provides an icon registery that loads and caches a SVG indexed by
its url. The component is responsible for displaying the SVG. After getting the
svg from the registry it clones the `SVGElement` and the SVG to the component's
inner HTML.

This [demo](http://czeckd.github.io/angular-svg-icon/demo/) shows this module in action.

## How to use?
```
$ npm i angular-svg-icon --save
```
**Note on earlier versions of ngx:** 
- For Angular 4.3 through Angular 5.x, use angular-svg-icon@5.1.1
- For Angular 2.4 through Angular 4.2, use angular-svg-icon@4.2.6

See the module's accompanying README.md for instructions.

## Integration

The **angular-svg-icon** should work as-is with webpack/angular-cli. Just import the
``AngularSvgIconModule`` and the ```HttpClientModule```.

```typescript
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [ HttpClientModule, AngularSvgIconModule ],
  ...
})
export class AppModule {}
```
## Usage
Basic usage is:
```html
<svg-icon src="images/eye.svg" [svgStyle]="{ 'width.px':90 }"></svg-icon>
```
*Note that without a height or width set, the SVG may not display!*

More complex styling can be applied to the svg, for example:
```html
<svg-icon src="images/eye.svg" [stretch]="true"
  [svgStyle]="{'width.px':170,'fill':'rgb(150,50,255)','padding.px':1,'margin.px':3}">
</svg-icon>
```

The following attributes can be set on svg-icon:
- **src** - The path to SVG.
- **[svgStyle]** - Styles to be applied to the SVG, this is based on the familiar [ngStyle].
- **[stretch]** - A boolean (default is false) that, when true, sets `preserveAspectRatio="none"` on the SVG. This is useful for setting both the height and width styles to strech *or* distort the svg.

Programatic interaction with the registry is also possible.
Include the ``private iconReg:SvgIconRegistryService`` in the constructor:
```typescript
constructor(private iconReg:SvgIconRegistryService) { }
```

The registry has three public functions: `loadSvg(string)`, `addSvg(string, string)`, and `unloadSvg(string)`.

To preload a SVG file from a URL into the registry:
```typescript
{
  ...
  this.iconReg.loadSvg('foo.svg');
}
```
To add a SVG from a sting:
```typescript
{
  ...
  this.iconReg.addSvg('box',
   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M1 1 L1 9 L9 9 L9 1 Z"/></svg>'
  );
}
```
To unload a SVG from the registry.
```typescript
{
  ...
  this.iconReg.unloadSvg('foo.svg');
}
```

## SVG Preparation
The SVG should be modified to remove the height and width attributes from the file
per Sara Soueidan's advice in "[Making SVGs Responsive With
CSS](http://tympanus.net/codrops/2014/08/19/making-svgs-responsive-with-css/)" if
size is to be modified through CSS. Removing the height and width has two immedate
impacts: (1) CSS can be used to size the SVG, and (2) CSS will be *required* to 
size the SVG.

## Background

The svg-icon is an Angular 2 component that allows for the continuation of the
AngularJS method for easily inlining SVGs explained by [Ben
Markowitz](https://www.mobomo.com/2014/09/angular-js-svg/) and others. Including
the SVG source inline allows for the graphic to be easily styled by CSS.

The technique made use of ng-include to inline the svg source into the document.
Angular 2, however, drops the support of ng-include, so this is my work-around
method.

*Note:* The [icon
component](https://www.npmjs.com/package/@angular2-material/icon) from
[angular/material2](https://github.com/angular/material2) used to have a direct
means to load svg similar to this, but this functionality was removed because of
security concerns.

## License

MIT


## Author
- David Czeck [@czeckd](https://github.com/czeckd)

