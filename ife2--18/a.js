//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

var container = document.getElementById("container");
var buttonList = document.getElementsByTagName("input");
var queue = {
    str: [],

    leftIn: function(num) {
        this.str.unshift(num);
        this.paint();
    },

    rightIn: function(num) {
        this.str.push(num);
        this.paint();
    },

    isEmpty: function() {
        return (this.str.length == 0);
    },

    leftOut: function(num) {
        if(!this.isEmpty()) {
            this.str.shift(num);
            this.paint();
        } else {
            alert("this is empty!");
        }
    },

    rightOut: function() {
        if(!this.isEmpty()) {
            this.str.pop();
            this.paint();
        } else {
            alert("this is empty!");
        }
    },

    paint: function() {
        var str = "";
        this.str.forEach(function(item,index,array) {
            str += '<div>' + parseInt(item) + '</div>';
        })
        container.innerHTML = str;
        addDivEvent();
    },

    deleteID: function(id) {
        console.log(id);
        this.str.splice(id,1);
        this.paint();
    }
};

buttonList[1].addEventListener('click',function() {
    var input = buttonList[0].value;
    if(input.match(/^\d+$/)) {
        queue.leftIn(input);
    }
});
buttonList[2].addEventListener('click',function() {
    var input = buttonList[0].value;
    if(input.match(/^\d+$/)) {
        queue.rightIn(input);
    }
});
buttonList[3].addEventListener('click',function() {
    queue.leftOut();
});
buttonList[4].addEventListener('click',function() {
    queue.rightOut();
});

function addDivEvent() {
   for(var i = 0; i < container.childNodes.length; i++) {
    container.childNodes[i].addEventListener('click', function(c) {
                return function(){
                    return queue.deleteID(c)
                };
        }(i));
    }
}
