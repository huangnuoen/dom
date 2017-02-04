/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
function $(id) {
  return document.getElementById(id);
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}
var dayName = Object.keys(aqiSourceData[pageState.nowSelectCity]);
/**
 * 渲染图表
 */
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95','#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];
function renderChart() {
  var wrap = document.getElementsByClassName('aqi-chart-wrap')[0];
  wrap.innerHTML = "";
  var i = 0;
  var title = "<div class='title'>" + pageState.nowSelectCity  + "1~3月空气质量指数图/" + pageState.nowGraTime+ "</div>";
  document.getElementsByClassName('aqi-chart-wrap')[0].innerHTML = title;
  for(var h = 0; h < chartData.height.length;h++) {
      var div = document.createElement('div');
      div.title = chartData.x[h] + "  " +chartData.height[h];
      div.className = pageState.nowGraTime;
      div.style.backgroundColor = colors[i];
      div.style.height = chartData.height[h]/3*2 + "px";
      div.style.width = chartData.w + "px";
      div.style.left = chartData.w * (h+1) + 8*(h+1) + "px";
      document.getElementsByClassName('aqi-chart-wrap')[0].appendChild(div);
      i++;
      if (i > 11) { i = 0;}
  }


}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if(pageState.nowGraTime == this.value) return;
  // 设置对应数据
  pageState.nowGraTime = this.value;
  // 调用初始化图表数据函数和图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 ，无需判断，因为只有change才会触发该函数
  // 设置对应数据
  pageState.nowSelectCity = this.value;//this指向select
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var input = document.getElementsByTagName('input');
  for (var i = 0; i < input.length; i++) {
    input[i].addEventListener('click',graTimeChange);
  };
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var items = "";
  for(var i in aqiSourceData) {
  items += "<option>" + i + "</option>";
  }
  $('city-select').innerHTML = items;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  $('city-select').addEventListener('change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var nCity = pageState.nowSelectCity;
  console.log(nCity);
  var jsq = 0;
  chartData.height = [];
  chartData.x = [];
  //day
  if(pageState.nowGraTime == "day") {
    for(var d in aqiSourceData[nCity]) {
      chartData.height[jsq] = aqiSourceData[nCity][d];
      jsq++;//计数器
    }
    chartData.x = dayName;
    chartData.w = "5";
  }

  //week
  if(pageState.nowGraTime == "week") {
    var jsq = 0;//计数，用来判断sum叠加了多少次，以便求平均值
    var sum = 0;//求和
    var i = 0;//记录周数
    chartData.w = "30";
    //遍历，将数据汇总，直到当天是周日，则取平均值，添加进chart,并将sum,jsq归零，进行下一次循环
    for(var d in aqiSourceData[nCity]) {
        sum = sum + aqiSourceData[nCity][d];
        jsq++;
        //如果是星期天，则向chart推送平均值
        if((new Date(d)).getDay() == "6") {
          chartData.height[i] = parseInt(sum/jsq);
          chartData.x[i] = "第" + (i+1) + "周";
          i++;
          jsq = 0;
          sum = 0;
        }
    }
    if(jsq != 0) {
      chartData.height[i] = parseInt(sum/jsq);
      chartData.x[i] = "第" + (i+1) + "周";
    }
  }

  //month
  if(pageState.nowGraTime == "month") {
    var mon = 0;
    var sum = 0;
    var jsq = 0;
    chartData.w = "100";
    for(var d in aqiSourceData[nCity]) {
      //当前d的月份值与mon不相等时，则说明月份改变了，则向chartdata输入数据（截止到d的前一天的数据和）
      if((new Date(d)).getMonth() !== mon) {
        chartData.height[mon] = parseInt(sum/jsq);
        chartData.x[mon] = (mon+1) + "月";
        mon++;
        sum = 0;
        jsq = 0;
      }
      sum += aqiSourceData[nCity][d];
      jsq++;
    }
    //因为3月后无4月份的数据，即d的最后一个值是03-31,无法通过getMonth()判断，形成一个月份数据
    //即使3月份的天数不到，也可以求出平均值
    if(sum != 0) {
      chartData.height[mon] = parseInt(sum/jsq);
      chartData.x[mon] = (mon+1) + "月";
    }
  }

  // 处理好的数据存到 chartData 中
  return chartData;
}
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();