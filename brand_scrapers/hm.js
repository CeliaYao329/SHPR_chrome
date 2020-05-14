function hm_scraper() {
    var selected_color;
    let selected_color_dom = document.querySelector(".product-input-label");
    if(selected_color_dom) {
        selected_color = {
            name: selected_color_dom.innerText,
            code: "0"
        }
    } else {
        selected_color = {
            name: document.querySelector(".filter-option.miniature.active").title,
            code: "0"
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelector(".product-item-buttons .option.active");
    if (selected_size_dom) {
        selected_size = selected_size_dom.innerText;
    } else {
        selected_size_dom = document.querySelector(".product-item-buttons .trigger-button");
        if(selected_size_dom.innerTex != "Select size") {
            selected_size = selected_size_dom.innerTex;
        }
    }

    var product_name = document.querySelector(".primary.product-item-headline").innerText;
    var img_src = document.querySelector(".product-detail-main-image-container").firstElementChild.src;

    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src
    }
    return (product);
}