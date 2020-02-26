<h1>Concise-Family</h1>
<p>
Concise-Family is a vanilla Javascript library consisting of Javascript components written in ES6 & CSS3 intended to provide concise libraries.
</p>

# Table of contents
- [Table of contents](#table-of-contents)
- [Build](#build)
- [Concise-Slider](#concise-slider)
  - [Usage](#usage)

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
  const mySlider = ConciseFamily['concise-slider']
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
