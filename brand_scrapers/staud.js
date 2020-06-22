function staud_scraper() {
    var selected_color;
    let selected_color_dom = document.querySelector(".product-shop-color-swatch.js-product-shop-color-swatch.selected");
    if (selected_color_dom) {
        selected_color = {
            name: selected_color_dom.getAttribute("aria-label"),
            code: "0"
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelector(".product-selector.product-shop-selector.active .product-option-value.product-shop-option-value.js-product-shop-option-value.selected");
    if (selected_size_dom) {
        selected_size = selected_size_dom.innerText;
    }

    var product_name = document.querySelector(".product-shop-title").innerText;
    var img_src = document.querySelector(".product-shop-album img").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector(".product-price.product-price-on-sale") || document.querySelector(".product-price");
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