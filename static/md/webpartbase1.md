### html
```js
<select name="city" id="selectDemo">
  <option value="">请选择城市</option>
  <option value="Beijing">北京</option>
  <option value="Shanghai">上海</option>
  <option value="Guangzhou">广州</option>
</select>

```
### js
```js
<script>
require('pizzaui');
var $ = require('jquery');

$('#selectDemo').pizzaSelect({
  onChange: function(obj) {
    $('#selectDemoTips').html(obj.attr('data'));
  }
});
</script>
```
### 使用
##### 数据绑定

 默认selected属性
```js
<select name="city" id="selectDemo">
  <option value="" selected="selected">请选择城市</option>
  <option value="Beijing">北京</option>
  <option value="Shanghai">上海</option>
  <option value="Guangzhou">广州</option>
</select>
```
 在select上添加val属性,val指向select的value值
```js
<select name="city" id="selectDemo" val="Beijing">
  <option value="">请选择城市</option>
  <option value="Beijing">北京</option>
  <option value="Shanghai">上海</option>
  <option value="Guangzhou">广州</option>
</select>
```
 传递options
```js
$('#selectDemo').pizzaSelect({
  option: {
    selected: {
        value: "value",
        name: "text value"
    },
  onChange: function(obj) {
    $('#selectDemoTips').html(obj.attr('data'));
  }
});
```
 
### 说明

* 模拟生成的下拉与select同宽，同高
* 
* onChange，可传递一个函数，用来实现诸如联动等功能。性质等同与select的onchange，参数为：obj(点击的li元素)

### 文件位置
```js
/modules/pizzaui/pizzaui/pizza.ui.select.js
```
