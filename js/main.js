var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var container = [];


function validateName() {
    var nameRegex = /^[A-Za-z_]+$/;
    return nameRegex.test(siteName.value);
}



function validateUrl() {
    var nameRegex = /^(https:\/\/www\.)\S+\.com$/;
    return nameRegex.test(siteUrl.value);
}




if (localStorage.getItem("sitesContainer")) {
    container = JSON.parse(localStorage.getItem("sitesContainer"));
    display();
}
function add() {
    if (validateName() && validateUrl()) {
        var box = {
            name: siteName.value,
            link: siteUrl.value
        };
        container.push(box);
        saveToLocalStorage();
        clear();
        display();
    } else {
        alert("Please enter a valid name and URL.");
        // or display an error message in the UI
    }
}



function clear() {
    siteName.value = '';
    siteUrl.value = '';
}

function saveToLocalStorage() {
    localStorage.setItem("sitesContainer", JSON.stringify(container));
}

function display() {
    var cartona = '';
    for (var i = 0; i < container.length; i++) {
        cartona += `<tr>   
        <td>${i + 1}</td>
        <td>${container[i].name}</td>
        <td><button onclick="visit('${container[i].link}');" class="btn btn-outline-primary">Visit</button></td>
        <td><button onclick="Delete(${i});" class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function Delete(index) {
    container.splice(index, 1);
    saveToLocalStorage();
    display();
}

function visit(link) {
    window.open(link, "_blank");
}
