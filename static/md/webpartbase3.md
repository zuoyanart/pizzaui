### html
html按照标准来写，要有id，name等属性
```js
 <form id="form1">
    <div>
        <label for="">Name：</label>
        <input type="text" id="name" name="name">
    </div>
    <div>
        <label for="">Password：</label>
        <input type="password" id="password" name="password">
    </div>
    <div style="height:35px;margin-top: 20px;">
        <label for="">checkbox：</label>
        <label class="checkgroup">
            <input type="checkbox" id="text1" name="check">
            <label for="text1"></label>测试1</label>
        <label class="checkgroup">
            <input type="checkbox" id="text2" name="check">
            <label for="text2"></label>测试2</label>
        <label class="checkgroup">
            <input type="checkbox" id="text3" name="chexk">
            <label for="text3"></label>测试3</label>
        <label class="checkgroup">
            <input type="checkbox" id="text4" name="check">
            <label for="text4"></label>测试4</label>
    </div>
    <div style="height:35px;">
        <label for="">radiobox：</label>
        <label class="radiogroup">
            <input type="radio" id="text11" name="radio" checked="checked">
            <label for="text11"></label>测试1</label>
        <label class="radiogroup">
            <input type="radio" id="text21" name="radio">
            <label for="text21"></label>测试2</label>
        <label class="radiogroup">
            <input type="radio" id="text31" name="radio">
            <label for="text31"></label>测试3</label>
        <label class="radiogroup">
            <input type="radio" id="text41" name="radio">
            <label for="text41"></label>测试4</label>
    </div>
    <div>
        <label>请选择年龄：</label>
        <select id="age" name="age" style="width:200px;">
            <option value="" selected="selected">请选择年龄</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
        </select>&nbsp;&nbsp;&nbsp;&nbsp; -- &nbsp;&nbsp;&nbsp;&nbsp;
        <select id="age1" name="age1" style="width:200px;">
            <option value="" selected="selected">请选择年龄</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
        </select>
    </div>
    <div>
        <label for="">Des：</label>
        <textarea rows="6" id="des" name="des"></textarea>
    </div>
    <div>
        <label>城市选择一</label>
        <input type="text" id="area-1" name="area-1" placeholder="支持手动输入">
        <input type="text" id="area-2" name="area-2" placeholder="支持手动输入">
    </div>
    <br>
    <div>
        <input type="submit" class="btn btn-primary" value="提交" />
        </button>
        <button class="btn btn-info">重置</button>
    </div>
</form>


```
### js
```js
$("#form1").pizzaValidate({
     'fields': {
       '#name': {
         'must': true,
         'minLength': 5,
         'maxLength': 12,
         focusMsg: "请输入用户名",
         errMsg: '用户名不能为空或用户名必须在5-12个字符之间'
       },
       '#password': {
         'must': true,
         'minLength': 5,
         'maxLength': 12,
         focusMsg: "请输入6-16位的密码",
         errMsg: '密码不能为空且密码须在6-16个字符之间'
       },
       '#age': {
         'must': true,
         'minLength': 1,
         'maxLength': 16,
         focusMsg: "请选择您的年龄",
         errMsg: '请选择您的年龄'
       },
       '#age1': {
         'must': true,
         'minLength': 1,
         'maxLength': 16,
         focusMsg: "请选择您的年龄",
         errMsg: '请选择您的年龄'
       },
       '#des': {
         'must': true,
         'minLength': 1,
         'maxLength': 500,
         focusMsg: "请输入描述",
         errMsg: '用户名不能为空或用户名必须在1-500个字符之间'
       }
     },
     ajaxFun: function(data) {
       alert("获取到的数据：" + data);
       return;
       $.ajax({
         type: 'post',
         url: '/ajax/ch',
         success: function(msg) {
           //alert(msg);
         }
       });
     }
   });
```

#### 验证属性： 

> * must: //是否必填 
> -
> * minLength: //最小长度
> -
> * maxLength: //最大长度
> -
> * comp: //比较对象，值为.class 或#id，比较当前对象的值和目标的值是否相等
> -
> * reg: //正则，当reg的值为字符串的时候，使用系统默认提供的正则，如果为正则表达式，则直接使用该正则
> -
> * url: //ajax check,用来校验帐号，用户名无重复等，返回值为json,{"state": true/false}
> -
> * focusMsg //获取焦点时的提示信息
> -
> * errMsg //错误的提示信息

#### 默认提供的正则支持
```js
mail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, //邮箱
china: /^[\u0391-\uFFE5]+$/, //中文
int: /^\d+$/, //数字
qq: /^[1-9]*[1-9][0-9]*$/, //QQ号码
phone: /^[1]([3]|[4]|[5]|[8])[0-9]{9}$/, //手机号码
user: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, //验证用户名，长度在5~16之间，只能包含字符、数字和下划线
post: /[1-9]d{5}(?!d)/, //邮编
url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^\"\"])*$/, //url地址
idcard: /^\d{15}(\d{2}[A-Za-z0-9])?$/, //身份证号
ip: /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //IP
```

### 文件位置
```js
/modules/pizzaui/pizzaui/pizza.ui.validate.js
```
