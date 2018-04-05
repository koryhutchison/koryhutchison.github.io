Omdb.setApiKey("7d8323b9");

// Omdb.getByImdbId({imdbid: "tt1825683"}).then(function (response) {
//     console.log(response);
// });
$(function () {
    $('#by-title').addClass('active');
    $('#search-by-title').show();
    $('#search-by-imdb').hide();
    $('#search-by-search').hide();

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
            console.log(response);
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
            console.log(response);
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
            console.log(response['Search'][resultNumber - 1]);
        });
    });

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
});
