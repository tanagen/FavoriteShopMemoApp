"use strict";
function initMap() {
    // サーバーからhiddenのdivタグに渡した緯度経度情報を変数に格納
    let latlng = document.getElementById("latlng").innerHTML;
    let latlngJSON = JSON.parse(latlng);
    // 地図の中心値
    let center = new google.maps.LatLng(latlngJSON.lat, latlngJSON.lng);
    let map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 15,
        marker: center,
    });
    let name = document.getElementById("name").innerHTML;
    let marker = new google.maps.Marker({
        position: center,
        map: map,
        title: name,
    });
    marker.setMap(map);
}
window.initMap = initMap;
