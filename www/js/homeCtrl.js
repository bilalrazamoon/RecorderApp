angular.module("app.controllers")
    .controller('home', function ($scope, $state, $localStorage) {
        $scope.items = $localStorage.getArr("recArr");
        var start = new Date().getTime();
        var mediaRec, t, no, url;
        $scope.timer = "00:00:00";
        $scope.active = false;
        $scope.rec = function () {
            if (!$scope.active) {
                //window.plugins.toast.showShortBottom("run active", null, null);
                $scope.active = true;
                //alert(JSON.stringify($scope.items));
                no = $scope.items && $scope.items.length > 1 ? "(" + (1 + Number($scope.items[$scope.items.length - 1].title.split("(")[1].slice(0, -1))) + ")" : "";
                //alert(no);
                //window.plugins.toast.showShortBottom("initializing media", null, null);
                //window.plugins.toast.showShortBottom(cordova.file.externalRootDirectory, null, null);
                url = cordova.file.externalApplicationStorageDirectory + "/files/recording" + no + ".mp3";
                mediaRec = new Media(
                    url,
                    function (res) {
                        window.plugins.toast.showShortBottom('Recording Completed', null, null);
                        $scope.active = false;
                        $scope.$digest();
                        //$state.go('recList');
                    },
                    function (err) {
                        alert("recording error:" + JSON.stringify(err.code));
                    });
                //window.plugins.toast.showShortBottom("Start media", null, null);
                mediaRec.startRecord();
                window.plugins.toast.showShortBottom('Recording Started', null, null);
                //timer
                var start = new Date().getTime();
                var ss = 0, mm = 0, hh = 0;

                function getZero(v) {
                    v = v.toString();
                    return (v.length == 1 ? "0" : "") + v
                }

                t = setInterval(function () {
                    ss++;
                    if (ss >= 60) {
                        mm++;
                        ss = 0;
                    }
                    if (mm >= 60) {
                        hh++;
                        mm = 0;
                    }
                    $scope.timer = getZero(hh) + ":" + getZero(mm) + ":" + getZero(ss);
                    $scope.$digest();
                    console.log($scope.timer);
                }, 1000);
            }
            else {
                mediaRec.stopRecord();
                clearInterval(t);
                var d = new Date();
                var date = getZero(d.getDate()) + "/" + getZero(d.getMonth()) + "/" + d.getFullYear() + " " + getZero(d.getHours()) + ":" + getZero(d.getSeconds());
                $scope.items.push({title: "Reccording " + no, date: date, duration: $scope.timer.slice(3), path: url});
                $localStorage.setArr("recArr", $scope.items);
                //alert(JSON.stringify($localStorage.getArr("recArr")[$localStorage.getArr("recArr").length-1]));
            }
        };
    });