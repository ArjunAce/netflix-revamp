var data = [
    {
        "title": "Glass",
        "poster_path": "/svIDTNUoajS8dLEo7EosxvyAsgJ.jpg",
        "original_title": "Glass",
        "backdrop_path": "/lvjscO8wmpEbIfOEZi92Je8Ktlg.jpg",
        "release_date": "2019-01-16"
    },
    {
        "title": "Mortal Engines",
        "poster_path": "/uXJVpPXxZO4L8Rz3IG1Y8XvZJcg.jpg",
        "original_title": "Mortal Engines",
        "backdrop_path": "/rxYG6Sj95as9rv9wKIHUx6ATWd3.jpg",
        "release_date": "2018-12-05"
    },
    {
        "title": "Bohemian Rhapsody",
        "poster_path": "/gbmkFWdtihe1VfydTDsieQ6VfGL.jpg",
        "original_title": "Bohemian Rhapsody",
        "backdrop_path": "/93xA62uLd5CwMOAs37eQ7vPc1iV.jpg",
        "release_date": "2018-10-24"
    },
    {
        "title": "Aquaman",
        "poster_path": "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
        "original_title": "Aquaman",
        "backdrop_path": "/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg",
        "release_date": "2018-12-07"
    },
    {
        "title": "Escape Room",
        "poster_path": "/8yZAx7tlKRZIg7pJfaPhl00yHIQ.jpg",
        "original_title": "Escape Room",
        "backdrop_path": "/mWLljCmpqlcYQh7uh51BBMwCZwN.jpg",
        "release_date": "2019-01-03"
    },
    {
        "title": "Creed II",
        "poster_path": "/v3QyboWRoA4O9RbcsqH8tJMe8EB.jpg",
        "original_title": "Creed II",
        "backdrop_path": "/8yqLPNwNCtpOPc3XkOlkSMnghzw.jpg",
        "release_date": "2018-11-21"
    },
    {
        "title": "Bumblebee",
        "poster_path": "/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg",
        "original_title": "Bumblebee",
        "backdrop_path": "/hMANgfPHR1tRObNp2oPiOi9mMlz.jpg",
        "release_date": "2018-12-15"
    },
    {
        "title": "Widows",
        "poster_path": "/tvmPiTShsfp4vSUBFsCHYaX9M7i.jpg",
        "original_title": "Widows",
        "backdrop_path": "/71OjxI27tK7kTIiPnMkdQDx14pe.jpg",
        "release_date": "2018-11-06"
    },
    {
        "title": "The Mule",
        "poster_path": "/t0idiLMalKMj2pLsvqHrOM4LPdQ.jpg",
        "original_title": "The Mule",
        "backdrop_path": "/bkc4AY6FTa3yNqrshE9b1elDzPt.jpg",
        "release_date": "2018-12-14"
    },
    {
        "title": "Polar",
        "poster_path": "/qOBEpKVLl8Q9CZScbOcRRVISezV.jpg",
        "original_title": "Polar",
        "backdrop_path": "/u8CP7EeWbYMlIVqEoKAt6OYsEe1.jpg",
        "release_date": "2019-01-25"
    }
];
var posterSrc = '';
var actionMode;

function init(){
    actionClickHandler({id: 'search'});
    // getMovieData();
    $('input').focus(function(){
        $(this).data('placeholder', $(this).attr('placeholder')).attr('placeholder','');
    }).blur(function(){
        $(this).attr('placeholder',$(this).data('placeholder'));
    });
    appendMovieItems(data);
    attachHoverProperties();
}

function actionClickHandler(e){
    actionMode = e.id;
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
    }

}

function getMovieData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var responseData = JSON.parse(xhttp.responseText);
            responseData = responseData.results.slice(0, 10);
            appendMovieItems(responseData);
            attachHoverProperties();
        }
    };
    var apiKey = 'api_key=6a469373bd2698c12b609d870b56e961';
    var filters = '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
    var url = 'https://api.themoviedb.org/3/discover/movie?' + apiKey + filters;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function appendMovieItems(responseData) {
    var i, newMovieRow, newMovieItem;
    var movieLibraryElement = $("#movieLibrary")[0];
    for (i = 0; i < responseData.length; i++) {
        if(i%10 == 0){
            newMovieRow = $("#dummyMovieRow").clone()[0];
            newMovieRow.classList.add('realClass');
            newMovieRow.style.display = 'block';
            movieLibraryElement.appendChild(newMovieRow);
            newMovieItem = $(".realClass .dummyMovieItem")[i];
        } else{
            newMovieItem = $(".dummyMovieItem").clone()[0];
        }
        $(newMovieItem).find('img')[0].setAttribute('src', "https://image.tmdb.org/t/p/w185" + responseData[i].poster_path);
        $(newMovieItem).find('.movieName')[0].innerText = responseData[i].original_title;
        $(newMovieItem).find('.movieYear')[0].innerText = responseData[i].release_date.substring(0, 4);
        newMovieRow.appendChild(newMovieItem);
    }
}

function attachHoverProperties() {
    $(".movieItem img").hover(function () {
        if (actionMode !== 'delete')
            return;
        var a = $(this)[0];
        posterSrc = a.attributes.src.value;
        // a.setAttribute('src', 'assets/icons/trash-185_new.png');
        $(a).css('filter', 'blur(2px)');
    }, function () {
        if (actionMode !== 'delete')
            return;
        var a = $(this)[0];
        $(a).css('filter', 'none');
        // a.setAttribute('src', posterSrc);
    });
}

function onKeyUpHandler() {
    var input, filterText, i;
    input = $("#searchBar")[0];
    filterText = input.value.toLowerCase().trim();
    var movieItems = $(".realClass .movieItem");
    for (i = 0; i < movieItems.length; i++) {
        var currentMovieName = $(movieItems[i]).find('.movieName')[0].innerText;
        if (currentMovieName.toLowerCase().indexOf(filterText) > -1) {
            movieItems[i].style.display = "";
        } else {
            movieItems[i].style.display = "none";
        }
    }
}