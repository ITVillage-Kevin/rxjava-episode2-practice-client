$(document).ready(function(){
    let eventSource = null;

    $("#btnStart").click(function(){

        getWeatherData();
        function getWeatherData() {
            eventSource = new EventSource("http://localhost:8080/stream/weather");

            eventSource.onopen = ev => {
                $("#data-area").empty();
                $("#btnStart").attr("disabled", true);
                $("#btnStop").attr("disabled", false);
            }

            eventSource.onmessage = e => {
                var result = JSON.parse(e.data);

                var temperature = result.temperature.value;
                var humidity = result.humidity.value;
                $("#data-area").append("<div>온도: " + temperature + ", 습도: " + humidity + "</div>");
            }

            eventSource.onerror = error => {
                if (error) {
                    alert("연결이 되지 않습니다. 잠시 뒤 다시 시도해주세요");
                    eventSource.close();
                }
            }
        }
    });

    $("#btnStop").click(function () {
        eventSource.close();
        $("#btnStart").attr("disabled", false);
        $("#btnStop").attr("disabled", true);
    });
})
