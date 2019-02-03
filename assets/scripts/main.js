function init(){
    actionClickHandler({id: 'search'});
}

function actionClickHandler(e){
    var i, selectedPanelId, panelReference, parentReference;
    var iconSet = $(".tools img");
    for (i = 0; i < iconSet.length; i++) {
            selectedPanelId = '#' + iconSet[i].id  + 'Panel';
            panelReference = $(selectedPanelId)[0];
            if(!panelReference)
                return;
            if (iconSet[i].id !== e.id){
                panelReference.style.maxHeight = null;
            } else {
                panelReference.parentElement.removeChild(panelReference);
                parentReference = $('#panelParent')[0];
                if(!parentReference)
                    return;
                parentReference.appendChild(panelReference);
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