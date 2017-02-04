demo:
https://huangnuoen.github.io/dom/ife2--17/index.html

思路：
执行initGratimeform()
当input[i]点击时，pagestate.nowgratime不变，退出
执行initaqiChartData(),根据pagestate的nowgratime和nowselectcity处理原始数据，形成chartData{}
执行renderChart(),渲染图表


Q:为什么要在graTimeChange（）中调用initAqichartData()?
A:因为initAqiChartData()是根据当前的城市和当前时间粒度，处理原始数据；如果不在graTimeChange中调用，只在init中调用的话，只会在刚开始时执行，必须在graTimeChange中的监听后调用，以便当时间或地点变化后马上重新形成chartData{}

