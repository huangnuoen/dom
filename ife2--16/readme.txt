
Q：input中的值更新后，aqiData对象中还会保留之前的值吗？

A：会。因为aqiData是全局对象，退出函数不会被销毁。

  并且 addAqiData函数是通过 aqiData[city] = value 的方式向该对象定义了一对属性和值，

  而city和value都是变量，即每次调用addAqiData函数的city和value都会更新，

  当再次通过addAqiData函数向对象定义属性和值时，由于对象中已经有一对属性值了，新增的这对会成为该对象的第二对属性值。

  
  PS：当新增的属性名与之前的属性名和重复的地方，则新增的属性值会替换掉原来的属性值

     （值可重复，属性名重复的话值会被更新）