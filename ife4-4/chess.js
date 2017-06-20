//前进
function go (direct) {
	var box = document.getElementById('box');
	var top = box.offsetTop;
	var left = box.offsetLeft;
	//判断方向,判断是否到边界，走势
	if (direct == 0 && top != 40) {//向上
		box.style.top =  top - 40 + 'px';
		console.log(box.style.top);
	} else if(direct == 1 && left != 400) {//右
		box.style.left = left + 40 + 'px';
	} else if(direct == 2 && top != 400) {//下
		box.style.top = top + 40 + 'px';
	} else if(direct == 3 && left != 40) {//左
		box.style.left = left - 40 + 'px';
	} else {
		alert('棋子已到边界！');
	}
}
var a = document.getElementById('a');
//a.onclick = go;
a.addEventListener('click', function(e){
	getOrder();
	e.preventDefault();//取消默认表单提交
} , false);

var direct = 0;//方向
/*//改变方向
//左转
var gLeft = function(d) {
	d = d > 0 ? (--d) : (d + 3);
	console.log(d);
	changeStyle(d);
}
//右转
var gRight = function(d) {
	d += 1;
	d = d < 4 ? d : (d%4);
	console.log(d);
	changeStyle(d);
}*/

//改变朝向
function changeStyle(d) {
	var box = document.getElementById('box');
	box.style.transform = 'rotate(0' + d * 90 + 'deg)';
}
//获取input值,并执行相应函数
function getOrder() {
	var order = document.getElementById('order');
	var val = order.value.toLowerCase();
	console.log(val);
	var box = document.getElementById('box');
	var top = box.offsetTop;
	var left = box.offsetLeft;
	switch(val) {
		case 'tra lef':
			box.style.left = (left > 40) ? (left - 40 + 'px') : (left + 'px');
			break;
		case 'tra top':
			box.style.top = (top > 40) ? (top - 40 + 'px') : (top + 'px');
			break;
		case 'tra rig':
			box.style.left = (left < 400) ? (left + 40 + 'px') : (left + 'px');
			break;
		case 'tra bot':
			box.style.top = (top < 400) ? (top + 40 + 'px') : (top + 'px');
			break;			
		case 'mov lef':
			changeStyle(3);
			setTimeout(function(){go(3)}, 1000);//设置定时器，以便看到先旋转再移动的过程
			break;
		case 'mov top':
			changeStyle(0);
			setTimeout(function(){go(0)}, 1000);
			break;
		case 'mov rig':
			changeStyle(1);
			setTimeout(function(){go(1)}, 1000);
			break;
		case 'mov bot':
			changeStyle(2);
			setTimeout(function(){go(2)}, 1000);
			break
	}
}
