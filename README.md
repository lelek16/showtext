#ShowText
Few fade text animations (via CSS3 transitions) after page load

demo page: [DEMO](http://witaszak.pl/showtext)

##Getting Started

### 1. Include js on your site.
```html
<script src="lib/jquery.showtext.min.js"></script>
```
### 2. Init
```html
<script>
   $('p').showText(); 
</script>
```


### 3. Options
#### type
`type` type of animation (all, char, alpha_asc, alpha_desc)
#### time
`time` time of animation (in ms, e.g. 1000)
#### timeout
`timeout` timeout of animation (in ms, e.g. 1000)

### 4. Defaults
#### type: `all`
#### time: `400`
#### timeout: `1000`

### 5. Example usage
<code>
$('p').showText({
	type: 'char',
	time: 50,
	timeout: 200
});
</code>
##License
MIT