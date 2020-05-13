function thereformation_scraper() {
    var selected_color;
    var color_doms = document.querySelectorAll(".pdp-color-options__label");
    console.assert(color_doms.length == 1, "the Reformation: unexpected color dom found");
    if (color_doms.length == 1) {
        let color_txt = color_doms[0].innerText;
        color_txt = color_txt.slice("Color: ".length);
        selected_color = {
            name: color_txt,
            code: "0"
        }
    } 

    var selected_size;
    let selected_size_dom = document.querySelector(".pdp-size-options__size-label.pdp-size-options__size-label--selected");
    if (selected_size_dom)
        selected_size = selected_size_dom.innerText;

    var product_name = document.querySelector(".pdp__name").innerText;
    var img_src = document.querySelector(".pdp-thumbs__primary-image.lazyloaded").src;

    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src
    }
    return (product);
}