二叉树遍历

1、先序遍历（根左右）
function preOrder (node) {
	if(!(node == null)) {
		divList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}
中序遍历（左根右）
function inOrder (node) {
	if(!(node == null)) {
		inOrder(node.firstElementChild);//一直调用该函数，直至找到最后一个节点
		divList.push(node);//将节点推入
		inOrder(node.lastElementChild);
	}
}
后序遍历（左右根）
function postOrder (node) {
	if(!(node == null)) {
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		divList.push(node);		
	}
}