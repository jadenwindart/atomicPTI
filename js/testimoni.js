function sendTestimoni(){
    let sender = new XMLHttpRequest();
    let data = "testimoni=" + document.getElementById('txtTesti').value + "&nama=" + document.getElementById("nama").value ;
    sender.open('POST','./php/testimoni.php?request=send', true);
    sender.onreadystatechange = function(){
        if(sender.readyState == 4 && sender.status == 200){
            alert(sender.responseText);
            window.location(blog.html);
        }
    }
    sender.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(data)
    sender.send(data);
}

function getTestimoni(){
    let sender = new XMLHttpRequest();
    sender.open('GET','./php/testimoni.php?request=get',true);
    sender.onload = function(){
        if(sender.status >= 200 && sender.status < 400){
            alert(sender.responseText);
            if(sender.responseText){
                let data = JSON.parse(sender.responseText);
                generateTestimoni(data,0);
                generatePagination(data);
            }
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

function generateTestimoni(dataTesti,page){
    let divRow = document.getElementById("testimoniBlock");
    divRow.innerHTML = '';
    for(let i = page*3 ; i < page * 3 + 3 && dataTesti[i]; i++){ 
        let anchor = document.createElement("a");
        anchor.setAttribute("class","block-thumbnail-1 one-whole show-text height-sm");
        anchor.setAttribute("style","background-image: url('images/slider-2.jpg'); ");
        anchor.setAttribute("data-aos","fade");
        anchor.setAttribute("data-aos-delay","300"); 
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

function generatePagination(data){
    let containerPage = document.getElementById("pagination");
    containerPage.innerHTML = '';
    for(let i = 0 ; i < Math.round(data.length/3) ; i++){
        let listPage = document.createElement("li");
        listPage.setAttribute("class","page-item");
        let anchorPage = document.createElement("a");
        anchorPage.setAttribute("class","page-link");
        anchorPage.setAttribute("pageValue",i);
        anchorPage.innerHTML = i + 1;
        anchorPage.addEventListener("click",function(){
            generateTestimoni(data,this.getAttribute("pageValue"));
        });
        listPage.appendChild(anchorPage);
        containerPage.appendChild(listPage);
    }
}

function onDocumentLoad(){
    getTestimoni();
}