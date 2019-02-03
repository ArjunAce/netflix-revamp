function init(){
    // alert('zxc');
}

function actionClickHandler(e){
    var iconSet = $(".tools img");
    for (var i = 0; i < iconSet.length; i++) {
        // if(iconSet[i].id !== e.id){
            var selectedPanelId = '#' + iconSet[i].id  + 'Panel';
            var panelReference = $(selectedPanelId)[0];
            if (iconSet[i].id !== e.id){
                panelReference.style.maxHeight = null;
            } else {
                panelReference.style.maxHeight = panelReference.scrollHeight + "px";
            }
        // }
    }

/*
    e.classList.toggle("active");
    // var panelReference = e.nextElementSibling;
    var selectedPanelId = '#' + e.id + 'Panel';
    var panelReference = $(selectedPanelId)[0];
    if (panelReference.style.maxHeight){
        panelReference.style.maxHeight = null;
    } else {
        panelReference.style.maxHeight = panelReference.scrollHeight + "px";
    }
*/

}