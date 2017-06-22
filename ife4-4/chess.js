function Chess(box) {
	this.box = box;
	this.direct = 0;
	this.setTime = 500;
	this.init();
}
Chess.prototype = {
	init: function(){
		var self = this;//指向aChess
		document.getElementById('a').addEventListener('click',function(e){
			self.getOrder();
			e.preventDefault();
		}, false);
	},
	getOrder: function(){
		var order = document.getElementById('order');
		var val = order.value.toLowerCase();
		console.log(val);
		var top = this.box.offsetTop;
		var left = this.box.offsetLeft;
		var self = this;
		switch(val) {
			case 'tra lef':
				this.box.style.left = (left > 40) ? (left - 40 + 'px') : (left + 'px');
				break;
			case 'tra top':
				this.box.style.top = (top > 40) ? (top - 40 + 'px') : (top + 'px');
				break;
			case 'tra rig':
				this.box.style.left = (left < 400) ? (left + 40 + 'px') : (left + 'px');
				break;
			case 'tra bot':
				this.box.style.top = (top < 400) ? (top + 40 + 'px') : (top + 'px');
				break;			
			case 'mov lef':
				this.changeStyle(3);
				setTimeout(function(){self.go(3)}, self.setTime);//设置定时器，以便看到先旋转再移动的过程;setTimeout是下全局下调用的
				break;
			case 'mov top':
				this.changeStyle(0);
				setTimeout(function(){self.go(0)}, self.setTime);
				break;
			case 'mov rig':
				this.changeStyle(1);
				setTimeout(function(){self.go(1)}, self.setTime);
				break;
			case 'mov bot':
				this.changeStyle(2);
				setTimeout(function(){self.go(2)}, self.setTime);
				break;
		}
	},
	go: function(direct){
		var top = this.box.offsetTop;
		var left = this.box.offsetLeft;
		//判断方向,判断是否到边界，走势
		if (direct == 0 && top != 40) {//向上
			this.box.style.top =  top - 40 + 'px';
			console.log(this.box.style.top);
		} else if(direct == 1 && left != 400) {//右
			this.box.style.left = left + 40 + 'px';
		} else if(direct == 2 && top != 400) {//下
			this.box.style.top = top + 40 + 'px';
		} else if(direct == 3 && left != 40) {//左
			this.box.style.left = left - 40 + 'px';
		} else {
			alert('棋子已到边界！');
		}
	},
	changeStyle: function (d) {
		this.box.style.transform = 'rotate(0' + d * 90 + 'deg)';
	},
};
var aChess = new Chess(document.getElementById('box'));
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


