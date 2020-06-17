var curUrl;
var email;
var sessionToken;
var currentProduct;

function updateCollection(collectionItems) {
    const Item = ({ image, link, brand, title, size, color }) => `
    <tr>
        <th scope="row">
            <div class="p-1">
                <img src="${image}"
                    alt="" width="65" class="img-fluid shadow-sm">
            </div>
        </th>
        <td class="align-middle">
            <div class="d-inline-block align-middle">
                <p class="d-inline-block mb-2 text-muted">${brand}</p>
                <p> <a href="${link}" target="_blank" class="text-dark d-inline-block align-middle">${title}</a>
                </p>
                <p><small class="text-muted"> Size: ${size} Color: ${color} </small></p>
        </td>
    </tr>
    `;
    $('#collectionTableBody').html(collectionItems.map(Item).join(''));
}

function updateTrendyBrands(brandLogos) {
    const Item = ( {link, imageUrl} ) => `
    <div class="cover-item"><a href="${link}" target="_blank"><img src="${imageUrl}"
    style="width:50px; height:50px" class="img-fluid"></a></div>`;
    $("#TrendyBrands").html(brandLogos.map(Item).join(''));
}

function navigatePage() {
    chrome.storage.sync.get(['email', 'token', "collectionItems", "trendyBrands"], function (result) {
        sessionToken = result.token;
        email = result.email;
        collectionItems = result.collectionItems;
        trendyBrands = result.trendyBrands;
        if (!email) {
            $('#logIn').css({ 'display': "block" });
        } else {
            $('#logIn').css({ 'display': "none" });
            $('#gotoDashboard').innerHTML = "Siyu Yao";
            $('#gotoDashboard').css({ 'display': "block" });
            $('#pills-tabContent').css({ 'display': "block" });
            $('#pills-navbar').css({ 'display': "block" });
            updateCollection(collectionItems);
            updateTrendyBrands(trendyBrands);
        }
    })
}
navigatePage();

function isAlreadyInCollection(newItem) {
    console.log(" in is alreadyinCollection");
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(['collectionItems'], function (result) {

            for (let id = 0; id < result.collectionItems.length; id++) {
                if (result.collectionItems[id].title != newItem.product_name ||
                    result.collectionItems[id].color != newItem.selected_color.name ||
                    result.collectionItems[id].size != newItem.selected_size ||
                    result.collectionItems[id].brand != newItem.brand_name) {
                    continue;
                } else {
                    console.log("is Alredy in");
                    resolve(true);
                }
            }
            console.log("really new item");
            resolve(false);
        });

    });
}


function setProductContents(productInfo) {
    console.log("set Product:", productInfo);
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

    isAlreadyInCollection(productInfo)
        .then((isInCollection) => {
            console.log(isInCollection);
            if (productInfo.selected_color && productInfo.selected_size && isInCollection === false) {
                document.getElementById('addButton').disabled = false;
            }
            if (isInCollection) {
                console.log("already In");
                document.getElementById('addButton').textContent = "Already in collection";
            }
        });
    $('#tab-product').tab('show');
}

function setBrandReminderMsg(brandName) {
    $('#notFound').css({ 'display': "block" });
    let brandMsgHtml = `
    <div class="card-body d-flex align-items-center" style="height: 400px;">
        <div>
            <h4>${brandName} is on SHPR!</h4>
            <p>Let us help you shop ${brandName}. Please go to a page of product detail to add the item into your SHPR collection.</p>
        </div>
    </div>
    `;
    $("#notFound").html(brandMsgHtml);
    
}

function notSupportedReminderMsg() {
    $('#notFound').css({ 'display': "block" });
    let notFoundHtml = `
    <div class ="card" style="height: 400px;">
        <div class="card-body d-flex align-items-center">
            <div>
                <h4>Sorry, we don't see a product in this page.</h4>
                <p> Please try <a id="refreshPage" href="#">refreshing the page.</a> </p>
                <p>If you still see this, please click the button below to report the issue to SHPR!</p>
                <button type="submit" class="btn btn-sm btn-secondary" id="report">Report to SHPR</button>
            </div>
        </div>
    </div>`;
    $("#notFound").html(notFoundHtml);

    var reportBtn = document.getElementById('report');
    if(reportBtn) {
        reportBtn.addEventListener('click', function () {
            console.log("report clicked");
            chrome.runtime.sendMessage({ action: "report", link: curUrl });
            document.getElementById("report").textContent = "Reported";
            document.getElementById("report").disabled = true;
        })
    }

    var refreshBtn = document.getElementById('refreshPage');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        })
    }
}

window.onload = function () {

    

    // get the popular brands
    chrome.runtime.sendMessage({action: "updateTrendyBrands"});

    // get the collction of current user
    chrome.runtime.sendMessage({ action: "updateCollection" });

    // get the product on current page
    try {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'popupInit' }, (response) => {
                if (response && response.product) {
                    currentProduct = response.product;
                    setProductContents(response.product)
                } else if (response && response.brandName) {
                    setBrandReminderMsg(response.brandName);
                } else {
                    notSupportedReminderMsg();
                }
            });
            curUrl = tabs[0].url;
        });
    } catch (error) {
        notSupportedReminderMsg();
    }
    

    var loginButton = document.getElementById('loginBtn');

    if (loginButton) {
        loginButton.addEventListener('click', function () {
            let email = document.getElementById("loginEmail").value;
            let pwd = document.getElementById("loginPassword").value;
            console.log("click login:", email, pwd);

            var data = JSON.stringify({ "email": email, "password": pwd });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    let response = JSON.parse(this.response);
                    let loginApproved = response.approved;
                    let loginSessionToken = response.sessionToken;
                    if (loginApproved) {
                        chrome.storage.sync.set({
                            email: email,
                            token: loginSessionToken,
                        }, navigatePage);
                    }
                }
            });

            xhr.open("POST", "https://www.shpr.store/_functions/login");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.send(data);
            $("#loginBtn").disabled = true;
            $("#loginLoading").css({ 'display': "block" });
            $("#loginTxt").css({ 'display': "none" });
        })
    }

    var addButton = document.getElementById('addButton');
    if (addButton) {
        addButton.addEventListener('click', function () {
            console.log("added product", currentProduct);
            let newItem = {
                "brand": $("#brandName").text(),
                "title": $("#productNmae").text(),
                "color": $("#colorSelect").text(),
                "size": $("#sizeSelect").text(),
                "link": curUrl,
                "sellingPrice": currentProduct.selling_price,
                "image": $('#productImg').attr('src'),
                "status": "Collected"
            }
            chrome.runtime.sendMessage({ action: "addItem", newItem: newItem });
            document.getElementById("addButton").textContent = "Added";
            document.getElementById("addedSuccess").style.visibility = "visible";
        }, false);
    }

}




$(document).ready(function () {
    $('.goToCollection').on("click", function () {
        window.open(
            "https://www.shpr.store/account/collection", "_blank");
    })

    $('#gotoSHPR').on("click", function () {
        window.open(
            "https://www.shpr.store/account/dashboard", "_blank");
    })
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (key in changes) {
        if (key === 'collectionItems') {
            chrome.storage.sync.get(['collectionItems'], function (result) {
                updateCollection(result.collectionItems);
            })
        }
        if (key === 'trendyBrands') {
            chrome.storage.sync.get(['trendyBrands'], function (result) {
                updateTrendyBrands(result.trendyBrands);
            })
        }
    }
})