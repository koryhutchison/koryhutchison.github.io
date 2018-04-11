Omdb.setApiKey("7d8323b9");

function addToDom(response, search) {
    console.log(response);
    let text;
    let poster;
    if (response.Response == "True") {
        poster = "<img src=\"" + response.Poster + "\" id=\"poster\" class=\"img-fluid\" />"
        text = "<p>Title: " + response.Title +
        "</p><p>Year: " + response.Year +
        "</p><p>Rating: " + response.Rated +
        "</p><p>IMDb Rating: " + response.imdbRating +
        "</p><p>Metascore: " + response.Metascore +
        "</p><p>Runtime: " + response.Runtime +
        "</p><p>Box Office: " + response.BoxOffice +
        "</p><p>Awards: " + response.Awards +
        "</p><p>Plot: " + response.Plot +
        "</p>";
    } else if (search == "True") {
        poster = "<img src=\"" + response.Poster + "\" id=\"poster\" class=\"img-fluid\" />"
        text = "<p>Title: " + response.Title +
        "</p><p>Year: " + response.Year +
        "</p><p>IMDb ID: " + response.imdbID +
        "</p><p>Type: " + response.Type +
        "</p>";
    } else {
        poster = "";
        text = "<p>Error: " + response.Error + "</p>";
    }
    $('#resultText').html(text);
    $('#resultPoster').html(poster);
}

