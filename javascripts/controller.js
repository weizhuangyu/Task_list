//控制器文件

// app.controller('parentCtrl',['$scope',function($scope){
//     $scope.$on('child2MessageChange',function(event, msg){
//         console.log(event, msg);
//         $scope.$broadcast("parentMessageChange", msg);
//     })
// }]);




app.controller("childCtrl1", ["$scope", "$filter", 'messageFactory', function($scope, $filter,messageFactory) {
    $scope.pageClass = 'page-home';
    //定义输入对象及其他
    $scope.message = {
        text: "",
        status: false,
        contentShow : false ,
        show: true ,
        description : ""
    };
    $scope.todolist = [];
    $scope.unfinNum = 0;
    $scope.filterData = "";
    $scope.boldflag = 1;
    $scope.checkAllShow = false;
    $scope.checkall = false;
    //本地存储：存储了todolist和unfinNum和checkAllShow
    var storage = {
        storagelist:localStorage.getItem("storagelist"),
        storagecheckAllShow:localStorage.getItem("storagecheckAllShow"),
        storageunfinNum:localStorage.getItem("storageunfinNum")
    };
    if(storage.storagelist){
        $scope.todolist = JSON.parse(storage.storagelist);
        $scope.checkAllShow = JSON.parse(storage.storagecheckAllShow);
        $scope.unfinNum = storage.storageunfinNum;
    }else{
        $scope.todolist = [];
        $scope.checkAllShow = false;
        $scope.unfinNum = 0;
    }
    function saveList () {
        localStorage.setItem("storagelist",JSON.stringify($scope.todolist));
        localStorage.setItem("storagecheckAllShow",JSON.stringify($scope.checkAllShow));
        localStorage.setItem("storageunfinNum",$scope.unfinNum);
    }

    // $scope.$on("parentMessageChange",
    //
    //     function (event, msg) {
    //         console.log("childCtr2", msg);
    //     });

    //输入事项后的事件
    $scope.messageKeyDown = function(e) {
        if (e.keyCode == 13 && $scope.message.text != "") {
            $scope.todolist.push($scope.message);
            $scope.message = {
                text: "",
                status: false,
                contentShow : false ,
                show: true
            };
            $scope.all();
            $scope.unfinNum = $filter("filter")($scope.todolist, { status: false }).length;
            $scope.checkall = false;
            $scope.checkAllShow = $scope.todolist.length > 2;
            saveList();

        } else if (e.keyCode == 13 && $scope.message.text == "") {
            alert ("请输入您的查询事项！");
        }
    };

    //鼠标悬停显示详细信息
    $scope.mouseover = function(todoitem){
        todoitem.contentShow = true ; 
    }
    //鼠标离开关闭详细信息
    $scope.mouseleave = function(todoitem){
        todoitem.contentShow = false ;
    }


    //点击列表中某一项
    $scope.todolistClick = function(todoitem) {
        todoitem.status = !todoitem.status;
        $scope.checkboxClick();
    };
    //点击某一项的多选按钮事件
    $scope.checkboxClick = function() {
        $scope.checkall=$scope.todolist.every(function(item){
            return !!item.status;
        });
        //检测未完成数量
        $scope.unfinNum = $filter("filter")($scope.todolist, { status: false }).length;
        saveList ();
    };
    //点击全选按钮事件
    $scope.checkAll = function() {
        if ($scope.checkall) {
            angular.forEach($scope.todolist, function(o) {
                o.status = true;
            })
        } else {
            angular.forEach($scope.todolist, function(o) {
                o.status = false;
            })
        }
        //检测未完成数量
        $scope.unfinNum = $filter("filter")($scope.todolist, { status: false }).length;
    };
    //点击all，completed,incompleted的事件
    $scope.all = function() {
        $scope.filterData = "";
        $scope.boldflag = 1;
    };
    $scope.completed = function() {
        $scope.filterData = { status: true };
        $scope.boldflag = 2;
    };
    $scope.incompleted = function() {

        $scope.filterData = { status: false };
        $scope.boldflag = 3;
    };
    //点击clear事件
    $scope.clearMousedown = function() {
        $scope.clearflag = true;
    };
    $scope.clearMouseup = function() {
        $scope.clearflag = false;

        for (var i = 0; i < $scope.todolist.length; i++) { // $scope.todolist.length 不能写死，因为length长度在变化
            if ($scope.todolist[i].status) {
                $scope.todolist.splice(i, 1);
                i--;
            }
        }
        $scope.checkAllShow = $scope.todolist.length > 2; //同理
        saveList();
        $scope.all();
    };

    //表单提交的数据
    if(messageFactory.service){
        $scope.todolist.push(messageFactory.service);
        $scope.all();
        $scope.unfinNum = $filter("filter")($scope.todolist, { status: false }).length;
        $scope.checkall = false;
        $scope.checkAllShow = $scope.todolist.length > 2;
        saveList();
    }
}]);




app.controller('childCtrl2',['$scope','$location','messageFactory',function($scope,$location,messageFactory){
    $scope.pageClass = 'page-add';

    $scope.message = {
        text: "",
        status: false,
        contentShow : false,
        show: true,
        description : ""
    };
    $scope.submit = function() {
        if ($scope.message.text != "") {
            // console.log("message", $scope.message);
            // $scope.$emit("child2MessageChange", $scope.message);
            messageFactory.service = $scope.message ;
            console.log(messageFactory);
            $scope.message = {
                text: "",
                status: false,
                contentShow : false,
                show: true,
                description : ""
            };
            // $scope.all();
            // $scope.unfinNum = $filter("filter")($scope.todolist, { status: false }).length;
            // $scope.checkall = false;
            // $scope.checkAllShow = $scope.todolist.length > 2;
            // saveList();
            $location.path('/');

        }else if ( $scope.message.text == "") {
            alert ("请添加您的日程安排！");
        }
    };
    $scope.cancel = function(){
        $location.path('/');
    }
}])