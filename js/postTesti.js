function sendTestimoni(){
    let sender = new XMLHttpRequest();
    let data = "testimoni=" + document.getElementById('txtTesti').nodeValue;
    sender.open('POST','testimoni.php', true);
    sender.onreadystatechange = function(){
        if(sender.readyState == 4 && sender.status == 200){
            alert(sender.responseText);
        }
    }
    sender.send(data);
}