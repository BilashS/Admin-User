function openMenu(event, value) {
    var tabContent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    var tabLinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(value).style.display = "block";
    event.currentTarget.className += " active";
}

var app = new function () {
    this.el = document.getElementById('tasks');
    this.tasks = ['Make admin menu', 'Make a to do list', 'Make a chart  weather',
        'Make user menu', 'Show users table', 'Table manipulation'];
    this.Count = function (data) {
        var counter = document.getElementById('counter');
        var name = 'task';
        if (data) {
            if (data > 1) {
                name = 'tasks';
            }
            counter.innerHTML = data + ' ' + name;
        } else {
            counter.innerHTML = 'No ' + name;
        }
    };

    this.FetchAll = function () {
        var data = '';
        if (this.tasks.length > 0) {
            for (var i = 0; i < this.tasks.length; i++) {
                data += '<tr>';
                data += '<td>' + this.tasks[i] + '</td>';
                data += '<td><button onclick="app.Edit(' + i + ')">Edit</button></td>';
                data += '<td><button onclick="app.Delete(' + i + ')">Delete</button></td>';
                data += '</tr>';

            }
        }
        this.Count(this.tasks.length);
        this.el.innerHTML = data;
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

};

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
            for (var user of users) {
                $("table.table tbody").append("<tr id='myTr' class=" + 'user-' + user.id + ">" +
                    "<td class='number'>" + user.id + "</td>" +
                    "<td colspan='1' class='name'>" + user.name + "</td>" +
                    "<td class='email'>" + user.email + "</td>" +
                    "<td class='phone'>" + user.phone + "</td>" +
                    "<td class='username'>" + user.username + "</td>" +
                    "<td class='website'>" + user.website + "</td>" +
                    "<td><button class='user-record'>Remove</button>" + "</td>" +
                    "</tr>");
            }
            $('.user-record').on('click', (function (event) {
                console.log(event);
                event.stopPropagation();
                $('.' + event.currentTarget.parentNode.parentNode.className).remove();
            }))

        }
    })
}());
