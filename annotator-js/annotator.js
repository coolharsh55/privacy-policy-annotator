// source: https://stackoverflow.com/questions/25018700/show-custom-menu-on-text-selection

// if (!window.x) {
//     x = {};
// }

// x.Selector = {};
// x.Selector.getSelected = function() {
//     var t = '';
//     if (window.getSelection) {
//         t = window.getSelection();
//     } else if (document.getSelection) {
//         t = document.getSelection();
//     } else if (document.selection) {
//         t = document.selection.createRange().text;
//     }
//     return t;
// }

$(document).ready(function() {
    {
        let  stylesheet = "\
            .toolbar-item {\
                padding: 5px; margin: 5px; border: 1px solid black; font-size: 0.75em; display: block; width: 100px;\
            }\
            .data-category {\
                background-color: rgba(255,0,0,0.4);\
            }\
            .data-type {\
                background-color: rgba(150,50,50,0.4);\
            }\
            .process {\
                background-color: rgba(0,0,250,0.2);\
            }\
            .legal-basis {\
                background-color: rgba(0,200,250,0.4);\
            }\
            .data-source {\
                background-color: rgba(100,200,50,0.4);\
            }\
            .processor {\
                background-color: rgba(250,200,0,0.4);\
            }\
            .third-party {\
                background-color: rgba(150,255,0,0.4);\
            }\
            .data-sharing {\
                background-color: rgba(150,55,200,0.6);\
            }\
            .consent {\
                background-color: rgba(150,155,50,0.4);\
            }\
            .rights {\
                background-color: rgba(100,155,250,0.4);\
            }\
            .automated {\
                background-color: rgba(250,175,25,0.6);\
            }\
            .location {\
                background-color: rgba(150,50,125,0.2);\
            }\
            .data-retention {\
                background-color: rgba(50,50,225,0.4);\
            }";
        var style=document.createElement('style');
        style.type='text/css';
        if(style.styleSheet){
            style.styleSheet.cssText=stylesheet;
        }else{
            style.appendChild(document.createTextNode(stylesheet));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
        let toolbar  = '\
        <div id="toolbar" \
                style="position:fixed; top:10px; right:10px; \
                background:#FFF; padding: 10px; z-index: 2;\
                display: block;">\
            <button class="toolbar-item data-category">data category</button>\
            <button class="toolbar-item data-type">data type</button>\
            <button class="toolbar-item process">process</button>\
            <button class="toolbar-item legal-basis">legal basis</button>\
            <button class="toolbar-item data-source">data source</button>\
            <button class="toolbar-item processor">processor</button>\
            <button class="toolbar-item third-party">third party</button>\
            <button class="toolbar-item data-sharing">data sharing</button>\
            <button class="toolbar-item consent">consent</button>\
            <button class="toolbar-item rights">rights</button>\
            <button class="toolbar-item automated">automated</button>\
            <button class="toolbar-item location">location</button>\
            <button class="toolbar-item data-retention">data retention</button>\
        </div>\
        ';
        $('body').append(toolbar);

    }

    // $(document).bind("mouseup", function() {
    //     var selectedText = x.Selector.getSelected();
    // });
    // $(document).on("mousedown", function(e){
    //     pageX = e.pageX;
    //     pageY = e.pageY;
    // });
    // $('div.tools>span').on('click', function() {
    //     console.log(window.clip.rangeCount, window.clip.toString());
    //     if (window.clip.toString().length > 0) {
    //         var span = document.createElement("span");
    //         span.style.color = "red";
    //         console.log(window.clip.rangeCount);
    //         var selection = window.clip;
    //         console.log("range:" + window.clip.rangeCount)
    //         if (selection.rangeCount) {
    //             console.log("do");
    //             var range = selection.getRangeAt(0).cloneRange();
    //             range.surroundContents(span);
    //             selection.removeAllRanges();
    //             selection.addRange(range);
    //         }
    //     }
    // });

    $('.toolbar-item').on('click', function() {
        console.log($(this).text());
        var selection= window.getSelection().getRangeAt(0);
        var selectedText = selection.extractContents();
        var span = document.createElement("span");
        span.className = "annotation-item " + $(this).text().split(' ').join('-');
        // span.style.backgroundColor = "yellow";
        span.appendChild(selectedText);
        selection.insertNode(span);
        clearSelection();
    });
});

function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}

// NOTES:
// show a floating menu containing the different classes, just like the dashboard
// these are buttons
// on clicking the button, the selected text is annotated with the specific class