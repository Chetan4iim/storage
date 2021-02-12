var data = [];
var isEdit = false;
var selectedRow;



function onSubmit() {
    let name = document.getElementById("name").value;
    let phn = document.getElementById("phn").value;
    let dob = document.getElementById("dob").value;
    let city = document.getElementById("city").value;
    let gender = document.querySelector("input[name='gender']:checked").value;
    let commodities = document.querySelectorAll("input[name='commodity']:checked");
    let selCom = [];
    for (let i = 0; i < commodities.length; i++) {
        selCom.push(commodities[i].value);
    }
    let age = calcAge(dob);
    let car = selCom.indexOf("Car") == -1 ? "No" : "Yes";
    let bike = selCom.indexOf("Bike") == -1 ? "No" : "Yes";
    let mobile = selCom.indexOf("Mobile") == -1 ? "No" : "Yes";
    let laptop = selCom.indexOf("Laptop") == -1 ? "No" : "Yes";

    let obj = {
        name: name,
        phn: phn,
        dob: dob.split("-").reverse().join("/"),
        city: city,
        gender: gender,
        age: age,
        car: car,
        bike: bike,
        mobile: mobile,
        laptop: laptop
    }
    isEdit?(data[selectedRow - 1] = obj):data.push(obj);
    loopingArray();
}


function loopingArray() {
    let table = document.getElementById("tbl");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        let tRow = `<tr>
        <td>${i + 1}</td>
        <td>${obj.name}</td>
        <td>${obj.phn}</td>
        <td>${obj.dob}</td>
        <td>${obj.age}</td>
        <td>${obj.city}</td>
        <td>${obj.gender}</td>
        <td>${obj.car}</td>
        <td>${obj.bike}</td>
        <td>${obj.mobile}</td>
        <td>${obj.laptop}</td>
        <td>
            <button class="btn btn-primary" onclick="onEdit(${i + 1})">Edit</button>
            <span class="ml-2 mr-2"></span>
            <button class="btn btn-danger" onclick="onDelete(${i + 1})">Delete</button>
        </td>
    </tr>`;
        table.insertAdjacentHTML("beforeend", tRow);
    }
    clearAll();
}




function clearAll(){
    let btn = document.getElementById("sbtn");
    btn.className = "btn btn-primary";
    btn.innerHTML = "Submit";
    isEdit = false;
    selectedRow = null;
    let form = document.getElementById("empForm");
    form.reset();
}


function calcAge(dob) {
    let today = new Date();
    let bday = new Date(dob);
    let age = today.getFullYear() - bday.getFullYear();
    let md = today.getMonth() - bday.getMonth();
    let dd = today.getDate() - bday.getDate();
    if (md < 0 || (md == 0 && dd < 0)) {
        age--
    }
    return age;
}


function onEdit(i) {
    selectedRow = i;
    isEdit = true;
    let obj = data[i - 1];
    document.getElementById("name").value = obj.name;
    document.getElementById("phn").value = obj.phn;
    document.getElementById("dob").value = obj.dob.split("/").reverse().join("-");
    document.getElementById("city").value = obj.city;
    document.getElementById(obj.gender).checked = true;
    for (let p in obj) {
        if (p == "car" || p == "bike" || p == "mobile" || p == "laptop") {
            document.getElementById(p).checked = obj[p] == "Yes" ? true : false;
        }
    }

    let btn = document.getElementById("sbtn");
    btn.className = "btn btn-success";
    btn.innerHTML = "Update";
}

function onDelete(i) {
    let ind = i-1;
    data.splice(ind,1);
    loopingArray();
