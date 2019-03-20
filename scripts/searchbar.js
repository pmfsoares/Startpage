currEngine = 0;
//Engine list -- Use a link that includes the beginning of his query request at the end
engines=[
    {name:"Google", url:"https://www.google.pt/search?q=", ico:"styles/icons/google.png"},
    {name:"Duckduckgo", url:"https://duckduckgo.com/?q=", ico:"styles/icons/duckduckgo.png"},
    {name:"Wiki", url:"https://en.wikipedia.org/w/index.php?search=", ico:"styles/icons/wikipedia.png"},
    {name:"GitHub", url:"https://github.com/search?utf8=✓&q=", ico:"styles/icons/github.png"},
    {name:"ArchWiki", url:"https://wiki.archlinux.org/index.php?search=", ico:"styles/icons/Arch-linux.png"}
];
months=["January","February","March","April","May","June","July","August","September","October","November", "December"];

var links1, links2, links3;
links1 =[
    { name:"reddit", url:"https://www.reddit.com"},
    { name:"google", url:"https://www.google.com"},
];
links2 =[
    {name: "g", url:"https://www.4chan.org/g/catalog"},
    {name: "wg", url:"https://www.4chan.org/wg/catalog"},
    {name: "w", url:"https://www.4chan.org/w/catalog"}
];
links3 =[
    { name:"reddit", url:"https://www.reddit.com"},
    { name:"google", url:"https://www.google.com"},
];
//Update clock every 1/2 sec.
function startTime() {
    var today = new Date();
    var h = today.getHours();
    //(h < 20 && h > 8) ? $("body").css("background-color", "white") : $("body").css("background-color", "black");
    var m = today.getMinutes();
    var s = today.getSeconds();
    var month = today.getMonth();
    var weekDay = today.getDay();
    var day = today.getDate();
    if(m==0 && s==0)
        writeDate();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
//Return a properly formatted day number, like 1st, 3rd ...
function dayToString(day){
    switch(day){
        case 1:
        case 21:
        case 31:
            return day+"st";
        case 2:
            return day+"nd";
        case 3:
            return day+"rd";
        default:
            return day+"th";
    }
}
//Update the date every time you load/reload the page or after midnight
function writeDate() {
    MonthsArray=["January","February","March","April","May","June","July","August","September","October","November","December"];
    WeekdaysArray=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var today = new Date();
    var month = today.getMonth();
    month < 12 ? monthString = MonthsArray[month] : monthString = "Error in month conversion, number=" + month ;
    var weekDay = today.getDay();
    var WeekdayString;
    weekDay < 7 ? WeekdayString = WeekdaysArray[weekDay] : WeekdayString = "Error: weekDay number "+ today.getDay();
    var day = today.getDate();
    var year = today.getFullYear();
    document.getElementById("date").innerHTML = WeekdayString + ", " + dayToString(day) + " of " + monthString + ", " + year;
    var t = setTimeout(startTime, 500);
} 
// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}
//Update the current engine
function changeEngine(n){
    if(n<engines.length){
        $("#dropdown-btn").html(engines[n].name);
    }
    currEngine=n;
    setDefaultEngine(n, 30);
    $("#search-btn").empty();
    $("#search-btn").html($("#search-btn").html()+'<img src="'+engines[currEngine].ico+'"/>');
}
//Generate the dropdown list from the engines array
function generateEngines(){
    for(var i = 0; i < engines.length; i++){
        $("#engine-list").html($("#engine-list").html()+'<a class="dropdown-item" href="#" onclick="changeEngine('+i+')">'+engines[i].name+'</a>');
    }
}
function generateLinks(){
    for(var j = 1; j <= 3; j++){
        var temp;
        switch(j){
        case 1:
            temp = links1;
            break;
        case 2:
            temp = links2;
            break;
        case 3:
            temp = links3;
            break;
        }
        $(`#Table${j}`).empty();
        for(var i = 0; i < temp.length; i++){
            $(`#Table${j}`).html($(`#Table${j}`).html()+'<tr><td><a class="links" href=\"' + temp[i].url + '\">' + temp[i].name+'</a></td></tr>');
        }
    }
}
//Save an engine choice as a cookie
function setDefaultEngine(cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "defaultEngine=" + cvalue + ";" + expires + ";path=/";
}
//Get the last used engine from the cookies
function getDefaultEngine() {
    var name = "defaultEngine=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Open a new tab with the generated link
function newSearch(){
    var text=document.getElementById('SearchField').value;
    if(text.substring(0,1) == "!"){
        switch(text.substring(1,2)){
        case("1"):
            var ntext = text.replace(/![0-9]/gi, "");
            links1.push({name: `${ntext}`, url:"https://www.google.com"});
            generateLinks();
            break;
        case('2'):

            break;
        }
    }
    else{
        window.open(engines[currEngine].url+text,"_newtab");
    }
    document.getElementById('SearchField').value=''; 
}
















//Function executed after the loading of the page
$(document).ready(function(){
    startTime();
    document.getElementById("date") ? writeDate() : document.getElementById("SearchField").placeholder='Error getting "date"';
    generateEngines();
    generateLinks();
    var defEngine=getDefaultEngine();
    if(defEngine == "")
        changeEngine(0);
    else
        changeEngine(defEngine);
    //Allows to use return to start a new search
    if(document.getElementById('SearchField')){
    document.getElementById('SearchField').addEventListener("keydown", function(e) {
        switch(e.keyCode){
        case 13: //Enter
            document.getElementById("search-btn").click();
            break;
        }
    }, false);
     document.getElementById('SearchField').focus();
    }
    document.body.addEventListener("keydown", function(e){
        switch(e.keyCode){
        case 18: //alt
            RaiseEngine();
            break;
        }

    }, false);
});
function RaiseEngine(){
    if(currEngine == engines.length-1){
        currEngine = 0;
    }
    else if(currEngine < engines.length-1){
        currEngine++;
    }
    changeEngine(currEngine);
}
