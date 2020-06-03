function uniqlo_scraper() {
    var product_name = document.querySelector(".product-name").innerText;
    var img_src = document.querySelector(".product-image-wrapper img").getAttribute("data-src")

    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src
    }
    return (product);
}