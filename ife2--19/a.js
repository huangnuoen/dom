var arr = [];
var snapshots = [];
var timer;

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
	arr.unshift(temp);
	newEle.style.height = temp * 5 + "px";
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
	arr.push(temp);
	newEle.style.height = temp * 5 + "px";
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
		arr.shift();
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
		arr.pop();
	}
}
//mess
//可视化排序
	//排序函数，记录每次变化的快照
function bubbleSort(arr) {
	var quene = document.getElementById('result');
	var lis = quene.getElementsByTagName('li');
	var len = arr.length,
		i,
		temp,
		j;
	
	for(i = len - 1; i > 0; i--) {
		for(j = 0; j < i; j++) {
			if(arr[j] > arr[j+1]) {
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
				snapshots.push(JSON.parse(JSON.stringify(arr)));
			}
		}
	}
	return arr;
}

//绘图
function painting() {
	var container = document.getElementById("result");
	var lis = [].slice.call(document.getElementsByTagName("li"));//array.prototype.slice能将具有length属性的对象转化为数组，让参数可以使用slice方法
	for(var i = 0; i < lis.length; i++) {
		if(lis.length != arr.length) {
			var aLi = document.createElement("li");
			container.appendChild(aLi);
		} else {
			break;
		}
	}
	var snapshot = snapshots.shift() || [];//移除第一条记录并取得该条记录
	console.log(snapshot);
	if(snapshot.length != 0) {
		for(var i=0; i<lis.length; i++){
			lis[i].style.height = snapshot[i] * 5 + "px";

		} 
	} else {
			clearInterval(timer);//如何在排序完成后停止
			return;
	}
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
document.getElementById('sort').addEventListener("click",function() {
	bubbleSort(arr);//返回排序好arr数组
	timer = setInterval(painting, 500);
});
