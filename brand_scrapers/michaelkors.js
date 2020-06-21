function michaelkors_scraper() {
    var selected_color;
    let selected_color_dom = document.querySelector(".color-container .selected-color");
    if (selected_color_dom) {
        selected_color = {
            name: selected_color_dom.innerText,
            code: "0"
        }
    }

    var selected_size;
    let is_size_selection = document.querySelector(".size-container");
    if (is_size_selection === null) {
        selected_size = "One Size";
    } else {
        let selected_size_dom = document.querySelector(".size-container .size-selected");
        if (selected_size_dom) {
            selected_size = selected_size_dom.innerText;
        }

    }

    var product_name = document.querySelector(".product-name h1").innerText;
    var img_src = document.querySelector(".gallery-images img").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector(".product-details-container .product-price-container .salePrice") || document.querySelector(".product-details-container .product-price-container .Price");
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