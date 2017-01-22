/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input').value.trim();
    var value = document.getElementById('aqi-value-input').value.trim();
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
        alert("Please write 中英文字符！");
        return;
    }
    if(value != parseInt(value)) {
        alert("Please write number!");
        return;
    }

    aqiData[city] = value;

    //清空input
    document.getElementById('aqi-city-input').value = "";
    document.getElementById('aqi-value-input').value = "";
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById('aqi-table');
    var items = "<tr><td>city</td><td>value</td><td>操作</td></tr>";
    for(var city in aqiData) {
        items += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button>";
    }
    table.innerHTML = city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];//删除点击的那条属性值，再重新渲染表格
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').addEventListener("click",addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById('aqi-table').addEventListener("click",function(event) {
    if(event.target.nodeName.toLowerCase() == "button") {
        delBtnHandle(event.target.parentNode.parentNode.firstChild.innerHTML);
    }
  })
}

init();