let addedparamscount = 0;
// Utility functions:
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Hide parameter box as json is defalut 
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if user clicks on params hide json box
let paramsradio = document.getElementById('paramsradio');
paramsradio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})
// if users clicks on json box , hide the params box
let jsonradio = document.getElementById('jsonradio');
jsonradio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

// if users clicks on add button add more parameters 
let addparam = document.getElementById('addParam');
addparam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedparamscount + 2}</label>
    <div class="col-md-4 ">
        <input type="text" class="form-control" id="parameterKey ${addedparamscount + 2}</" placeholder="Enter Parameter ${addedparamscount + 2} Key">
    </div>
    <div class="col-md-4 ">
        <input type="text" class="form-control" id="parameterValue ${addedparamscount + 2}" placeholder="Enter Parameter ${addedparamscount + 2} Value">
    </div>
    <button  class="btn btn-primary deletparam">-</button>
</div>`;
    // covert the element string to DOM node
    let paramElement = getElementFromString(string);
    console.log(paramElement);
    params.appendChild(paramElement);
    // add an event listner to remove by clicking -
    let deletparam = document.getElementsByClassName('deletparam');
    for (item of deletparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
            //  add a alert
        })
    }
    addedparamscount++;
})

// if user clicks on sumbit
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = ` <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

    // fetch all values user has entered 
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentype']:checked").value;



    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedparamscount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    // if the request type is get
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(Response => Response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }

    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(Response => Response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }

});