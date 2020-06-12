var curUrl;
var email;
var sessionToken;
var currentProduct;

function updateCollection(collectionItems) {
    const Item = ({ image, link, brand, title, size, color }) => `
    <tr>
        <th scope="row">
            <div class="p-2">
                <img src="${image}"
                    alt="" width="90" class="img-fluid shadow-sm">
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

function navigatePage() {
    chrome.storage.sync.get(['email', 'token', "collectionItems"], function (result) {
        sessionToken = result.token;
        email = result.email;
        collectionItems = result.collectionItems;
        if (!email) {
            $('#logIn').css({ 'display': "block" });
        } else {
            $('#logIn').css({ 'display': "none" });
            $('#gotoDashboard').css({ 'display': "block" });
            $('#pills-tabContent').css({ 'display': "block" });
            $('#pills-navbar').css({ 'display': "block" });
            updateCollection(collectionItems);
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



window.onload = function () {

    // get the collction of current user
    chrome.runtime.sendMessage({ action: "updateCollection" });

    // get the product on current page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'popupInit' }, (response) => {
            console.log("send message for product");
            if (response && response.product) {
                currentProduct = response.product;
                setProductContents(response.product)
            }
        });
        curUrl = tabs[0].url;
    });

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

    var refreshBtn = document.getElementById('refreshPage');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        })
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
            console.log("collectionChanged");
            chrome.storage.sync.get(['collectionItems'], function (result) {
                updateCollection(result.collectionItems);
            })
        }
    }
})