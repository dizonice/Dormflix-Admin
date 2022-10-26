var db = firebase.database();

// ===== Get Feedback Data ===== //
var feedbackRef = firebase.database().ref('feedbacks');

feedbackRef.once("value", (snapshot) => {
    var obj = snapshot.val();

    Object.keys(obj).forEach((key) => {
        document.querySelector('#feedback-table').innerHTML += `
            <tr>
                <td>${obj[key].user}</td>
                <td>${obj[key].comment}</td>
                <td>
                    <button id="editBtn" onclick="viewFeedback('${key}')"><i class='bx bxs-message-alt-detail'></i></button>
                    <button id="delBtn" onclick="delFeedback('${key}')"><i class="bx bxs-trash"></i></button>
                </td>
            </tr>`;
    });
});


// ===== Add Data ===== //
function addFeedback() {
    var nameBox = document.getElementById('namefield').value;
    var msgBox = document.getElementById('msgfield').value;

    var feedListRef = firebase.database().ref('feedbacks/');
    var newFeedRef = feedListRef.push();

    newFeedRef.set({
        user: nameBox,
        comment: msgBox
    });
    location.reload();
}


// ===== View Data ===== //
function viewFeedback(e) {
    document.getElementById("viewMsgMod").showModal();

    firebase.database().ref('feedbacks/' + e).once("value", (snapshot) => {
        selectedUser = e;

        document.getElementById('userbox').value = snapshot.val().user;
        document.getElementById('msgbox').value = snapshot.val().comment
    })
}


// ===== Delete Data ===== //
function delFeedback(e) {
    document.getElementById("delMsgMod").showModal();

    var confirm = document.getElementById("delconfirm");

    confirm.addEventListener("click", function() {
        firebase.database().ref('feedbacks/' + e).remove()
        .then(() => {
            alert('Feedback successfully deleted.');
            location.reload();
        })
        .catch((error) => {
            alert('An error has occured. Error: ' + error);
        });
    });
}


// ===== Count Data ===== //
function countFeedbacks() {
    var msgCount = 0;
    
    firebase.database().ref('feedbacks/').once("value", (snapshot) => {
            msgCount = snapshot.numChildren();
            document.getElementById("feedbacksNo").innerHTML = msgCount;
    });
}