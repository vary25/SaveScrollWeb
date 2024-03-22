document.getElementById('saveContent').onclick = function() {

   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: saveContent,
    });
  });

};

function saveContent() {

  var divPar = document.getElementById('divPar');
  var docPage = document.getElementsByClassName("docx-page");
  

  if(!divPar){
    console.log("first ,create element");
    var newElement = document.createElement('div'); 
    newElement.id = 'divPar';
    newElement.style.display = "none";
    newElement.setAttribute("contentIndex",-1);
    newElement.setAttribute("repeatCount",0);
    // document.body.appendChild(newElement);
    docPage[0].appendChild(newElement);
    
  }else{
    console.log("reuse element");
  }

  divPar = document.getElementById('divPar');
  var contentIndex = Number(divPar.getAttribute("contentIndex"));
  var contents = document.getElementsByClassName("block-wrapper");

  var repeatCount = Number(divPar.getAttribute("repeatCount"));
  
  var inCount = 0;
  for (var i = 0; i < contents.length; i++) {
    var indexNum = Number(contents[i].getAttribute("index"));
     if( indexNum> contentIndex){
      inCount++;
      contentIndex = indexNum;
      divPar.setAttribute("contentIndex",contentIndex);
      var tmp = document.createElement('div');
      tmp.className = "block-wrapper";
      tmp.innerHTML = contents[i].innerHTML;
      // strContent += contents[i].innerHTML;
      // divPar.innerHTML += contents[i].innerHTML;
      divPar.appendChild(tmp);
     }
  }
  docPage[0].scrollTop += 600;

  if(inCount<1){
    repeatCount ++ ;
    divPar.setAttribute("repeatCount",repeatCount);
  }else{
    repeatCount = 0 ;
    divPar.setAttribute("repeatCount",repeatCount);
  }

  if (repeatCount < 4 ) {
    setTimeout(function (){
      // console.log("你好！");
      saveContent();
    }, 1000); 
  }
  

  // var newElement = document.createElement('div'); // 创建一个div元素
  // newElement.id = "newElement";
  // newElement.innerHTML = strContent;
  

  // document.body.appendChild(newElement);
  // setTimeout(pickupContent,1000);
// console.log(strContent);
}

