Omdb.setApiKey("7d8323b9");

// Omdb.getByImdbId({imdbid: "tt1825683"}).then(function (response) {
//     console.log(response);
// });
$(function () {
    $('#by-title').addClass('active');
    $('#search-by-title').show();
    $('#search-by-imdb').hide();
    $('#search-by-search').hide();

    $('#submit-btn').click(function (event) {
        let options = {};
        event.preventDefault();
        if ($('#title-input').val().length != 0) {
            options.title = $('#title-input').val();
        }
        if ($('#season-input').val().length != 0) {
            options.season = $('#season-input').val();
        }
        if ($('#episode-input').val().length != 0) {
            options.episode = $('#episode-input').val();
        }
        if ($('#plot-select').val().length != 0) {
            options.plot = $('#plot-select').val();
        }
        if ($('#type-select').val().length != 0) {
            options.type = $('#type-select').val();
        }
        if ($('#year-input').val().length != 0) {
            options.year = $('#year-input').val();
        }
        Omdb.getByTitle(options).then(function (response) {
            console.log(response);
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
