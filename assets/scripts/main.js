// Globallly required data

// Mock data for Dev testing
var data = [{"title":"Glass","poster_path":"/svIDTNUoajS8dLEo7EosxvyAsgJ.jpg","original_title":"Glass","backdrop_path":"/lvjscO8wmpEbIfOEZi92Je8Ktlg.jpg","release_date":"2019-01-16"},{"title":"Mortal Engines","poster_path":"/uXJVpPXxZO4L8Rz3IG1Y8XvZJcg.jpg","original_title":"Mortal Engines","backdrop_path":"/rxYG6Sj95as9rv9wKIHUx6ATWd3.jpg","release_date":"2018-12-05"},{"title":"Bohemian Rhapsody","poster_path":"/gbmkFWdtihe1VfydTDsieQ6VfGL.jpg","original_title":"Bohemian Rhapsody","backdrop_path":"/93xA62uLd5CwMOAs37eQ7vPc1iV.jpg","release_date":"2018-10-24"},{"title":"Aquaman","poster_path":"/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg","original_title":"Aquaman","backdrop_path":"/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg","release_date":"2018-12-07"},{"title":"Escape Room","poster_path":"/8yZAx7tlKRZIg7pJfaPhl00yHIQ.jpg","original_title":"Escape Room","backdrop_path":"/mWLljCmpqlcYQh7uh51BBMwCZwN.jpg","release_date":"2019-01-03"},{"title":"Creed II","poster_path":"/v3QyboWRoA4O9RbcsqH8tJMe8EB.jpg","original_title":"Creed II","backdrop_path":"/8yqLPNwNCtpOPc3XkOlkSMnghzw.jpg","release_date":"2018-11-21"},{"title":"Bumblebee","poster_path":"/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg","original_title":"Bumblebee","backdrop_path":"/hMANgfPHR1tRObNp2oPiOi9mMlz.jpg","release_date":"2018-12-15"},{"title":"Widows","poster_path":"/tvmPiTShsfp4vSUBFsCHYaX9M7i.jpg","original_title":"Widows","backdrop_path":"/71OjxI27tK7kTIiPnMkdQDx14pe.jpg","release_date":"2018-11-06"},{"title":"The Mule","poster_path":"/t0idiLMalKMj2pLsvqHrOM4LPdQ.jpg","original_title":"The Mule","backdrop_path":"/bkc4AY6FTa3yNqrshE9b1elDzPt.jpg","release_date":"2018-12-14"},{"title":"Polar","poster_path":"/qOBEpKVLl8Q9CZScbOcRRVISezV.jpg","original_title":"Polar","backdrop_path":"/u8CP7EeWbYMlIVqEoKAt6OYsEe1.jpg","release_date":"2019-01-25"}];

// var posterSrc = ''; // not required

var actionMode = 'search'; //C urrent mode of operation
var imageData = ''; // imageData of uploaded file when adding a movie


// initialization function
function init(){

    actionClickHandler({id: actionMode});

    getMovieData(); //Actual call to server

    // appendMovieItems(data); //For Mock data
    // attachHoverProperties(); //For Mock data

    /*focus event handler of input boxes*/
    $('#addPanel input.textBoxStyleMinimal').focus(function(){
        $(this)[0].value = '';
        $(this).data('placeholder', $(this).attr('placeholder')).attr('placeholder','');
    }).blur(function(){
        $(this).attr('placeholder',$(this).data('placeholder'));
    });
    /* window resize event handler */
    $( window ).resize(function() {
        if (!$("#searchBar")[0].is(":focus")) {
            actionClickHandler({id: actionMode});
        }
    });
}

/*
* clickHandler for all the 3 operation icons
* Sets the height of the selected panel and hides the rest
* */
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
    if(e.id !== 'search') {
        $("#searchBar")[0].value = '';
        searchKeyUpHandler();
    }
}

/*GET call to get the data from API*/
function getMovieData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //On network call success
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

/*
* Create DOM elements by cloning a dummy reference element
* and append them to DOM
* Movie posters are again fetched using their URLs
* */
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
        $($(newMovieItem).find('img')[0]).data('index', i);
        $(newMovieItem).find('.movieName')[0].innerText = responseData[i].original_title;
        $(newMovieItem).find('.movieYear')[0].innerText = responseData[i].release_date.substring(0, 4);
        newMovieRow.appendChild(newMovieItem);
    }
}

