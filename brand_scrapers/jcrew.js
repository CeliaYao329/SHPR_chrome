function jcrew_scraper() {
    var selected_color;
    let selected_color_dom = document.querySelector(".product__price-colors .product__value");
    if (selected_color_dom){
        selected_color = {
            name: selected_color_dom.innerText,
            code: "0"
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelector(".sizes-list div.is-selected:not(.is-outofstock)");
    if (selected_size_dom) {
        selected_size = selected_size_dom.innerText;
    }

    var product_name = document.querySelector(".product__name").innerText;
    var img_src = document.querySelector(".product__image--hero").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector(".product__price .sale-price");
    if (!price_dom) {
        price_dom = document.querySelector(".product__price .is-price");
    }
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