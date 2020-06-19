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
    "zara": "Zara",
    "ba-sh":"ba&sh",
    "katespade": "Kate Spade"
}

// Testing: random, sale, one-size, unavailable, non-product page

// Return the brand name, and its correspoinding scraper function name
var cap_brand_name = null;
var product = null;

function getBrand() {
    brand_name = window.location.hostname.split('.')[1];
    if ( ! (brand_name in Brands) ){
        brand_name = window.location.hostname.split('.')[0];
    }
    console.log("brand_name:" , brand_name);
    if (brand_name in Brands) {
        let realName = Brands[brand_name];
        brand_name=brand_name.replace(/\W+/g, '_');
        console.log(brand_name + "_scraper")
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
                    console.error(err);
                    product = null;
                }
            }
            console.log("product: ", product);
            response({ brandName: cap_brand_name, product: product });
            break;
        default:
            response('unknown request');
            break;
    }
});