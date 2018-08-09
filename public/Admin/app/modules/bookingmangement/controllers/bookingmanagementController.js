'use strict';

angular.module('sbAdminApp')
  .controller('bookingManagementCtrl', function($scope,$position,$http,$modal) {
    var vm = this;
    vm.detailTab=false;
    vm.editTabactive=false;
    vm.activeuser=true;

  vm.showModal = function(obj,ev){
    var modalInstance = $modal.open({
       templateUrl: 'modules/usermanagement/views/userDetail.html',
       controller: 'ModalDialogController', 
       scope: $scope,
       resolve: {
         items: function () {
           return obj;
         }
       }
  })
     .result.then(
         function () {
         // alert("OK");
         }, 
         function () {
             //alert("Cancel");
         }
     );
  }
  
  $scope.totalItems = 0;
  vm.users2=[];
    vm.getbooking=function(currentPage){
         $http.get('/api/getBookings?pageNo='+currentPage)
        .then(function(data) {
            if (data) {
                vm.bookinglist=data.data.Bookings;
                $scope.totalItems=data.data.totalcount;
            }else{
              vm.message = data.data.message;
          }
        })
        .catch(function(data) {
            console.log('Error: ' + data);
        });
    }
    
    //vm.getusers();
     
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function(currentPage) {
        vm.getbooking(currentPage);
    };
    $scope.currentPage = 1;
    $scope.pageChanged($scope.currentPage);

    $scope.maxSize = 5;
    
    vm.addcat= function()
     {
        vm.arrayText.push({'catname':vm.catname,'description' : vm.description});
        vm.catname="";
        vm.description="";
    }
    vm.convertdate = function(date){
        return new Date(date);
    }
    vm.removeUser= function(userid)
    {
        vm.activeuserData={"_id":userid}
        $http.post('/api/removeUser',  vm.activeuserData)
        .then(function(data) {
            console.log('activeuser',data)
            if (data.created) {
            }else{
                vm.getusers();
          }
        })
        .catch(function(data) {
            console.log('Error: ' + data);
        });
    }

    vm.userdetail= function(item){
        vm.user=item;
        vm.detailTab=true;
        vm.disable=true;
    }
    vm.backTolist= function(){
        vm.detailTab=false;
        vm.updateinfo=false;
        vm.editTabactive=false;
        vm.getusers();
    }

    vm.editUserDetail =function(item)
    {
        vm.editTabactive=true;
        vm.detailTab=true;
        vm.disable=false;
        vm.user=item;   
    }
    vm.updateUserInfo= function(){
        $http.post('/api/updateUser',  vm.user)
        .then(function(data) {
            //  vm.category={};
            // if (data.created) {
            //     console.log('category Update successfully')
            // }else{
            //   vm.message = data.data.message;
            vm.updateinfo=true;
             // vm.backTolist();
              vm.updatebtn=false;
          // }
        })
        .catch(function(data) {
            console.log('Error: ' + data);
        });
    }
    vm.updateinfo=false;
    vm.activeuserCall=function(val,userid){
        vm.activeuser=!val;
        vm.activeuserData={"status":vm.activeuser,"userid":userid}
        $http.post('/api/active_inactive_a_user',  vm.activeuserData)
        .then(function(data) {
            console.log('activeuser',data)
            if (data.created) {
                // console.log('category Update successfully')
            }else{
                if(vm.activeuser){
                    vm.userActive=true;
                    vm.userInactive= false;
                }else{
                    vm.userInactive= true;
                    vm.userActive=false;
                }
                vm.getusers();
          }
        })
        .catch(function(data) {
            console.log('Error: ' + data);
        });
    }
    
  });
  angular.module('sbAdminApp').controller("ModalDialogController", function ($scope, $modalInstance, items) {
    $scope.user=items;
    $scope.disable=true;
    $scope.ok = function () {
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
  angular.module('sbAdminApp').directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}]);
angular.module('sbAdminApp')
  .directive('excelExport',
    function () {
      return {
        restrict: 'A',
        scope: {
        	fileName: "@",
            data: "&exportData"
        },
        replace: true,
        template: '<button class="btn btn-primary btn-ef btn-ef-3 btn-ef-3c mb-10" ng-click="download()">Export to Excel <i class="fa fa-download"></i></button>',
        link: function (scope, element) {
        	
        	scope.download = function() {

        		function datenum(v, date1904) {
            		if(date1904) v+=1462;
            		var epoch = Date.parse(v);
            		return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
            	};
            	
            	function getSheet(data, opts) {
            		var ws = {};
            		var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
            		for(var R = 0; R != data.length; ++R) {
            			for(var C = 0; C != data[R].length; ++C) {
            				if(range.s.r > R) range.s.r = R;
            				if(range.s.c > C) range.s.c = C;
            				if(range.e.r < R) range.e.r = R;
            				if(range.e.c < C) range.e.c = C;
            				var cell = {v: data[R][C] };
            				if(cell.v == null) continue;
            				var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
            				
            				if(typeof cell.v === 'number') cell.t = 'n';
            				else if(typeof cell.v === 'boolean') cell.t = 'b';
            				else if(cell.v instanceof Date) {
            					cell.t = 'n'; cell.z = XLSX.SSF._table[14];
            					cell.v = datenum(cell.v);
            				}
            				else cell.t = 's';
            				
            				ws[cell_ref] = cell;
            			}
            		}
            		if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
            		return ws;
            	};
            	
            	function Workbook() {
            		if(!(this instanceof Workbook)) return new Workbook();
            		this.SheetNames = [];
            		this.Sheets = {};
            	}
            	 
            	var wb = new Workbook(), ws = getSheet(scope.data());
            	/* add worksheet to workbook */
            	wb.SheetNames.push(scope.fileName);
            	wb.Sheets[scope.fileName] = ws;
            	var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});

            	function s2ab(s) {
            		var buf = new ArrayBuffer(s.length);
            		var view = new Uint8Array(buf);
            		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            		return buf;
            	}
            	
        		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), scope.fileName+'.xlsx');
        		
        	};
        
        }
      };
    }
 );