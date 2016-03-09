### html
```js
   <div class="tab" id="tab1">
                  <ul>
                    <li class="active">选项1</li>
                    <li>选项2</li>
                    <li>选项3</li>
                  </ul>
                  <div class="item">1---</div>
                  <div class="item">2--</div>
                  <div class="item">3---</div>
                </div>
```
### js
```js
$("#tab1").pizzaTab({
  activeCla: "active", //默认标题选中样式
  itemCla: 'item', //默认正文区样式
  url: ''//ajax 获取数据的url地址
});
```



### 文件位置
```js
/modules/pizzaui/pizzaui/pizza.ui.tab.js
```
