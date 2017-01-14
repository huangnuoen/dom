/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById("aqi-city-input");
var aqiInput = document.getElementById("aqi-value-input");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = cityInput.value.trim();//获得表单内容并去空格
    var aqi = aqiInput.value.trim();

    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;//不匹配时，退出addAqiData函数
    }
    if(!aqi.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
    aqiData[city] = aqi;//为什么不用return

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

    //当第2次调用该函数 时，items又会被初始化，赋值为如下字符串
    var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    document.getElementById("aqi-table").innerHTML="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        var otr = document.createElement("tr");
        var trText = "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"
        otr.innerHTML=trText;
        document.getElementById("aqi-table").appendChild(otr)
    }//不会每次都在原来的基础上增加tr吗？难道是重写table,之前写的tr会被清空？yes

    ; 
    console.log(document.getElementById("aqi-table").innerHTML);//innerHtml是会重写<table>中的内容，每次调用之前的内容会被代换
//第二次调用renderAqilist时，对象中已有2个属性，items有3个tr
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
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click", addBtnHandle)
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
    })
}

init();