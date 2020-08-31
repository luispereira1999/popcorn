let imageIndex = 0;
let slideshowIsActive = true;

let searchContentType = "";
let searchResultType = "";

let favorites = [];


$(document).ready(function() {
    // iniciar slideshow ao carregar a página
    let slideshowId = showSlideshow();

    // clicar no botão para a pesquisa principal
    $(".btn-search").click(function(e) {
        e.preventDefault();

        searchContentType = getSearchContentOption();
        let textToSearch = getInputText();
        searchResultType = getSearchResultOption();

        if (searchContentType != "" && textToSearch != "" && searchResultType != "") {
            // URL para fazer a chamada à API
            let apiKey = "382610-popcorn-40K5FW57";
            let searchQuery = encodeURIComponent(searchContentType + ":" + textToSearch);
            let url = "https://tastedive.com/api/similar?k=" + apiKey + "&q=" + searchQuery + "&type=" + searchResultType + "&info=1&limit=6";

            // fazer chamada à API
            $.ajax({
                dataType: "jsonp",
                jsonp: "callback",
                type: "get",
                url: url,

                success: function(response) {
                    let numberOfResults = getNumberOfResults(response);

                    if (numberOfResults > 0) {
                        // ao fazer a pesquisa pela primeira vez, remove o slideshow
                        if (slideshowIsActive) {
                            slideshowIsActive = disableSlideshow(slideshowId);
                            removeSlideshow();
                        }

                        let results = getResults(response);
                        createCardsHTML(results, searchResultType);
                    } else {
                        showMessage("Sem resultados!", "error");
                    }
                },

                error: function() {
                    showMessage("Erro ao comunicar com o servidor!", "error");
                }
            });
        } else {
            showMessage("Valor não inserido!", "error");
        }
    });


    // clicar no botão de pesquisa em um card
    $(".cards").on("click", ".card .search-icon", function(e) {
        e.preventDefault();

        let h3_card = $(this).parent().children("h3");
        let textToSearch = getTitleText(h3_card);
        // remover cards da pesquisa anterior
        destroyCardsHTML();

        // URL para fazer a chamada à API
        let apiKey = "382610-popcorn-40K5FW57";
        let searchQuery = searchContentType + ":" + textToSearch;
        let url = "https://tastedive.com/api/similar?k=" + apiKey + "&q=" + searchQuery + "&type=" + searchResultType + "&info=1&limit=6";

        // fazer chamada à API
        $.ajax({
            dataType: "jsonp",
            jsonp: "callback",
            type: "get",
            url: url,

            success: function(response) {
                let numberOfResults = getNumberOfResults(response);

                if (numberOfResults > 0) {
                    let results = getResults(response);
                    createCardsHTML(results, searchResultType);
                } else {
                    showMessage("Sem resultados!", "error");
                }
            },

            error: function() {
                showMessage("Erro ao comunicar com o servidor!", "error");
            }
        });
    });


    // clicar no ícone de favorito em um card
    $(".cards").on("click", ".card .favorite-icon", function() {
        let title = $(this).parent().children("h3").text();

        if (!favorites.includes(title)) {
            favorites = addFavorite(favorites, title);
            createFavoriteHTML(title, searchResultType);

            let numberOfFavorites = getNumberOfFavorites();
            numberOfFavorites = increaseNumberOfFavorites(numberOfFavorites);
            updateNumberOfFavoritesOnPage(numberOfFavorites);
        }
    });


    // clicar no botão de remover favorito
    $(".favorites-items").on("click", ".favorite .btn-del", function() {
        let title = $(this).parent().children("h4").text();
        let div_favorite = $(this).parent();
        favorites = removeFavorite(favorites, title);
        destroyFavoriteHTML(div_favorite);

        let numberOfFavorites = getNumberOfFavorites();
        numberOfFavorites = decreaseNumberOfFavorites(numberOfFavorites);
        updateNumberOfFavoritesOnPage(numberOfFavorites);
    });


    // clicar no botão de mostrar a lista favoritos
    $(".btn-open").click(function() {
        $(".favorites").css("width", "300px");
    });


    // clicar no botão de esconder a lista favoritos
    $(".btn-close").click(function() {
        $(".favorites").css("width", "0px");
    });


    // clicar no botão para exportar favoritos para JSON
    $(".favorites-export").click(function() {
        console.log(JSON.stringify(favorites));
    });


    // clicar no botão para ir para o topo da página
    $(".btn-up").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });
});