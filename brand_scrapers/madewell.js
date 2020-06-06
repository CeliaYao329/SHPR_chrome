function madewell_scraper() {
    console.assert(document.querySelectorAll(".product-variations .attribute").length == 2, "Madewell: Unexpected");
    
    var selected_color;
    let selected_color_dom = document.querySelector(".product-variations .attribute .selected-value");
    if (selected_color_dom) {
        selected_color = {
            name: selected_color_dom.innerText,
            code: "0"
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelectorAll(".product-variations .attribute")[1].querySelector(".selectable.selected");
    let extension_size_dom = document.querySelector(".extended-sizing");
    if(selected_size_dom) {
        if(extension_size_dom){
            let selected_extension_dom=extension_size_dom.querySelector(".extended-sizing-tile.selected");
            if(selected_extension_dom) {
                selected_size = selected_size_dom.innerText + " " + selected_extension_dom.innerText; 
            } 
        } else {
            selected_size = selected_size_dom.innerText;
        }
    }

    var product_name = document.querySelector(".product-name").innerText;
    var img_src = document.querySelector(".product-image-wrapper img").getAttribute("data-src")
    var regex = /[+-]?\d+(\.\d+)?/g;
    var selling_price = parseFloat(document.querySelector(".price-sales").innerText.match(regex)[0]);
    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src,
        selling_price: selling_price
    }

    return (product);
}