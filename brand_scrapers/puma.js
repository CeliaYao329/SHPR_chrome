function puma_scraper() {
    var selected_color;
    var color_dom = document.querySelector(".content-color-value");
    let color_txt = color_dom.innerText;
    selected_color = {
        name: color_txt,
        code: "0"
    }


    var selected_size;
    let selected_size_dom = document.querySelector("puma-swatches#puma-swatches-size").shadowRoot.querySelector("li.swatch.text.selected");
    if (selected_size_dom)
        selected_size = selected_size_dom.innerText;

    var product_name = document.querySelector("h1.product-name").innerText;
    var img_src = document.querySelector("puma-images").shadowRoot.querySelector("img").src;
    
    var regex = /[+-]?\d+(\.\d+)?/g;
    var selling_price = parseFloat(document.querySelector(".sales").innerText.match(regex)[0]);
   
    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src,
        selling_price: selling_price
    }
    return (product);
}