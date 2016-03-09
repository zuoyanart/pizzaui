### html
```js
  <textarea name="" id="wordcount"></textarea>
 <p style="wordstip" id="wordcount-tip"></p>

```
### js
```js
require('pizzaui');
$('#wordcount').wordsTip({
    min: 10,//最小字数
    max: 200,//最大字数
    English: true//是否区分中英文
});

```
 
### 说明

* 提示区的id为 textarea的id + "-tip"

### 文件位置
```js
/modules/pizzaui/pizzaui/pizza.ui.wordsTip.js
```
