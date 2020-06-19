function anthropologie_scraper() {
    // same with Freepeople
    var selected_color;
    let selected_color_dom = document.querySelector(".c-pwa-sku-selection__color-value");
    if (selected_color_dom){
        selected_color = {
            name: selected_color_dom.innerText,
            code: "0"
        }
    }

    var selected_size;
    let selected_size_doms = document.querySelector(".c-pwa-sku-selection__size-inner").querySelector("ul").querySelectorAll("li");
    for (let idx = 0; idx < selected_size_doms.length; idx++) {
        if(selected_size_doms[idx].querySelector("input").checked) {
            selected_size = selected_size_doms[idx].querySelector("label").innerText;
        }
    }


    var product_name = document.querySelector(".c-pwa-product-meta-heading").innerText;
    var img_src = document.querySelector(".c-pwa-image-viewer__img.js-pwa-faceout-image").src
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector(".c-pwa-product-price__current");
    
    var selling_price = parseFloat(price_dom.innerText.match(regex)[0]);
    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src,
        selling_price: selling_price
    }
    return (product);
}