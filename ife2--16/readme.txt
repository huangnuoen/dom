https://huangnuoen.github.io/dom/ife2--16/index.html

Q：input中的值更新后，aqiData对象中还会保留之前的值吗？

A：会。因为aqiData是全局对象，退出函数不会被销毁。

  并且 addAqiData函数是通过 aqiData[city] = value 的方式向该对象定义了一对属性和值，

  而city和value都是变量，即每次调用addAqiData函数的city和value都会更新，

  当再次通过addAqiData函数向对象定义属性和值时，由于对象中已经有一对属性值了，新增的这对会成为该对象的第二对属性值。

  
  PS：当新增的属性名与之前的属性名和重复的地方，则新增的属性值会替换掉原来的属性值

     （值可重复，属性名重复的话值会被更新）



Q：第二次调用renderAqiData()时，发生了什么？

A：此时，aqiData对象已经有2组属性值，

   执行renderAqiData()，items又被初始化,items = "<tr>...</tr>"

   for-in循环，items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td></tr>"

   此时，items = "<tr>...</tr><tr>...</tr><tr>...</tr>"

   for-in结束，使用innerHTML方法将items写入<table>,注意：
1、innerHTML用重写<table>,即原先标签内容将会被替换；
2、向<table>插入字符串时，需要先判断input中是否有内容，input有内容才插入items，没有内容则插入空字符串，避免在无输入时出现表头
   table.innerHTML = city ? items : "";


Q:验证输入值是否为整数有两种方式

A:方式一：使用正则表达式
          value.match(/\d+/)  判断结果是否存在
  方式二：使用parseInt()将输入值转为整数，再与原来的输入值比较
          value == parseInt(value)  判断结果是否存在