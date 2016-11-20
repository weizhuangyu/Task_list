//取消双击出现的蓝条
app.directive("form", function() {
    return {
        restrict: "AE",
        link: function() {
            document.onselectstart = function() {
                return false;
            };
        }
    }
});

//绑定事件
app.directive("spanFocus", function() {
    return {
        restrict: "AE",
        link: function(scope, element) {
            element[0].addEventListener("dblclick", function() {
                var index = element.attr("span-index");
                var todoitem = scope.todolist[index];
                todoitem.show = false;
                scope.$apply();
                element.parent().children()[2].focus();
            });
        }
    }
});

app.directive("inputFocus", function() {
    return {
        restrict: "AE",
        link: function(scope, element) {
            element[0].addEventListener("keydown", function(e) {
                var index = element.attr("data-index");
                var todoitem = scope.todolist[index];
                if (e.keyCode == 13 && todoitem.text != "") {
                    todoitem.show = true;
                    scope.$apply();
                } else if (e.keyCode == 13 && todoitem.text == "") {
                    alert("必须要有输入值！");
                    element[0].focus();
                }
            });
            element[0].addEventListener("blur", function() {
                var index = element.attr("data-index");
                var todoitem = scope.todolist[index];
                if (todoitem.text != "") {
                    todoitem.show = true;
                    scope.$apply();
                } else if (todoitem.text == "") {
                    alert("必须要有输入值！");
                    element[0].focus();
                }
            });
        }
    }
});
