var db = firebase.database();

// ===== Get Data ===== //
var bookRef = firebase.database().ref('bookings');
bookRef.once("value", (snapshot) => {
    var obj = snapshot.val();

    Object.keys(obj).forEach((key) => {
        console.log(key);
        document.querySelector('#booking-table').innerHTML += `
            <tr>
                <td>${obj[key].roomno}</td>
                <td>${obj[key].fullName}</td>
                <td>${obj[key].pNumber}</td>
                <td>${obj[key].date}</td>
                <td>
                    <button id="acceptBtn" onclick="acceptBook('${key}')">Accept</button>
                    <button class="book-delbtn" onclick="delBook('${key}')">Delete</button>
                </td>
            </tr>`;
    });
});


// ===== Accept Booking ===== //
function acceptBook(e) {
    document.getElementById("acceptBookMod").showModal();

    firebase.database().ref('bookings/' + e).once("value", (snapshot) => {
        selectedBooking = e;

        document.getElementById('roombox').value = snapshot.val().roomno;
        document.getElementById('namebox').value = snapshot.val().fullName;
        document.getElementById('numbox').value = snapshot.val().pNumber;
        document.getElementById('datebox').value = snapshot.val().date;
    });
    
    var accept = document.getElementById("acceptbtn");

    accept.addEventListener("click", function() {
        var roomBox = document.getElementById('roombox').value;
        var nameBox = document.getElementById('namebox').value;
        var numBox = document.getElementById('numbox').value;
        var dateBox = document.getElementById('datebox').value;
        
        var tenantListRef = firebase.database().ref('tenants/');
        var newTenantRef = tenantListRef.push();

        newTenantRef.set({
            roomno: roomBox,
            fname: nameBox,
            pnumber: numBox,
            date: dateBox
        })
        
        .then(() => {
            alert('Booking accepted. New tenant added.');
            firebase.database().ref('bookings/' + selectedBooking).remove();
            location.reload();
        })
        .catch((error) => {
            alert('Unsuccessful, error: ' + error);
        });
    });
}


// ===== Decline Booking ===== //
function delBook(e) {
    document.getElementById("delBookMod").showModal();

    var confirm = document.getElementById("delconfirm");

    confirm.addEventListener("click", function() {
        firebase.database().ref('bookings/' + e).remove()
        .then(() => {
            alert('Booking has been declined.');
            location.reload();
        })
        .catch((error) => {
            alert('Unsuccessful, error: ' + error);
        });
    });
}




// ===== Count Data ===== //
function countBookings() {
    var bookCount = 0;
    
    firebase.database().ref('bookings/').once("value", (snapshot) => {
            bookCount = snapshot.numChildren();
            document.getElementById("bookingsNo").innerHTML = bookCount;
    });
}