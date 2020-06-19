function bcbg_scraper() {
    var selected_color;
    let selected_color_dom = document.querySelector("ul.ul-color li.selected-value");
    if (selected_color_dom){
        selected_color = {
            name: selected_color_dom.innerText,
            code: "0"
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelector("ul.ul-size .size-variation.selected");
    if (selected_size_dom) {
        selected_size = selected_size_dom.innerText;
    }

    var product_name = document.querySelector(".product-name").firstChild.wholeText;
    var img_src = document.querySelector(".primary-image").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector(".product-price.main-price .price-sales");
    if (!price_dom) {
        price_dom = document.querySelector(".product-price.main-price");
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