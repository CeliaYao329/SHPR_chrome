function rouje_scraper() {
    var selected_color;
    if (document.querySelector("#attr_color") === null) {
        selected_color = {
            name: "One Color",
            code: "0"
        }
    } else {
        let selected_color_dom = document.querySelector(".product-options div.sub-title");
        if (selected_color_dom) {
            selected_color = {
                name: selected_color_dom.innerText.slice("COLOR - ".length),
                code: "0"
            }
        }
    }


    var selected_size;
    let selected_size_dom = document.querySelector("#configurable_swatch_size li.selected:not(.unavailable)");
    if (selected_size_dom) {
        selected_size = selected_size_dom.innerText;
    }

    var product_name = document.querySelector(".product-name h1").innerText
    var img_srcset = document.querySelector(".product-img-box img").getAttribute("srcset");
    var img_src;
    if (img_srcset.indexOf(',') !== -1) {
        img_src = img_srcset.slice(0, img_srcset.indexOf(','));
    }
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector(".price");
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