function uniqlo_scraper() {
    var selected_color;
    var color_dom = document.querySelector(".selectedvalue");
    var regex = /[+-]?\d+(\.\d+)?/g;
    let color_txt = color_dom.innerText;
    color_code = color_txt.match(regex)[0];
    selected_color = {
        name: color_txt,
        code: color_code
    }

    var selected_size;
    let selected_size_dom = document.querySelector("ul.size li.selected");
    if (selected_size_dom)
        selected_size = selected_size_dom.innerText;

    var product_name = document.querySelector(".product-name").innerText;
    var img_src = document.querySelector(".primary-image").src;
    var selling_price = parseFloat(document.querySelector(".price-sales.pdp-space-price").innerText.match(regex)[0]);
    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src,
        selling_price: selling_price
    }
    return (product);
}