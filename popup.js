document.getElementById("btn").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: searchContent,
    });
});

document.getElementById("dwl").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: handleDownload,
    });
});
  
function onRun() {
    document.body.style.backgroundColor = "#fcc";
}

var seve_contents = '';

function searchContent(){
    const ncode = location.href.split('/')[3];
    const title = document.querySelector('.contents1').querySelector('a').textContent;
    const subtitle = document.querySelector('.novel_subtitle').textContent;
    const pageNum = location.href.split('/')[4];
    const author = document.querySelector('.contents1').querySelectorAll('a')[1].textContent;
    var body = document.querySelector('#novel_honbun').textContent;
    body = body.replace(/\r?\n/g, '');
    
    const content = ncode+','+title+','+','+subtitle+','+pageNum+','+author+','+body+'\n';
    var t = sessionStorage.getItem("naro");
    if(t==null){
        sessionStorage.setItem("naro", content);
    }else{
        sessionStorage.setItem("naro", t+content);
    }
}

function handleDownload() {
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const content = sessionStorage.getItem("naro");
    if(content==null){
        return;
    }
    const blob = new Blob([bom, content], { "type" : "text/csv" });
  
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, "test.csv");
      window.navigator.msSaveOrOpenBlob(blob, "test.csv");
    } else {
        var link =document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download ="tempdate.csv";
        link.click();
    }
}