/*
* Attach hover event on these newly added elements
* */
function attachHoverProperties() {
    $(".movieItem img").hover(function () {
        if (actionMode !== 'delete')
            return;
        var a = $(this)[0];
        // posterSrc = a.attributes.src.value;
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

/*
* Search function triggered on keyUp event on searchBar
* Trims the search text and searches the data
* Search is case insensitive
* When no matching results are found, display appropriate message by toggling is display property
* */
function searchKeyUpHandler() {
    var input, filterText, i, noResults = true;
    input = $("#searchBar")[0];
    filterText = input.value.toLowerCase().trim();
    var movieItems = $(".realClass .movieItem");
    for (i = 0; i < movieItems.length; i++) {
        var currentMovieName = $(movieItems[i]).find('.movieName')[0].innerText;
        if (currentMovieName.toLowerCase().indexOf(filterText) > -1) {
            movieItems[i].style.display = "";
            noResults = false;
        } else {
            movieItems[i].style.display = "none";
        }
    }
    if(noResults){
        $("#nothingToShow").css('display', 'block');
    } else {
        $("#nothingToShow").css('display', 'none');
    }
}

/*
* Delete movie call
* This functions calls the delete API (Dummy and irrelevant API in this case since tmdb.com did not allow DELETE call)
* In order to simulate the DELETE call, a different API is called.
* On success of this, node is taken off from the DOM
* */
function deleteMovie(e) {
    if (actionMode !== 'delete')
        return;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $($(e).parent()[0]).remove();
            // $(e).parent()[0].style.display = "none";
        }
    };
    var url = 'https://jsonplaceholder.typicode.com/posts/' + $(e).data('index');
    xhttp.open("DELETE", url, true);
    xhttp.send();
}

/*
* Function to listen to fileUpload events
* This method checks if a file is selected and calls getData method to save the image data in imageData global property
* It also updates the placeholder text
* */
function fileUploadHandler(){
    var labelText = 'No image selected';
    var files = $('#uploadPhoto')[0].files;
    if(files.length !== 0) {
        labelText = files[0].name;
        $($('#uploadPhotoLabel')[0]).data('placeholder', labelText);
        setImageData(files[0]);
    } else {
        imageData = '';
    }
    $($('#uploadPhotoLabel')[0]).attr('placeholder', labelText).data('placeholder', labelText);
}

/*
* Function to trigger the dilog bol on click of the corresponding inputText field*/
function openFileUploadDialog(){
    $('#uploadPhoto').trigger('click');
}

/*
* This method reads the file using FileReader and save the image data in imageData global property
* */
function setImageData(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        imageData = e.target.result;
    };
    reader.readAsDataURL(file);
}

/*
* Handler function to validate if the data entered in the Add Panel operations are valid
* Calls postMovie if data is valid
* Alternatively shows error text if entered data is invalid
* */
function addMovieHandler(e) {
    var  newMovieNameValue, isValidYear;
    newMovieNameValue = $('#newMovieName')[0].value.trim();
    isValidYear = getIsValidYear($('#newMovieYear')[0]);
    if(imageData.indexOf('data:image') === 0  && newMovieNameValue && isValidYear){
        postMovie(newMovieNameValue, isValidYear);
    } else {
        if(imageData.indexOf('data:image') !== 0){
            $($('#uploadPhotoLabel')[0]).data('placeholder', 'Invalid file type');
            $('#uploadPhoto')[0].value = '';
        }
        if(!newMovieNameValue){
            $('#newMovieName')[0].value = 'Invalid Name';
        }
        if(!isValidYear){
            $('#newMovieYear')[0].value = 'Invalid Date';
        }
    }
}

/*
* Regext to match Year value
* Valid values: 1900 - 2019
* */
function getIsValidYear(e) {
    var regexForYear = new RegExp('^0*(19[0-8][0-9]|199[0-9]|200[0-9]|201[0-9])$');
    return e.value.match(regexForYear);
}

/*
* POST  movie call
* This functions calls the POST API (Dummy and irrelevant API in this case since tmdb.com did not allow POST call)
* In order to simulate the POST call, a different API is called.
* On success of this, a new node is created, current values in the input fields are cleared and appended to the DOM
* */
function postMovie(newMovieNameValue, isValidYear) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            createNodeAndAppend(imageData, newMovieNameValue, isValidYear[0]);
            attachHoverProperties();
            $('#newMovieName')[0].value = '';
            $('#newMovieYear')[0].value = '';
            $('#uploadPhoto')[0].value = '';
            fileUploadHandler();
        }
    };
    var url = 'https://jsonplaceholder.typicode.com/posts/';
    var body = {
        posterSrc: imageData,
        movieName: newMovieNameValue,
        movieYear: isValidYear[0]
    };
    xhttp.open("POST", url, true);
    xhttp.send(JSON.stringify(body));
}

/*
* Function to create a new node when POST movie call is successful
* */
function createNodeAndAppend(imageData, newMovieNameValue, yearOfRelease) {
    var newMovieItem = $(".dummyMovieItem").clone()[0];
    $(newMovieItem).find('img')[0].setAttribute('src', imageData);
    $($(newMovieItem).find('img')[0]).data('index', $(".realClass .dummyMovieItem").length + 1);
    $(newMovieItem).find('.movieName')[0].innerText = newMovieNameValue;
    $(newMovieItem).find('.movieYear')[0].innerText = yearOfRelease;
    $('.realClass')[0].appendChild(newMovieItem);
}
