$(document).ready(function(){
    $("#btnStart").click(function(){
        function getWeatherData() {
            var eventSource = new EventSource("http://localhost:8080/stream/weather");
            eventSource.onmessage = e => {
                var result = JSON.parse(e.data);
                console.log(result);
            }
        }

        getWeatherData();
    });
})
