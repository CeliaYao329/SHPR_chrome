function oakandfort_scraper() {
    var selected_color;
    let selected_color_dom = document.querySelector("#custcol2-container .product-views-option-tile-picker.active");
    if(selected_color_dom){
        selected_color = {
            name: selected_color_dom.innerText,
            code: "0"
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelector("#custcol1-container .product-views-option-tile-picker.active");
    if (selected_size_dom) {
        selected_size = selected_size_dom.innerText;
    }

    var product_name = document.querySelector("h1.product-details-full-content-header-title").innerText;
    var img_src = document.querySelector(".product-details-image-gallery-media").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector(".product-details-full-content-header .product-views-price-lead");
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