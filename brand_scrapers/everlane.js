function everlane_scraper() {
    var selected_color;
    var color_doms = document.querySelectorAll(".product-page__color-name.product-page__color-name--selected.product-page__color-name--hovered");
    console.assert(color_doms.length == 1, "Everlane: unexpected color dom found");
    if (color_doms.length == 1) {
        selected_color = {
            name: color_doms[0].innerText,
            code: color_doms[0].innerText
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelector(".product-page__size-selection.product-page__size-selection--selected")
    if(selected_size_dom)
        selected_size = selected_size_dom.querySelector(".product-page__size-selection-name").innerText;

    var product_name = document.querySelector(".product-heading__name").innerText
    var img_src = document.querySelectorAll(".zoomImg")[0].src;

    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src
    }
    return (product);
}