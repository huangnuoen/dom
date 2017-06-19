//前进
function go () {
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
	go();
	e.preventDefault();//取消默认表单提交
} , false);

var direct = 0;//方向
//改变方向
function changeDirect() {
	var b = document.getElementById('b');
	b.onclick = function() {
		direct = direct > 0 ? (--direct) : (direct + 3);
		console.log(direct);
		changeStyle(direct);
		return false;
	}
	var c = document.getElementById('c');
	c.onclick = function() {
		direct += 1;
		direct = direct < 4 ? direct : (direct%4);
		console.log(direct);
		changeStyle(direct);
		return false;
	}
}
//改变朝向
function changeStyle(d) {
	var box = document.getElementById('box');
	box.style.transform = 'rotate(0' + d * 90 + 'deg)';
}
changeDirect();
