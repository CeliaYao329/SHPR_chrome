function bananarepublic_scraper() {
    var selected_color;

    let selected_color_dom = document.querySelector(".swatch--color.selected:not(swatch--unavailable)");
    if (selected_color_dom) {
        selected_color = {
            name: selected_color_dom.querySelector("input").getAttribute("value"),
            code: "0"
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelector(".radio-container.radio-container--dimension .pdp-dimension.selected:not(.pdp-dimension--unavailable");
    if (selected_size_dom) {
        selected_size = selected_size_dom.innerText;
    }

    var product_name = document.querySelector(".product-title__text").innerText;
    var img_src = document.querySelector(".l--breadcrumb-photo-wrapper img").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector(".pdp-pricing__selected");
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