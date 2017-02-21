//验证
function transValue(input) {
	if(!(input.value)) {
		alert("请输入10-100之间的整数");
	}
	var result = parseInt(input.value.replace(/\D/g,""),10);
	if(result > 100 || result < 10) {
		alert("请输入10-100之间的整数");
		input.value = "";
		return false;
	}
	return result;
}
//left in
function leftIn() {
	var input = document.getElementsByTagName('input')[0];
	var quene = document.getElementById('result');
	var oldEle = document.getElementsByTagName('li')[0];
	var newEle = document.createElement('li');
	var temp;
	if(!(temp = transValue(input))) {
		return false;
	};
	newEle.style.height = temp + "px";
	if(quene.children.length >= 60) {
		alert("队列已满");
	} else if(!oldEle) {
		quene.appendChild(newEle);
	} else {
		quene.insertBefore(newEle,oldEle);
	}
	input.value = "";
}
//right in
function rightIn(input) {
	var quene = document.getElementById('result');
	var input = document.getElementsByTagName('input')[0];
	var newEle = document.createElement('li');
	var temp;
	if(!(temp = transValue(input))) {
		return false;
	};
	newEle.style.height = temp + "px";
	if(quene.children.length >= 60) {
		alert("队列已满");
	} else {
		quene.appendChild(newEle);
	}
	input.value = "";
}
//left out
function leftOut() {
	var quene = document.getElementById('result');
	if(!(quene.firstChild)) {
		alert("队列为空");
	} else {
		alert(quene.firstChild.offsetHeight);//只读高度
		quene.removeChild(quene.firstChild);
	}
}
//right out
function rightOut() {
	var quene = document.getElementById('result');
	if (!(quene.lastChild)) {
		alert("队列为空");
	} else {
		alert(quene.lastChild.offsetHeight);
		quene.removeChild(quene.lastChild);
	}
}
//mess
//sort
function bubbleSort() {
	var quene = document.getElementById('result');
	var li = quene.getElementsByTagName('li');
	var len = li.length,
		i,
		temp,
		j;
	var time = function() {
		for(i = len - 1; i > 0; i--) {
			for(j = 0; j < i; j++) {
				if(li[j].offsetHeight > li[j+1].offsetHeight) {
					temp = li[j].offsetHeight;
					li[j].style.height = li[j+1].offsetHeight + "px";
					li[j+1].style.height = temp + "px";
				}
			}
		}
	};
	setInterval(time,2000);
}
//quene
function deleteEle(event) {
	var quene = document.getElementById('result');
	alert(event.offsetHeight);
	quene.removeChild(event);
}
//绑定事件
document.getElementById('lin').addEventListener("click",leftIn);
document.getElementById('rin').addEventListener("click",rightIn);
document.getElementById('lout').addEventListener("click",leftOut);
document.getElementById('rout').addEventListener("click",rightOut);
document.getElementById('result').addEventListener("click",function(event) {
	if(event.target.nodeName == "LI") {
		deleteEle(event.target);
	}
});
document.getElementById('sort').addEventListener("click",bubbleSort);