$(function () {
    // Initialize the page to show the right tab and right active links
    $('#by-title').addClass('active');
    $('#ex-initial').addClass('active');
    $('#desc-initial').show();
    $('#desc-api').hide();
    $('#desc-title').hide();
    $('#desc-options').hide();
    $('#desc-search').hide();
    $('#desc-pages').hide();
    $('#desc-pagecount').hide();
    $('#search-by-title').show();
    $('#search-by-imdb').hide();
    $('#search-by-search').hide();

    // Put date in the footer
    let date = new Date();
    let year = date.getFullYear();
    $('#footer-year').html(year);
    
    // Put in a example result from the beginning
    // Omdb.getByTitle({ title: "Black Panther" }).then(function (response) {
    //     addToDom(response);
    // });

    // Put the example javascript code in for setting api key
    $('#codeExample').text("<script type=\"text/javascript\" src=\"omdb.js\"></script>\n<script type=\"text/javascript\" src=\"main.js\"></script>").html();

    // Get info from title form and display on screen
    $('#submit-btn-title').click(function (event) {
        let options = {};
        event.preventDefault();
        if ($('#title-input').val().length != 0) {
            options.title = $('#title-input').val();
        }
        if ($('#season-input-title').val().length != 0) {
            options.season = $('#season-input-title').val();
        }
        if ($('#episode-input-title').val().length != 0) {
            options.episode = $('#episode-input-title').val();
        }
        if ($('#plot-select-title').val().length != 0) {
            options.plot = $('#plot-select-title').val();
        }
        if ($('#type-select-title').val().length != 0) {
            options.type = $('#type-select-title').val();
        }
        if ($('#year-input-title').val().length != 0) {
            options.year = $('#year-input-title').val();
        }
        Omdb.getByTitle(options).then(function (response) {
            addToDom(response);
        });
    });

    // Get info from imdb form and display on screen
    $('#submit-btn-imdb').click(function (event) {
        let options = {};
        event.preventDefault();
        if ($('#imdb-input').val().length != 0) {
            options.imdbid = $('#imdb-input').val();
        }
        if ($('#season-input-imdb').val().length != 0) {
            options.season = $('#season-input-imdb').val();
        }
        if ($('#episode-input-imdb').val().length != 0) {
            options.episode = $('#episode-input-imdb').val();
        }
        if ($('#plot-select-imdb').val().length != 0) {
            options.plot = $('#plot-select-imdb').val();
        }
        Omdb.getByImdbId(options).then(function (response) {
            addToDom(response);
        });
    });

    // Get info from search form and display on screen
    $('#submit-btn-search').click(function (event) {
        let resultNumber = 1;
        let options = {};
        event.preventDefault();
        if ($('#search-input').val().length != 0) {
            options.searchText = $('#search-input').val();
        }
        if ($('#page-input-search').val().length != 0) {
            options.page = $('#page-input-search').val();
        }
        if ($('#result-input-search').val().length != 0) {
            resultNumber = $('#result-input-search').val();
        }
        if ($('#type-select-search').val().length != 0) {
            options.type = $('#type-select-search').val();
        }
        if ($('#year-input-search').val().length != 0) {
            options.year = $('#year-input-search').val();
        }
        Omdb.findBySearch(options).then(function (response) {
            let search = response.Response;
            addToDom(response['Search'][resultNumber - 1], search);
        });
    });

    // Control showing or hiding the different tabs in the try it out section
    $('#by-title').click(function (event) {
        event.preventDefault();
        $('#search-by-title').show();
        $('#by-title').addClass('active');
        $('#search-by-imdb').hide();
        $('#search-by-search').hide();
        $('#by-imdb').removeClass('active');
        $('#by-search').removeClass('active');
    });

    $('#by-imdb').click(function (event) {
        event.preventDefault();
        $('#search-by-title').hide();
        $('#search-by-imdb').show();
        $('#by-imdb').addClass('active');
        $('#search-by-search').hide();
        $('#by-title').removeClass('active');
        $('#by-search').removeClass('active');
    });

    $('#by-search').click(function (event) {
        event.preventDefault();
        $('#search-by-title').hide();
        $('#search-by-imdb').hide();
        $('#search-by-search').show();
        $('#by-search').addClass('active');
        $('#by-imdb').removeClass('active');
        $('#by-title').removeClass('active');
    });

    // Handle clicks in examples
    $('#ex-initial').click(function (event) {
        event.preventDefault();
        // Add or remove active class
        $('#ex-initial').addClass('active');
        $('#ex-api').removeClass('active');
        $('#ex-title').removeClass('active');
        $('#ex-options').removeClass('active');
        $('#ex-search').removeClass('active');
        $('#ex-pages').removeClass('active');
        $('#ex-pagecount').removeClass('active');

        // Show correct description
        $('#desc-initial').show();
        $('#desc-api').hide();
        $('#desc-title').hide();
        $('#desc-options').hide();
        $('#desc-search').hide();
        $('#desc-pages').hide();
        $('#desc-pagecount').hide();

        // Write code to the screen
        $('#codeExample').text("<script type=\"text/javascript\" src=\"omdb.js\"></script>\n<script type=\"text/javascript\" src=\"main.js\"></script>").html();
    });
    $('#ex-api').click(function (event) {
        event.preventDefault();
        // Add or remove active class
        $('#ex-initial').removeClass('active');
        $('#ex-api').addClass('active');
        $('#ex-title').removeClass('active');
        $('#ex-options').removeClass('active');
        $('#ex-search').removeClass('active');
        $('#ex-pages').removeClass('active');
        $('#ex-pagecount').removeClass('active');

        // Show correct description
        $('#desc-initial').hide();
        $('#desc-api').show();
        $('#desc-title').hide();
        $('#desc-options').hide();
        $('#desc-search').hide();
        $('#desc-pages').hide();
        $('#desc-pagecount').hide();

        // Write code to the screen
        $('#codeExample').text("Omdb.setApiKey(\"<API KEY>\");").html();
    });
    $('#ex-title').click(function (event) {
        event.preventDefault();
        // Add or remove active class
        $('#ex-initial').removeClass('active');
        $('#ex-api').removeClass('active');
        $('#ex-title').addClass('active');
        $('#ex-options').removeClass('active');
        $('#ex-search').removeClass('active');
        $('#ex-pages').removeClass('active');
        $('#ex-pagecount').removeClass('active');

        // Show correct description
        $('#desc-initial').hide();
        $('#desc-api').hide();
        $('#desc-title').show();
        $('#desc-options').hide();
        $('#desc-search').hide();
        $('#desc-pages').hide();
        $('#desc-pagecount').hide();

        // Write code to the screen
        $('#codeExample').text("Omdb.getByTitle(options).then(function (response) {\n    console.log(response);\n}).catch(function(error) {\n    console.log(\"Failed!\", error);\n});").html();
    });
    $('#ex-options').click(function (event) {
        event.preventDefault();
        // Add or remove active class
        $('#ex-initial').removeClass('active');
        $('#ex-api').removeClass('active');
        $('#ex-title').removeClass('active');
        $('#ex-options').addClass('active');
        $('#ex-search').removeClass('active');
        $('#ex-pages').removeClass('active');
        $('#ex-pagecount').removeClass('active');

        // Show correct description
        $('#desc-initial').hide();
        $('#desc-api').hide();
        $('#desc-title').hide();
        $('#desc-options').show();
        $('#desc-search').hide();
        $('#desc-pages').hide();
        $('#desc-pagecount').hide();

        // Write code to the screen
        $('#codeExample').text("let options = { title: \"Black Panther\", year: \"2018\" }").html();
    });
    $('#ex-search').click(function (event) {
        event.preventDefault();
        // Add or remove active class
        $('#ex-initial').removeClass('active');
        $('#ex-api').removeClass('active');
        $('#ex-title').removeClass('active');
        $('#ex-options').removeClass('active');
        $('#ex-search').addClass('active');
        $('#ex-pages').removeClass('active');
        $('#ex-pagecount').removeClass('active');

        // Show correct description
        $('#desc-initial').hide();
        $('#desc-api').hide();
        $('#desc-title').hide();
        $('#desc-options').hide();
        $('#desc-search').show();
        $('#desc-pages').hide();
        $('#desc-pagecount').hide();

        $('#codeExample').text("Omdb.findBySearch(options).then(function (response) {\n    console.log(response);\n}).catch(function(error) {\n    console.log(\"Failed!\", error);\n});").html();
    });
    $('#ex-pages').click(function (event) {
        event.preventDefault();
        // Add or remove active class
        $('#ex-initial').removeClass('active');
        $('#ex-api').removeClass('active');
        $('#ex-title').removeClass('active');
        $('#ex-options').removeClass('active');
        $('#ex-search').removeClass('active');
        $('#ex-pages').addClass('active');
        $('#ex-pagecount').removeClass('active');

        // Show correct description
        $('#desc-initial').hide();
        $('#desc-api').hide();
        $('#desc-title').hide();
        $('#desc-options').hide();
        $('#desc-search').hide();
        $('#desc-pages').show();
        $('#desc-pagecount').hide();

        $('#codeExample').text("let numPages = Omdb.getPages({ searchText: \"Batman\" });").html();
    });
    $('#ex-pagecount').click(function (event) {
        event.preventDefault();
        // Add or remove active class
        $('#ex-initial').removeClass('active');
        $('#ex-api').removeClass('active');
        $('#ex-title').removeClass('active');
        $('#ex-options').removeClass('active');
        $('#ex-search').removeClass('active');
        $('#ex-pages').removeClass('active');
        $('#ex-pagecount').addClass('active');

        // Show correct description
        $('#desc-initial').hide();
        $('#desc-api').hide();
        $('#desc-title').hide();
        $('#desc-options').hide();
        $('#desc-search').hide();
        $('#desc-pages').hide();
        $('#desc-pagecount').show();

        $('#codeExample').text("let promiseArray = Omdb.searchByPageCount(numPages, options);").html();
    });



});
