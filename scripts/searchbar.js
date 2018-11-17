currEngine = 0;
//Engine list -- Use a link that includes the beginning of his query request at the end
engines=[
    {name:"Google", url:"https://www.google.pt/search?q="},
    {name:"DuckDuckGo", url:"https://duckduckgo.com/?q="},
    {name:"Wikipedia", url:"https://en.wikipedia.org/w/index.php?search="},
    {name:"GitHub", url:"https://github.com/search?utf8=✓&q="},
    {name:"ArchWiki", url:"https://wiki.archlinux.org/index.php?search="}
];
months=["January","February","March","April","May","June","July","August","September","October","November", "December"]
//Update clock every 1/2 sec.
function startTime() {
    var today = new Date();
    var h = today.getHours();
    (h < 20 && h > 8) ? $("body").css("background-color", "white") : $("body").css("background-color", "black");
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
    document.getElementById('search-btn').innerHTML=engines[currEngine].name;
}
//Generate the dropdown list from the engines array
function generateEngines(){
    for(var i = 0; i < engines.length; i++){
        $("#engine-list").html($("#engine-list").html()+'<a class="dropdown-item" href="#" onclick="changeEngine('+i+')">'+engines[i].name+'</a>');
    }
}

links1=[
    { name:"reddit", url:"reddit.com"},
    { name:"google", url:"google.com"},
    { name:"4chan", url:"4chan.org"},
    { name:"ArchWiki", url:"archwiki.org"}
      ];

function generateLinks(){
    for(var i = 0; i < links1.length; i++){
     $("#TableOne").html($("#TableOne").html()+'<tr><td><a class="links" href=\"' + links1[i].url + '\">' + links1[i].name+'</a></td></tr>');
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
    window.open(engines[currEngine].url+document.getElementById('SearchField').value,"_newtab");
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
        if (e.keyCode == 13 || e.which == 13) { document.getElementById("search-btn").click() }
    }, false);
     document.getElementById('SearchField').focus();
    }
});
