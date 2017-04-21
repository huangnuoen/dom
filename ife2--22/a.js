var root = document.getElementById('root'),
	divList = [],
	timer = null;
//先序
function preOrder (node) {
	if(!(node == null)) {
		divList.push(node);//根
		preOrder(node.firstElementChild);//再次调用该函数，推入根的第一子节点，循环调用直到无子节点，退出执行下一条函数
		preOrder(node.lastElementChild);
	}
	return;
}
//中序
function inOrder (node) {
	if(!(node == null)) {
		inOrder(node.firstElementChild);//一直调用该函数，直至找到最后一个节点
		divList.push(node);//将节点推入
		inOrder(node.lastElementChild);
	}
}
//后序
function postOrder (node) {
	if(!(node == null)) {
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		divList.push(node);		
	}
}
//绑定事件
var btn = document.getElementsByTagName('button');
btn[0].addEventListener('click', function() {
	reset();
	preOrder(root);
	render();
}, false);
btn[1].addEventListener('click', function() {
	reset();
	inOrder(root);
	render();
}, false);
btn[2].addEventListener('click', function(){
	reset();
	postOrder(root);
	render();
}, false);
//重置样式
function reset () {
	divList = [];
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.backgroundColor = "#fff";
	};
}
//渲染
function render () {
	var i = 0;
	divList[i].style.backgroundColor = "#e32";
	timer = setInterval(function(a) {
		i++;
		if(i < divList.length) {
			divList[i-1].style.backgroundColor = "#fff";
			divList[i].style.backgroundColor = "#e32";
		} else {
			clearInterval(timer);
			divList[divList.length-1].style = "#fff";
		}
	}, 500);
}