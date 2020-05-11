function setProductContents(productInfo) {
    console.log("in setDomContents, ", productInfo);
    $('#notFound').css({ 'display': "none" });
    $('#productCard').css({ 'display': "block" });
    var sizeSelect = document.getElementById("sizeSelect");
    var colorSelect = document.getElementById("colorSelect");
    document.getElementById('productNmae').textContent = productInfo.product_name;
    document.getElementById('brandName').textContent = productInfo.brand_name;
    document.getElementById('productImg').src = productInfo.img_src;
    if (productInfo.selected_color_idx != -1) {
        for (index = 0; index < productInfo.colors.length; index++) {
            if (index == productInfo.selected_color_idx) {
                colorSelect.textContent = productInfo.colors[index].name;
                break;
            }
        }
    } else {
        document.getElementById('colorSelectReminder').classList.remove("text-secondary");
        document.getElementById('colorSelectReminder').classList.add("text-danger");
    }
    if (productInfo.selected_size_idx != -1){
        for (index = 0; index < productInfo.size_names.length; index++) {
            if (index == productInfo.selected_size_idx) {
                sizeSelect.textContent = productInfo.size_names[index];
                break;
            }
        }
    } else {
        document.getElementById('sizeSelectReminder').classList.remove("text-secondary");
        document.getElementById('sizeSelectReminder').classList.add("text-danger");
    }
    if (productInfo.selected_color_idx != -1 && productInfo.selected_size_idx != -1) {
        document.getElementById('addButton').disabled = false;
    }
}

window.onload = function () {
    var curUrl;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'popupInit' }, (response) => {
            if (response.product) {
                setProductContents(response.product)
            }
        });
        curUrl = tabs[0].url;
        console.log(curUrl);
    });


    var addButton = document.getElementById('addButton');
    if (addButton) {
        addButton.addEventListener('click', function () {
            console.log("added button clicked");
            console.log($("#brandName").text());
            console.log($("#productNmae").text());
            console.log($("#colorSelect").text());
            console.log($("#sizeSelect").text());
            console.log(curUrl);
            console.log($('#productImg').attr('src'));

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
            // xhr.setRequestHeader("Sec-Fetch-Dest", "empty");
            // xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36");
            xhr.setRequestHeader("X-Wix-Client-Artifact-Id", "wix-form-builder");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "*/*");
            xhr.setRequestHeader("Content-Type", "application/json");
            // xhr.setRequestHeader("Cookie", "svSession=4d00ff11bc6321fdbc15ebdd8f56cfd217c64d5032c5817301bf73ec61ca5002e92c339ba4c84b1e0bd5c48fe38ba60b1e60994d53964e647acf431e4f798bcdd328fa2913c492183cc961f4f82499332da5529eda1bce9cc1016f1cda314a77; XSRF-TOKEN=1587699364|KFtIesV0HGR8; hs=-1006498251; smSession=JWS.eyJraWQiOiJQSXpvZGJiQiIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjUxNGIzNmQxLTFiOGQtNGY4MC05N2I0LTQ3YjcwMjdhYmNkZlwiLFwiY29sbGVjdGlvbklkXCI6XCIyNzc2NjhmYi1lNWRkLTQ4ODQtYTkxOC00OTc5YTlhNjBkNjBcIixcIm93bmVyXCI6ZmFsc2UsXCJjcmVhdGlvblRpbWVcIjoxNTg3NzAwMjUxNjc2LFwiZXhwaXJlc0luXCI6MTIwOTYwMDAwMCxcImV4cGlyYXRpb25UaW1lXCI6MTU4ODkwOTg1Mjk5NixcImxhc3RSZWZyZXNoZWRcIjoxNTg3NzUzMzcxMDgyLFwiYWRtaW5cIjpmYWxzZX0iLCJpYXQiOjE1ODc3NTMzNzF9.IeMgyBaHXHauJVwPiAwZL3fd8mLxcxk5DUtQrC77Wgo; TS01b37cb1=01f0e93131097645b094cde2da02ddaffaf109c2ec3edd8b4ec7537e4b13581226ee9865904569d86411f759682c84fb7fe49e9232; TS01a1afb9=01f0e93131097645b094cde2da02ddaffaf109c2ec3edd8b4ec7537e4b13581226ee9865904569d86411f759682c84fb7fe49e9232; TS01e85bed=01f0e931314286060b8557b1713136c542c51d1a04fea2087d5135ca3034ce2d358f195214a130206bb7b2e20369e393bf441fd830");

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
