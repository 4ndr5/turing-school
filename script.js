$(function(){
    console.log("JS is connected")

    var socket= io();
    socket.on ("connect", function(){
        if (!localStorage.getItem("username")){
            $("#myModal").modal({backdrop: "static" , keyboard: false});
           // $(".modal-title").text("Enter your Username: ");
            $("#inputUser").val("");
        }
    });
    //get user
    $("#user").text(localStorage.getItem("username"));
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
        if (!localStorage.getItem("username")){
            var username= $("#inputUser").val();
            socket.emit("add username", {"username":username});
        }     
    });
    

    //message
    $("#sendMsg").on("click", function(){
        console.log("Message sent")
        var msg= $("#message").val()
        socket.send(msg)
    });
    socket.on("message", data =>{
       console.log(data)
       const p = document.createElement("p")
       p.innerHTML = data;
       $(".display-message").append(p)
    });

    //display username
    //socket.on("add username", data =>{
        //console.log(data)
        //const name = document.createElement("h3")
        //const name=localStorage.getItem("username");
        //name.innerHTML = data;
        //$(".display-message").append(name)
        //$("#user").text(localStorage.username)        
    //});
    //date
    var d = new Date();
    document.getElementById("time").innerHTML = d;
    
}
)
//function CombineDateAndTime(date, time) {
    //var timeString = time.getHours() + ':' + time.getMinutes();
    //var ampm = time.getHours() >= 12 ? 'PM' : 'AM';
    //var month = date.getMonth() + 1; // Jan is 0, dec is 11
    //var day = date.getDate();
    //var dateString = '' + year + '-' + month + '-' + day;
    //var datec = dateString + 'T' + timeString;
    //var combined = new Date(datec);

    //document.getElementById("time").innerHTML = combined;
//};