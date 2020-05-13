function setProductContents(productInfo) {
    console.log("in setDomContents, ", productInfo);
    $('#notFound').css({ 'display': "none" });
    $('#productCard').css({ 'display': "block" });
    var sizeSelect = document.getElementById("sizeSelect");
    var colorSelect = document.getElementById("colorSelect");
    document.getElementById('productNmae').textContent = productInfo.product_name;
    document.getElementById('brandName').textContent = productInfo.brand_name;
    document.getElementById('productImg').src = productInfo.img_src;
    if (productInfo.selected_color) {
        colorSelect.textContent = productInfo.selected_color.name;
    } else {
        document.getElementById('colorSelectReminder').classList.remove("text-secondary");
        document.getElementById('colorSelectReminder').classList.add("text-danger");
    }
    if (productInfo.selected_size) {
        sizeSelect.textContent = productInfo.selected_size;
    } else {
        document.getElementById('sizeSelectReminder').classList.remove("text-secondary");
        document.getElementById('sizeSelectReminder').classList.add("text-danger");
    }

    if (productInfo.selected_color && productInfo.selected_size) {
        document.getElementById('addButton').disabled = false;

    }
}

function fetchCollection() {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "https://www.shpr.store/account/new-page-2");
    oReq.onreadystatechange = function () {
        if (oReq.readyState == 4) {
            var html = oReq.responseText;
            var parser = new DOMParser();
            var dom = parser.parseFromString(html, 'text/html');
            var scripts = dom.querySelectorAll('script');
            // Hard coded with the script that contains collection data in the html file
            let pageDataTxt = scripts[14].innerText; 
            pageDataTxt = pageDataTxt.slice(pageDataTxt.indexOf('{'), pageDataTxt.lastIndexOf(';'));
            var obj = JSON.parse(pageDataTxt);
            console.log(obj.userWarmup['dataItem-k9j0ah2a'].store['support01'].records);
        }
    }

    oReq.send();
}

window.onload = function () {
    var curUrl;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'popupInit' }, (response) => {
            if (response && response.product) {
                setProductContents(response.product)
            }
        });
        curUrl = tabs[0].url;
        console.log(curUrl);
    });

    fetchCollection();

    var addButton = document.getElementById('addButton');
    if (addButton) {
        addButton.addEventListener('click', function () {

            var data = JSON.stringify({
                "formProperties": {
                    "formName": "AddNewItem",
                    "formId": "comp-k9dn2y6i"
                },
                "emailConfig": {
                    "sendToOwnerAndEmails": {
                        "emailIds": []
                    }
                },
                "viewMode": "Site",
                "fields": [
                    {
                        "fieldId": "comp-k9dn2y6y",
                        "label": "Brand",
                        "additional":
                        {
                            "value":
                                { "string": $("#brandName").text() }
                        }
                    },
                    {
                        "fieldId": "comp-k9dn2y721",
                        "label": "Title",
                        "additional":
                        {
                            "value":
                                { "string": $("#productNmae").text() }
                        }
                    },
                    {
                        "fieldId": "comp-k9dn2y742",
                        "label": "Color",
                        "additional":
                            { "value": { "string": $("#colorSelect").text() } }
                    },
                    {
                        "fieldId": "comp-k9dn2y762",
                        "label": "Size",
                        "additional":
                            { "value": { "string": $("#sizeSelect").text() } }
                    },
                    {
                        "fieldId": "comp-k9dn2y782",
                        "label": "Link",
                        "additional":
                        {
                            "value":
                                { "string": curUrl }
                        }
                    },
                    {
                        "fieldId": "comp-k9dn2y7a2",
                        "label": "Image",
                        "additional":
                        {
                            "value":
                                { "string": $('#productImg').attr('src') }
                        }
                    }],
                "labelIds": ["contacts-contacted_me", "a0913a8b-3fa6-4ed1-afe3-5f570e6c7036"]
            });


            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });

            xhr.open("POST", "https://www.shpr.store/_api/wix-forms/v1/submit-form");
            xhr.setRequestHeader("Authorization", "39YSckpgGJdQowb2qC5QLwtWC3Qs-b5sZbrMru1sKF0.eyJpbnN0YW5jZUlkIjoiMTRiMjIxZWItY2JmNS00NDI2LWIxNWEtZGFiNjE0MjI4MjdiIiwiYXBwRGVmSWQiOiIxNGNlMTIxNC1iMjc4LWE3ZTQtMTM3My0wMGNlYmQxYmVmN2MiLCJtZXRhU2l0ZUlkIjoiOWNiMmExYWEtZTk4MC00ZjEzLWE2YzUtOTRhZTE0NDNhMzg2Iiwic2lnbkRhdGUiOiIyMDIwLTA0LTE4VDAyOjAzOjI4LjU4NloiLCJ1aWQiOiI1MTRiMzZkMS0xYjhkLTRmODAtOTdiNC00N2I3MDI3YWJjZGYiLCJkZW1vTW9kZSI6ZmFsc2UsIm9yaWdpbkluc3RhbmNlSWQiOiIyNTA0OGYxNy0zZGFmLTQ5YzYtYjBmYy03ZTcxZjVhMzE4YmEiLCJhaWQiOiI0ZWY4ZDJlNS0zNjA0LTQwYWItOGY4Mi1kN2VkMmI2NjUxNWEiLCJiaVRva2VuIjoiODgwMDgwNDEtMjI3NS0wYjM1LTE3OWYtNGUxODAwNjEyMWZkIiwic2l0ZU93bmVySWQiOiI4MWFmYTZlMS04NmY2LTRjM2MtYTZlMC05Y2E5OTgyMmI4MzQiLCJleHBpcmF0aW9uRGF0ZSI6IjIwMjAtMDQtMThUMDY6MDM6MjguNTg2WiJ9");
            xhr.setRequestHeader("X-Wix-Client-Artifact-Id", "wix-form-builder");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "*/*");

            xhr.send(data);

            document.getElementById("addButton").textContent = "Added";
            document.getElementById("addedSuccess").style.visibility = "visible";
        }, false);
    }

    var reserveButton = document.getElementById('reserveButton');
    if (reserveButton) {
        reserveButton.addEventListener('click', function () {
            console.log("reserveButton clicked");
            // $('#reserveSuccess').css({ 'display': "block" });
            document.getElementById("reserveSuccess").style.visibility = "visible";
        }, false);
    }
}

$(document).ready(function () {
    $('.goToCollection').on("click", function () {
        console.log("go to collection");
        // $('a[href="#pills-collection"]').tab('show');
        window.open(
            "https://www.shpr.store/account/new-page-2", "_blank");
    })
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log("getting msg");
    console.log(msg);

});
