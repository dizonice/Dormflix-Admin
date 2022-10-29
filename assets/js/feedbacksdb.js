var db = firebase.database();

// ===== Get Feedback Data ===== //
var feedbackRef = firebase.database().ref('users');

feedbackRef.once("value", (snapshot) => {
    var obj = snapshot.val();

    Object.keys(obj).forEach((key) => {
        document.querySelector('#feedback-table').innerHTML += `
            <tr>
                <td>${obj[key].name}</td>
                <td>${obj[key].comment}</td>
                <td>
                    <button id="editBtn" onclick="viewFeedback('${key}')"><i class='bx bxs-message-alt-detail'></i></button>
                    <button id="delBtn" onclick="delFeedback('${key}')"><i class="bx bxs-trash"></i></button>
                </td>
            </tr>`;
    });
});


// ===== View Data ===== //
function viewFeedback(e) {
    document.getElementById("viewMsgMod").showModal();

    firebase.database().ref('users/' + e).once("value", (snapshot) => {
        selectedUser = e;

        document.getElementById('userbox').value = snapshot.val().name;
        document.getElementById('msgbox').value = snapshot.val().comment
    })
}


// ===== Delete Data ===== //
function delFeedback(e) {
    document.getElementById("delMsgMod").showModal();

    var confirm = document.getElementById("delconfirm");

    confirm.addEventListener("click", function() {
        firebase.database().ref('users/comment' + e).remove()
        .then(() => {
            alert('Feedback successfully deleted.');
            location.reload();
        })
        .catch((error) => {
            alert('An error has occured. Error: ' + error);
        });
    });
}