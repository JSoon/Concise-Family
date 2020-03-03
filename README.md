<h1>Concise-Family</h1>
<p>
Concise-Family is a vanilla Javascript library consisting of Javascript components written in ES6 & CSS3 intended to provide concise libraries.
</p>

# Table of contents
- [Table of contents](#table-of-contents)
- [Build](#build)
- [Concise-Slider](#concise-slider)
  - [Usage](#usage)
  - [Options](#options)

# Build
There's nothing more to say about the building work which is bundled with Webpack.

You can either use the resources in the public directory or build them via `npm run prod` by yourself.

Note that all the concise components are registered under global namespace `ConciseFamily`. You can check that in the `webpack.common.js`.

> Note: This library is built using UMD style so I'm pretty sure you know what it means.

# Concise-Slider
Concise-Slider offers you a quite light slider but consists of sufficient features. The code is clear enough even for beginners. You can do whatever you want to customize and fulfill your own demands easily.

## Usage
1. Script tag
```html
<link rel="stylesheet" href="/public/concise-slider.css">
<script src="/public/concise-slider.js"></script>
<script>
  const mySlider = window.ConciseFamily['concise-slider']
</script>
```
2. ES6 module
```js
import '/public/concise-slider.sass'
import conciseSlider from '/public/concise-slider'
const mySlider = conciseSlider
```
3. AMD
```js
// AMD
define(['/public/concise-slider'], conciseSlider => {
  const mySlider = conciseSlider  
}) 
```
4. CommonJS
```js
const conciseSlider = require('/public/concise-slider')
const mySlider = conciseSlider  
```
Now that we have the `conciseSlider` function, we can just call it like this:
```js
// All the descriptions of params can be found in the source code, simple enough.
mySlider({
  selector: '#J_ConciseSlider',
  gridNum: 4,
  step: 2
})
```

## Options

```js
/**
 * @description Concise slider component
 * Note: This is not a gallery plugin, so far there is no autoplay function, which is not one of the intended features.
 * 
 * @param {object}    params                Config object
 * @param {string}    params.selector       Id or class selector
 * @param {number}    params.gridNum        Number of visible grids
 * @param {number}    params.step           Step number of items for each slide, default to gridNum
 * @param {boolean}   params.loop           Whether to slide to the start or end while reaching the end or start, default to false
 * @param {boolean}   params.indicator      Whether to generate indicator, default to true
 * @param {boolean}   params.indicatorCtrl  Whether the indicator could control slide, default to false
 * @param {string}    params.indicatorType  Indicator type, page: one item represent gridNum slider items, single: one item maps a single slider item, default to page
 * @param {boolean}   params.prevNext       Whether to generate prev & next slide controllers, default to true
 * @param {boolean}   params.autoResize     Whether to resize slider when window resize fires, default to false
 * 
 * Hooks functions
 * @param {function}  params.onCreated        Fired when all the DOM have been created
 * @param {function}  params.onBeforeSliding  Fired before sliding
 * @param {function}  params.onAfterSliding   Fired after sliding
 * @param {function}  params.onResized        Fired when the slider has been resized
 */
```
