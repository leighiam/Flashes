var count = 1
			
var countMax = 23

function nextMsg() {
    if(count > countMax)
        return;
    element = document.getElementById('msg' + count + '');
    element.classList.remove("hidden-msg");
    element.classList.add("visible-msg");
    if(count == 15)
        getNotif();
    count++;
}

function nextMsg2() {
    if(count > countMax)
        return;
    element = document.getElementById('msg' + count + '');
    element.classList.remove("hidden-msg");
    element.classList.add("visible-msg");
    element1 = document.getElementById('con' + count + '');
    element1.classList.remove("hidden-msg");
    element1.classList.add("visible-msg");
    element2 = document.getElementById('date' + count + '');
    element2.classList.remove("hidden-msg");
    element2.classList.add("visible-msg");
    if(count == 8)
        getNotif();
    count++;
}

function nextMsg3() {
    if(count > countMax)
        return;
    element = document.getElementById('msg' + count + '');
    element.classList.remove("hidden-msg");
    element.classList.add("visible-msg");
    if(count == 3)
        getNotif();
    count++;
}

function nextMsg4() {
    if(count > countMax)
        return;
    element = document.getElementById('msg' + count + '');
    element.classList.remove("hidden-msg");
    element.classList.add("visible-msg");
    if(count == 14)
        getNotif();
    count++;
}

function nextMsg5() {
    if(count > countMax)
        return;
    element = document.getElementById('msg' + count + '');
    element.classList.remove("hidden-msg");
    element.classList.add("visible-msg");
    if(count == 12)
        getNotif();
    count++;
}

function nextMsg6() {
    if(count > countMax)
        return;
    element = document.getElementById('msg' + count + '');
    element.classList.remove("hidden-msg");
    element.classList.add("visible-msg");
    if(count == 23)
        getNotif();
    count++;
}

function getNotif() {
    //var element = document.getElementById("notif");
    var element2 = document.getElementById("network");
    var element3 = document.getElementById("contact");
    /*var element4 = document.getElementById("pro-pic");
    var element5 = document.getElementById("p");*/
    var element6 = document.getElementById("head");
    var element7 = document.getElementById("x");
    /*element5.classList.remove("p");
    element5.classList.add("p-1");
    element.classList.remove("time");
    element.classList.add("notif");
    element2.classList.remove("network");
    element2.classList.add("network-2");
    element3.classList.remove("contact");
    element3.classList.add("contact-2");
    element4.classList.remove("pro-pic");
    element4.classList.add("pro-pic-2");
    element.innerHTML = "Notification";*/
    console.log("success");
    element2.classList.add("p-1");
    element3.classList.add("p-1");
    element6.classList.remove("p-1");
    element6.classList.add("visible-msg");
    element7.classList.remove("p-1");
}