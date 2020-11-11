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
        var user = localStorage.username
        socket.send({"msg": msg, "username" : user})
    });
    socket.on("message", data =>{
       const p = document.createElement("p")
       p.innerHTML = data.msg;
       $(".display-message").append(p)
       const span = document.createElement("span")
       span.innerHTML = data.username;
       $(".display-message").append(span)
       const d = new Date();	
       dHours = '  sent: ' + d.getHours() + ':' + d.getMinutes() + ' On: ' + d.getUTCFullYear() + '/' + d.getUTCMonth() + '/' + d.getDate();	
       $(".display-message").append(dHours)
    });
   
 
    //click btn func
    //$("#message").on('keyup', function (key) {	
      //  if ($("#message").val().length > 0 ){	
        //    $("#sendMsg").attr("disabled", false);	
          //  if (key.keyCode==13) {	
            //    $("#sendMsg").click();	
            //}	
       // }	
        //else {	
          //  $("#sendMsg").attr("disabled", true);	
        //}	
    //});
}
)
