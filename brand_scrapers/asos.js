function asos_scraper() {
    var selected_color;
    var color_doms = document.querySelectorAll("#aside-content .product-colour:not(.disabled)");
    console.assert(color_doms.length == 1, "ASOS: unexpected color dom found");
    if (color_doms.length == 1) {
        selected_color = {
            name: color_doms[0].innerText,
            code: "0"
        }
    }  

    var selected_size;
    const selected_size_txt = document.querySelector(".product-size").innerText;
    if (selected_size_txt != "Please select") {
        selected_size = selected_size_txt;
    }
    
    var product_name = document.querySelector(".product-hero h1").innerText;
    var img_src = document.querySelector(".fullImageContainer img").src;
    var regex = /[+-]?\d+(\.\d+)?/g;
    var selling_price = parseFloat(document.querySelector(".current-price").innerText.match(regex)[0]);

    var product = {
        selected_color: selected_color,
        selected_size: selected_size,
        product_name: product_name,
        img_src: img_src,
        selling_price: selling_price
    }
    return (product);
}

// function asos_scraper() {
//     var colors = Array();
//     var color_doms = document.querySelectorAll(".product-colour:not(.disabled)");
//     var selected_color_idx = -1;
//     console.assert(color_doms.length == 1, "ERROR: ASOS - found multiple color choices");
//     if (color_doms.length == 1) {
//         selected_color_idx = 0;
//         var newColor = {
//             name: color_doms[0].innerText,
//             code: "0"
//         }
//         colors.push(newColor);
//     }

//     var size_names = Array();
//     var selected_size_idx = -1;
//     var size_options = document.querySelectorAll(".colour-size-select")[1].querySelectorAll("option");
//     var selected_size_name = document.querySelector(".product-size").innerText;
//     for (let idx = 0; idx < size_options.length; idx++) {
//         if (size_options[idx].innerText == selected_size_name) {
//             selected_size_idx = idx;
//         }
//         size_names.push(size_options[idx].innerText);
//     }
    
//     var product_name = document.querySelector(".product-hero h1").innerText;
//     var img_src = document.querySelector(".fullImageContainer img").src;

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