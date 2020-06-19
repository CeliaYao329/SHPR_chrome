function loft_scraper() {
    var selected_color;
    let selected_color_dom = document.querySelector("fieldset.colors span.selected");
    if (selected_color_dom){
        selected_color = {
            name: selected_color_dom.innerText.replace("Color: ", ""),
            code: "0"
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelector("fieldset.sizes").querySelector(".size-button.active");
    if (selected_size_dom) {
        selected_size = selected_size_dom.innerText;
    }

    
    let size_type_dom = document.querySelector("fieldset.size-types");
    if(selected_size && (size_type_dom !== null)) {
        var selected_size_type;
        let selected_size_type_dom = document.querySelector("fieldset.size-types").querySelector("a.active");
        if(selected_size_type_dom) {
            selected_size_type = selected_size_type_dom.innerText;
            selected_size = selected_size + " - " + selected_size_type;
        } else {
            selected_size = null;
        }
    }

    var product_name = document.querySelector(".product-information h1").innerText;
    var img_src = document.querySelector(".main-image img").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector(".product-information .price.sale span");
    if (!price_dom) {
        price_dom = document.querySelector(".product-information .price");
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