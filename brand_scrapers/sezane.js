function sezane_scraper() {
    var selected_color;
    let selected_color_dom = document.querySelector(".product-page__color__text");
    if (selected_color_dom) {
        selected_color = {
            name: selected_color_dom.innerText,
            code: "0"
        }
    }

    var selected_size;
    let selected_size_dom = document.querySelector(".product-page__size__item.product-page__size__item--active:not(.product-page__size__item--inactive)");
    if (selected_size_dom) {
        selected_size = selected_size_dom.innerText;
    }

    var product_name = document.querySelector(".product-page__title span").innerText;
    var img_src = document.querySelector("#MainContentPlaceHolder_visualsDiv img").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var price_dom = document.querySelector("#MainContentPlaceHolder_upnPrixArticle");
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