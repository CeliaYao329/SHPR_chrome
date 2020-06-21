function cosstores_scraper() {
    var selected_color;
    let selected_color_dom = document.querySelector(".color-section #pdpDropdown");
    if (selected_color_dom){
        selected_color = {
            name: selected_color_dom.getAttribute("data-value"),
            code: selected_color_dom.getAttribute("data-selected")
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelector(".size-options.in-stock.is-selected");
    if (selected_size_dom) {
        selected_size = selected_size_dom.innerText;
    }

    var product_name = document.querySelector("#productTitle").innerText;
    var img_src = document.querySelector("#gallery-product-1").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector("#productPrice");
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