function urbanoutfitters_scraper() {
    var selected_color;
    var color_doms = document.querySelectorAll(".c-pwa-swatch-outer");
    for (let idx = 0; idx < color_doms.length; idx++) {
        if (color_doms[idx].firstElementChild.checked) {
            selected_color = {
                name: color_doms[idx].querySelector("img").getAttribute("alt"),
                code: color_doms[idx].firstElementChild.value
            }
        }
    }

    var selected_size;
    var size_lis = document.querySelectorAll(".c-pwa-radio-boxes__item--default");
    for (let idx = 0; idx < size_lis.length; idx++) {
        if (size_lis[idx].firstElementChild.checked) {
            selected_size = size_lis[idx].querySelector("label").innerText;
        }
    }

    var product_name = document.querySelector(".c-pwa-product-meta-heading").innerText;
    var img_src = document.querySelector(".c-pwa-image-viewer__img.js-pwa-faceout-image").src;
    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src
    }
    return (product);
}

// function urbanoutfitters_scraper() {
//     var size_lis = document.querySelectorAll(".c-pwa-radio-boxes__item--default");
//     var size_names = Array();
//     var selected_size_idx = -1;
//     for (let idx = 0; idx < size_lis.length; idx++) {
//         size_names.push(size_lis[idx].querySelector("label").innerText);
//         if (size_lis[idx].firstElementChild.checked) {
//             selected_size_idx = idx;
//         }
//     }
//     var colors = Array();
//     var color_doms = document.querySelectorAll(".c-pwa-swatch-outer");
//     var selected_color_idx = -1;
    
//     for (let idx = 0; idx < color_doms.length; idx++) {
//         if (color_doms[idx].firstElementChild.checked) {
//             selected_color_idx = idx;
//         }
//         var newColor = {
//             name: color_doms[idx].querySelector("img").getAttribute("alt"),
//             code: color_doms[idx].firstElementChild.value
//         }
//         colors.push(newColor);
//     }
//     var product_name = document.querySelector(".c-pwa-product-meta-heading").innerText;
//     var img_src = document.querySelector(".c-pwa-image-viewer__img.js-pwa-faceout-image").src;

//     var product = {
//         colors: colors,
//         selected_color_idx: selected_color_idx,
//         size_names: size_names,
//         selected_size_idx: selected_size_idx,
//         product_name: product_name,
//         img_src: img_src
//     }
//     return (product);
// }