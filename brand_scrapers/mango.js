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
    var size_spans = document.querySelectorAll('size-available');
    if (size_spans.length == 0) {
        size_spans = document.querySelectorAll('single-size');
    }
   
    for (let idx = 0; idx < size_spans.length; idx++) {
        size_names.push(size_spans[idx].innerText);
        if (size_spans[idx].getAttribute("aria-selected") == "true") {
            selected_size = size_spans[idx].innerText;
        }
    }

    var product_name = document.querySelector(".product-name").textContent;
    var img_src = document.querySelector(".image-1").src;

    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src
    }
    return (product);
}

// function mango_scraper() {
//     var size_spans = Array.from(document.getElementsByClassName('size-available'));
//     if (size_spans.length == 0) {
//         size_spans = Array.from(document.getElementsByClassName('single-size'));
//     }
//     var size_names = Array();
//     var selected_size_idx = -1;
//     for (let idx = 0; idx < size_spans.length; idx++) {
//         size_names.push(size_spans[idx].innerText);
//         if (size_spans[idx].getAttribute("aria-selected") == "true") {
//             selected_size_idx = idx;
//         }
//     }
//     var colors = Array();
//     var color_doms = Array.from(document.getElementsByClassName('color-container'));
//     var selected_color_idx = -1;
//     for (let idx = 0; idx < color_doms.length; idx++) {
//         if (color_doms[idx].getAttribute('aria-label').includes("selected")) {
//             selected_color_idx = idx;
//         }
//         var newColor = {
//             name: color_doms[idx].getAttribute('aria-label').replace(' selected', ''),
//             code: color_doms[idx].getAttribute('id')
//         };
//         colors.push(newColor);
//     }
//     var product_name = document.querySelector(".product-name").textContent;
//     var img_src = document.querySelector(".image-1").src;

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