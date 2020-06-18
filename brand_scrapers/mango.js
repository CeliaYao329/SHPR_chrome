function mango_scraper() {
    var selected_color;
    var color_doms = document.getElementsByClassName('color-container');
    for (let idx = 0; idx < color_doms.length; idx++) {
        if (color_doms[idx].getAttribute('aria-label').includes("selected")) {
            selected_color = {
                name: color_doms[idx].getAttribute('aria-label').replace(' selected', ''),
                code: color_doms[idx].getAttribute('id')
            };
        }
    }

    var selected_size;
    var size_dom = document.querySelector(".selector-trigger");
    var one_size_dom = document.querySelector(".single-size");
    if(size_dom) {
        if(size_dom.innerText != "Choose your size") {
            selected_size = size_dom.innerText;
        }
    }
    if(one_size_dom) {
        selected_size = one_size_dom.innerText;
    }

    var product_name = document.querySelector(".product-name").textContent;
    var img_src = document.querySelector(".image-1").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var selling_price = parseFloat(document.querySelector(".product-sale").innerText.match(regex)[0]);
    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src,
        selling_price: selling_price
    }
    return (product);
}
