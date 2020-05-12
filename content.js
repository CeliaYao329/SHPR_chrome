// Return the brand name, and its correspoinding scraper function name
var product;

function getBrand() {
    brand_name = window.location.hostname.split('.')[1];
    cap_brand_name = brand_name[0].toUpperCase() + brand_name.slice(1);
    return [cap_brand_name, window[brand_name + "_scraper"]];
}


async function getProductInfo() {
    var [cap_brand_name, scraper] = getBrand();
    console.log("brand", cap_brand_name);
    product = scraper();
    product.brand_name = cap_brand_name;
    console.log(product);
}

window.onload = function () {
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
        case 'popupInit':
            getProductInfo();
            response({ product: product });
            break;
        default:
            response('unknown request');
            break;
    }
});