function expand(id) {
    var charts = document.getElementsByClassName("chart-container"); // Gets all the charts
    for(var i = 0; i < document.getElementsByClassName("expandIcon").length; i++) {
        if(charts[i].id == id ) {
            document.getElementsByClassName("expandIcon")[i].style.display = "none";
            document.getElementsByClassName("minimizeIcon")[i].style.display = "block";
            document.getElementById("chart-containers").className = "fullScreen";
            continue;
        }
        document.getElementById("chart-containers").className = "fullScreen";
        charts[i].style.display = 'none';
    }
}

function minimize() {
    var charts = document.getElementsByClassName("chart-container");
    document.getElementById("chart-containers").className = "normal";
    for(var i = 0; i < document.getElementsByClassName("minimizeIcon").length; i++) {
        charts[i].style.display = 'grid';
        document.getElementsByClassName("expandIcon")[i].style.display = "block";
        document.getElementsByClassName("minimizeIcon")[i].style.display = "none";
    }
}