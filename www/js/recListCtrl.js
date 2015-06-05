angular.module("app.controllers")
    .controller('recList', function ($scope, $localStorage) {
        $scope.active = false;
        $scope.items = $localStorage.getArr("recArr");
        $scope.items.reverse();

        var mediaPlay, mediaTimer, totalDuration, currentPosition = 0, isPaused = false, seek, firsTime = true;
        //select item
        $scope.selectItem = function (item) {
            $scope.items.forEach(function (v) {
                if (v.title == item.title) {
                    $scope.currentItem = v;
                    firsTime = true;
                    //window.plugins.toast.showShortBottom(JSON.stringify($scope.currentItem));
                }
            })
        };
        //select first
        $scope.selectItem($scope.items[0]);
        $scope.active = false;
        $scope.play = function () {
            if (!$scope.active) {
                if (firsTime) {
                    firsTime = false;
                    mediaPlay = new Media(
                        $scope.currentItem.path,
                        function () {
                            $scope.active = false;
                            $scope.$digest();
                            window.plugins.toast.showShortBottom('Playing Ended', null, null);
                        },
                        function (err) {
                            alert("playing error:" + JSON.stringify(err.code));
                        });
                    totalDuration = Number($scope.currentItem.duration.split(":")[1]) + Number($scope.currentItem.duration.split(":")[0]) * 60;
                }
                $scope.active = true;
                mediaPlay.play();
                //alert(totalDuration);
                mediaTimer = setInterval(function () {
                    mediaPlay.getCurrentPosition(
                        function (position) {
                            if (position < 0) {
                                clearInterval(mediaTimer);
                            }
                            else {
                                seek = Math.round(position);
                                $scope.currentPosition = (Math.round(position) / totalDuration) * 100;
                                $scope.$digest();
                                //currentPosition+=position;
                                //if(Math.round(position) == totalDuration)
                                /*if(Math.round(position)==totalDuration){
                                 $scope.active=false;
                                 $scope.$digest();
                                 }*/
                                //else{
                                //}
                                /*if (position == totalDuration)
                                 clearInterval(mediaTimer);
                                 else{
                                 window.plugins.toast.showShortBottom(position, null, null);
                                 $scope.currentPosition = (position / totalDuration) * 100;
                                 }*/
                                //$scope.$digest();
                            }
                        },
                        function (err) {
                            alert("Error getting pos=" + err.code);
                        }
                    );

                }, 1000);
            }
            else {
                mediaPlay.pause();
                mediaPlay.seekTo(seek * 1000);
                //window.plugins.toast.showShortBottom(seek,null,null);
                $scope.active = false;
                $scope.$digest();
                //isPaused=true;
            }
        };
        $scope.deleteItem = function () {
            $scope.deletedItem = $scope.currentItem;
            $scope.items.forEach(function (v, i) {
                if (v == $scope.currentItem) {
                    $scope.items.splice(i, 1);
                    if ($scope.items == []) {
                        $scope.noData = true;
                    }
                    setTimeout(function () {
                        if (i == 0) {
                            $scope.selectItem($scope.items[i]);
                        }
                        else {
                            $scope.selectItem($scope.items[i - 1]);
                        }
                    }, 1)
                }
            })
        };
    });