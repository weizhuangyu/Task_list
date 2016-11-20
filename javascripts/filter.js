app.filter('ownFilter',function () {
    return function(input,arg1,arg2){
        var temp = [];
        console.log(input) ;
        console.log( arg1==='') ;
        console.log('arg2:' + arg2) ;
        angular.forEach(input,function (item,index) {
            if(arg1===''){
                if(arg2 ===''||item.text.indexOf(arg2)>=0){
                    temp.push(item);
                }
            }
            if(item.status ===arg1.status&&item.text.indexOf(arg2)>=0){
                temp.push(item);
            }
        });
        return temp ;

    }
})