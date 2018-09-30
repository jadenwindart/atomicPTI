function sendTestimoni(){
    let sender = new XMLHttpRequest();
    let data = "testimoni=" + document.getElementById('txtTesti').nodeValue;
    sender.open('POST','./php/testimoni.php', true);
    sender.onreadystatechange = function(){
        if(sender.readyState == 4 && sender.status == 200){
            return sender.responseText;
        }
    }
    sender.send(data);
}

function getTestimoni(){
    let sender = new XMLHttpRequest();
    sender.open('GET','./php/testimoni.php?request=get',true);
    sender.onload = function(){
        if(sender.status >= 200 && sender.status < 400){
            let data = JSON.parse(sender.responseText);
            generateTestimoni(data);
        }
        else{
            alert("Page Not Found!");
        }
    }
    sender.onerror = function(){
        alert("fetch data failed!");
    }
    sender.send();
}

function generateTestimoni(dataTesti){
    for(let i = 0 ; i < dataTesti.length ; i++){
        let anchor = document.createElement("a");
        anchor.setAttribute("class","block-thumbnail-1 one-whole show-text height-sm");
        anchor.setAttribute("style","background-image: url('images/slider-2.jpg'); ");
        anchor.setAttribute("data-aos","fade");
        anchor.setAttribute("data-aos-delay","300");
        let divRow = document.getElementById("testimoniBlock");
        let divContainer = document.createElement("div");
        divContainer.setAttribute("class","col-md-6 col-lg-4 mb-4");
        let divTesti = document.createElement("div");
        divTesti.setAttribute("class","block-thumbnail-content");
        let text = document.createElement("h2");
        text.innerHTML = dataTesti[i][2];
        let date = document.createElement("span");
        date.setAttribute("class","post-meta");
        date.innerHTML = dataTesti[i][3];
        divTesti.appendChild(text);
        divTesti.appendChild(date);
        anchor.appendChild(divTesti);
        divContainer.appendChild(anchor);
        divRow.appendChild(divContainer);
    }
}

function onDocumentLoad(){
    getTestimoni();
}