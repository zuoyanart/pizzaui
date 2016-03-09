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
            <input type="radio" id="text11" name="radio">
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
        <button class="btn btn-info">重置</button>
    </div>
</form>
```