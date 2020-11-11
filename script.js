$(function(){
    console.log("JS is connected")
// Checking the push
    var socket= io();
    socket.on ("connect", function(){
        if (!localStorage.getItem("username")){
            $("#myModal").modal({backdrop: "static" , keyboard: false});
           // $(".modal-title").text("Enter your Username: ");
            $("#inputUser").val("");
        }
    });
    //get user
    $("#user").text(localStorage.username);
    //modal 
    $("#inputUser").on('keyup', function (key) {
        if ($("#inputUser").val().length > 0 ){
            $("#modalBtn").attr("disabled", false);
            if (key.keyCode==13 ) {
                $("#modalBtn").click();
            }
        }
        else {
            $("#modalBtn").attr("disabled", true);
        }
    });
    
    $("#modalBtn").on("click", function(){
        console.log('i clicked')
        if (!localStorage.getItem("username")){
            var username= $("#inputUser").val();
            socket.emit("add username", {"username":username});
            console.log(username)
        }     
    });
    

    //UPDATED
    // MESSAGE SEND UPDATED, SEND WITH A KEY
// message
    $("#message").on('keyup', function (key) {
        if ($("#message").val().length > 0 ){
            $("#sendMsg").attr("disabled", false);
            if (key.keyCode==13) {
                $("#sendMsg").click();
            }
        }
        else {
            $("#sendMsg").attr("disabled", true);
        }
    });

    $("#sendMsg").on("click", function(){
        // console.log("Message sent")
        var msg = $("#message").val()
        var user = localStorage.username
        socket.send({'msg':msg, 'username':user})
        
    // UPDATED
    // MESSAGE VALUE IS CLEARED AFTER SENDING
    $("#message").val("");

    });
    socket.on("message", data =>{

       console.log(data)
       const p = document.createElement("p")
       p.innerHTML = data.msg;
       $(".display-message").append(p)

       const p2 = document.createElement("p")
       p2.innerHTML = data.username;
       $(".display-message").append(p2)
    //    console.log(data.username)

// UPDATED
// TAKE THE TIME AND DATE PART
            // date
        const d = new Date();
        dHours = 'Time sent: ' + d.getHours() + ':' + d.getMinutes() + ' On: ' + d.getUTCFullYear() + '/' + d.getUTCMonth() + '/' + d.getDate();
        $(".display-message").append(dHours)
    });

    // display username
    socket.on("add username", data =>{
        console.log(data)
        localStorage.setItem('username', data["username"])
        $("#user").text(localStorage.getItem('username'));

    });

    
}
)