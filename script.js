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
    socket.on('add username', data=> {
        localStorage.setItem('username',data["username"]);
    });

    //message
    $("#sendMsg").on("click", function(){
        console.log("Message sent")
        var msg= $("#message").val()
        socket.send(msg)
    });
    socket.on("message", data =>{
       const p = document.createElement("p")
       p.innerHTML = data;
       $(".display-message").append(p)
       const span = document.createElement("span")
       span.innerHTML = localStorage.getItem("username");
       $(".display-message").append(span)
    });
    //date
    //var d= new Date();
    //document.getElementById("time").innerHTML = d;
    var tim= new Date();
    var mon= tim.getMonth();
    mon= mon.toString();
    var day = tim.getDay();
    day= day.toString();
    var h= tim.getHours();
    h=h.toString();
    var min= tim.getMinutes();
    min= min.toString();
    var timex= mon + day + h+ min;
    document.getElementById("time").innerHTML = timex;
    console.log(timex)
    
}
)