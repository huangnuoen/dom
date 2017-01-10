demo:
https://huangnuoen.github.io/dom/ife2--15/index.html


将一组<li>插入<ul>元素中：
 
方法一：   用for循环遍历，创建元素<li> 
 
           element.createElement("li")

           向<li>中添加内容

           li.innerHTML = 内容

           向<ul>插入<li>节点

           ul.appendChild(li)


方法二：1、创建新数组

        2、用for循环遍历，创建每一个li内容包括li标签
            
           text = "<li>……</li>"
         
           推送到新数组中

           newArray.push(text)

        3、循环结束，将数组用join()方法拼接成字符串

           newArray.join("")
             
           将该字符串用innerHTML写入<ul>中