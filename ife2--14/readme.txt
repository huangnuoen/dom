demo:https://huangnuoen.github.io/dom/ife2--14/index.html

向文档中插入新创建元素：
element.appendChild(newNode);

向元素中插入文本有2种方式：
1、使用document.createTextNode(text),创建文本节点
   再用appendChild()方法，将新建的文本节点插入到元素中

2、直接用element.innerHTML = "文本内容";向元素节点中插入文本