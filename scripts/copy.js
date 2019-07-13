function openMenu(event, value) {
    var i, tabLinks;
    var tabContent = document.getElementsByClassName("tab-conten");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(value).style.display = "block";
    event.currentTarget.className += " active";
}

function App() {
    this.el = document.getElementById('tasks');
    this.tasks = ['Make admin menu', 'Make a to do list', 'Make a chart  weather',
        'Make user menu', 'Show users table', 'Table manipulation'];
    this.Count = function (data) {
        var counter = document.getElementById('counter');
        var name = 'task';
        if (data) {
            if (data > 0) {
                name = 'tasks';
            }
            counter.innerHTML = data + ' ' + name;
        } else {
            counter.innerHTML = 'No ' + name;
        }
    };
    this.Add = function () {
        var el = document.getElementById('add-task');
        var task = el.value;
        if (task) {
            this.tasks.push(task.trim());
            el.value = '';
            this.FetchAll();
        }
    };
    this.Edit = function (item) {
        var el = document.getElementById('edit-task');
        el.value = this.tasks[item];
        document.getElementById('spoiler').style.display = 'block';
        self = this;
        document.getElementById('saveEdit').onsubmit = function () {
            var task = el.value;
            if (task) {
                self.tasks.splice(item, 1, task.trim());
                self.FetchAll();
                CloseInput();
            }
        }
    };
    this.Delete = function (item) {
        this.tasks.splice(item, 1);
        this.FetchAll();
    };
    this.FetchAll = function () {
        var data = '';
        if (this.tasks.length > 0) {
            for (var i = 0; i < this.tasks.length; i++) {
                data += '<tr>';
                data += '<td>' + this.tasks[i] + '</td>';
                data += '<td><button onclick="this.Edit(' + i + ')">Edit</button></td>';
                data += '<td><button onclick="this.Delete(' + i + ')">Delete</button></td>';
                data += '</tr>';
            }
        }
        console.log(data);
        this.Count(this.tasks.length);
        return $('#counter').append(data);
    };
}

var app = new App();
app.FetchAll();

function CloseInput() {
    document.getElementById('spoiler').style.display = 'none';
}

function getValue() {
    var text = document.getElementById("input_form").value;
    $.ajax({
        type: 'GET',
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${text}&appid=8a55dbeaa5077499056294820c905628`,
        success: function (data) {
            var tempr = data;
            console.log(tempr.list[0].main);
            var myWeather = [
                {
                    "humidity": tempr.list[0].main.humidity,
                    "pressure": tempr.list[0].main.pressure,
                    "temp_max": tempr.list[0].main.temp_max,
                    "temp_min": tempr.list[0].main.temp_min
                }];
            var col = [];
            for (var i = 0; i < myWeather.length; i++) {
                for (var key in myWeather[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
            var table = document.createElement("table");
            var tr = table.insertRow(-1);
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");
                th.innerHTML = col[i];
                tr.appendChild(th);
            }
            for (var i = 0; i < myWeather.length; i++) {
                tr = table.insertRow(-1);
                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = myWeather[i][col[j]];
                }
            }
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
        }
    });
}

(function () {
    $.ajax({
        type: 'GET',
        url: "https://jsonplaceholder.typicode.com/users",
        success: function (data) {
            var users = data;
            console.log(users);
            for (var i = 0; i < users.length; i++) {
                for (var key in users[i]) {
                    $("table.table tbody").append("<tr id='myTr'>" +
                        "<p><td class='number'>" + users[i].id + "</td></p>" +
                        "<td colspan='1' class='name'>" + users[i].name + "</td>" +
                        "<td class='email'>" + users[i].email + "</td>" +
                        "<td class='phone'>" + users[i].phone + "</td>" +
                        "<td class='username'>" + users[i].username + "</td>" +
                        "<td class='website'>" + users[i].website + "</td>" +
                        "<td class='X'><button>Call remove()</button>" + "</td>" +
                        "</tr>");
                    break;
                }
                $('button').on('click', (function () {
                    $('p').remove()
                }))
            }
        }
    })
}());


// for (var i = 0; i < users.length; i++){
//     console.log("<br><br>array index: " + i);
//     var obj = users[i];
//     for (var key in obj){
//         var value = obj[key];
//         console.log("<br> - " + key + ": " + value);
//     }
// }


// (function() {
//     $.ajax({
//         type: 'GET',
//         url: "https://jsonplaceholder.typicode.com/users",
//         success: function (data) {
//             var users = data;
//             console.log(users);
//             var userProp = [
//                 {
//                     "Number": users[0].id,
//                     "Name": users[0].name,
//                     "Email": users[0].email,
//                     "Phone": users[0].phone,
//                     "Username": users[0].username,
//                     "Website": users[0].website
//                 }];
//             var col = [];
//             for (var i = 0; i < userProp.length; i++) {
//                 for (var key in userProp[i]) {
//                     if (col.indexOf(key) === -1) {
//                         col.push(key);
//                     }
//                 }
//             }
//             var table = document.createElement("table");
//             var tr = table.insertRow(-1);
//             for (var i = 0; i < col.length; i++) {
//                 var th = document.createElement("th");
//                 th.innerHTML = col[i];
//                 tr.appendChild(th);
//             }
//             for (var i = 0; i < userProp.length; i++) {
//                 tr = table.insertRow(-1);
//                 for (var j = 0; j < col.length; j++) {
//                     var tabCell = tr.insertCell(-1);
//                     tabCell.innerHTML = userProp[i][col[j]];
//                 }
//             }
//             var divContainer = document.getElementById("showTable");
//             divContainer.innerHTML = "";
//             divContainer.appendChild(table);
//         }
//     })
// } ());