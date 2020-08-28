let slideIndex = 0;
let slideshowIsActive = true;

let contentType = "";
let resultType = "";

let favorites = [];


$(document).ready(function() {
    // iniciar slideshow ao carregar a página
    let slideshowId = showSlideshow(slideshowIsActive);


    // clicar no botão para a pesquisa principal
    $(".btn-search").click(function(e) {
        e.preventDefault();

        contentType = getContentType();
        let searchText = getSearchText($("#textSearch"));
        resultType = getResultType();

        if (contentType != "" && searchText != "" && resultType != "") {
            let domain = "https://tastedive.com/api/similar";
            let apiKey = "382610-popcorn-40K5FW57";
            let encodedText = encodeURIComponent(contentType + ":" + searchText);

            // fazer pedido à API
            $.ajax({
                dataType: "jsonp",
                jsonp: "callback",
                type: "post",
                url: domain + "?k=" + apiKey + "&q=" + encodedText + "&info=1&limit=3&type=" + resultType,

                success: function(response) {
                    let numberOfResults = getNumberOfResults(response);

                    if (numberOfResults > 0) {
                        // ao fazer a pesquisa pela primeira vez, remove o slideshow
                        if (slideshowIsActive) {
                            slideshowIsActive = disableSlideshow(slideshowId);
                            removeSlideshow();
                        }

                        let results = getResults(response);
                        createCardsHTML(results, resultType);
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
    $("#cards").on("click", ".card .search-icon", function(e) {
        e.preventDefault();

        let searchText = getSearchText($(this).parent().children("h3"));
        destroyCardsHTML();

        let domain = "https://tastedive.com/api/similar";
        let apiKey = "382610-popcorn-40K5FW57";
        let encodedText = encodeURIComponent(contentType + ":" + searchText);

        // fazer pedido à API
        $.ajax({
            dataType: "jsonp",
            jsonp: "callback",
            type: "post",
            url: domain + "?k=" + apiKey + "&q=" + encodedText + "&info=1&limit=3&type=" + resultType,

            success: function(response) {
                let numberOfResults = getNumberOfResults(response);

                if (numberOfResults > 0) {
                    let results = getResults(response);
                    createCardsHTML(results, resultType);
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
    $("#cards").on("click", ".card .favorite-icon", function() {
        let name = $(this).parent().children("h3").text();

        if (!favorites.includes(name)) {
            favorites = addFavorite(favorites, name);
            createFavoriteHTML(name, resultType);
            increaseNumberOfFavorites();
        }
    });


    // clicar no botão de remover favorito
    $("#favorites").on("click", ".favorite .btn-del", function() {
        let name = $(this).parent().children("h4").text();
        let favorite_div = $(this).parent();

        favorites = removeFavorite(favorites, name);
        destroyFavoriteHTML(favorite_div);
        decreaseNumberOfFavorites();
    });


    // clicar no botão de mostrar a lista favoritos
    $(".btn-fav").click(function() {
        $("#mySidenav").css("width", "300px");
    });


    // clicar no botão de esconder a lista favoritos
    $(".closebtn").click(function() {
        $("#mySidenav").css("width", "0px");
    });


    // clicar no botão para exportar favoritos para JSON
    $(".export").click(function() {
        console.log(JSON.stringify(favorites));
    });


    // clicar no botão para ir para o topo da página
    $(".btn-up").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });
});