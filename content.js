// All the brand supported:
const Brands = {
    "asos": "ASOS",
    "everlane": "Everlane",
    "hm": "H&M",
    "madewell": "Madewell",
    "mango": "Mango",
    "puma": "Puma",
    "thereformation": "Reformation",
    "uniqlo": "Uniqlo",
    "urbanoutfitters": "Urban Outfitters",
    "zara": "Zara" 
}


// Return the brand name, and its correspoinding scraper function name
var cap_brand_name = null;
var product = null;

function getBrand() {
    brand_name = window.location.hostname.split('.')[1];
    if (brand_name in Brands) {
        let realName = Brands[brand_name];
        return [realName, window[brand_name + "_scraper"]]; 
    } else {
        return [null, null];
    }
}

window.onload = function () {
    
}

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
    console.log("pop up ask me for product info");
    switch (msg.type) {
        case 'popupInit':
            var [cap_brand_name, scraper] = getBrand();
            if(scraper !== null) {
                try {
                    product = scraper();
                    product.brand_name = cap_brand_name;
                } catch(err) {
                    product = null;
                }
            }
            response({ brandName: cap_brand_name, product: product });
            break;
        default:
            response('unknown request');
            break;
    }
});