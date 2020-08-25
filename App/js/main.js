// é o tipo de conteúdo que será a pesquisa
let contentType = "";
// é o texto da pesquisa
let searchText = "";
// é o tipo de resultado que será encontrado na pesquisa
let resultType = "";

// guarda os dados de todos os resultado da pesquisa
let results = [];

// guarda a lista de favoritos
let favorites = [];
let numberOfFavorites = 0;
// índice atual da lista de favoritos
// let currentFavoriteIndex = 0;

let slideIndex = 0;
let slideshowIsActive = true;
let slideshowId = 0;


$(document).ready(function() {
    // iniciar slideshow ao carregar a página
    slideshowId = showSlideshow(slideshowIsActive);


    // clicar no botão para a pesquisa principal
    $(".btn-search").click(function(e) {
        e.preventDefault();

        // obtém o elemento da dropdown do conteúdo da pesquisa
        let dropdown_content = document.getElementsByName("userSearch")[0];
        // obtém o elemento da opção da dropdown do conteúdo da pesquisa
        let option_content = dropdown_content.options[dropdown_content.selectedIndex];
        // obtém o elemento da dropdown do resultado da pesquisa
        let dropdown_result = document.getElementsByName("userFound")[0];
        // obtém o elemento da opção da dropdown do resultado da pesquisa
        let option_result = dropdown_result.options[dropdown_result.selectedIndex];
        // obtém o elemento do input da pesquisa
        let input_search = document.getElementsByClassName("text-search")[0];

        if ($(input_search).val() != "" && $(option_content).val() != "" && $(option_result).val() != "") {
            contentType = option_content.value;
            resultType = option_result.value;
            searchText = input_search.value;

            let domain = "https://tastedive.com/api/similar";
            let apiKey = "382610-popcorn-40K5FW57";
            let encodedText = encodeURIComponent(contentType + ":" + searchText);

            $.ajax({
                // configurar pedido à API
                dataType: "jsonp",
                jsonp: "callback",
                type: "post",
                url: domain + "?k=" + apiKey + "&q=" + encodedText + "&info=1&limit=3&type=" + resultType,

                // obtém os resultados da pesquisa
                success: function(response) {
                    // obtém o número de resultados
                    let numberOfResults = getNumberOfResults(response);

                    if (numberOfResults > 0) {
                        // ao fazer a pesquisa pela primeira vez, remove o slideshow
                        if (slideshowIsActive) {
                            clearTimeout(slideshowId);
                            $("section").remove("#slideshow");
                            slideshowIsActive = false;
                        }

                        // obtém os resultados da pesquisa para um array de objetos
                        results = getResults(response, numberOfResults, results);

                        // é o texto que indica a pesquisa realizada
                        let searchPresentationText = "Texto de Apresentação: ";

                        setCards(results, numberOfResults, resultType);
                        //console.log(searchPresentationText);
                    } else {
                        showMessage("Sem resultados!", "error");
                    }
                }
            });
        } else {
            showMessage("Valor não inserido!", "error");
        }
    });


    // clicar num botão de pesquisa de um card
    $(".cards-section").on("click", ".card .search-icon", function(e) {
        e.preventDefault();

        let parentIndex = $(this).parent().index();
        searchText = results[parentIndex].name;

        results = [];
        alert("Novo texto da pesquisa:" + searchText);

        $(".card").remove();

        let domain = "https://tastedive.com/api/similar";
        let apiKey = "382610-popcorn-40K5FW57";
        let encodedText = encodeURIComponent(contentType + ":" + searchText);

        $.ajax({
            // configurar pedido à API
            dataType: "jsonp",
            jsonp: "callback",
            type: "post",
            url: domain + "?k=" + apiKey + "&q=" + encodedText + "&info=1&limit=3&type=" + resultType,

            // obtém os resultados da pesquisa
            success: function(response) {
                // obtém o número de resultados
                let numberOfResults = getNumberOfResults(response);

                if (numberOfResults > 0) {
                    // obtém os resultados da pesquisa para um array de objetos
                    results = getResults(response, numberOfResults, results);

                    // é o texto que indica a pesquisa realizada
                    let searchPresentationText = "Texto de Apresentação: ";

                    //ShowResults(results, numberOfResults);
                    setCards(results, numberOfResults);
                    //console.log(searchPresentationText);
                } else {
                    showMessage("Sem resultados!", "error");
                }
            }
        });
    });


    // clicar num ícone de favorito de um card
    $(".cards-section").on("click", ".card .favorite-icon", function() {
        let name = $(this).parent().children("h3").text();

        if (!favorites.includes(name)) {
            favorites = addFavorite(favorites, name);
            createFavoriteHTML(name, resultType);
            numberOfFavorites = updateNumberOfFavorites("add");
        }
    });


    // clicar num botão de remover favorito
    $("#favorites").on("click", ".favorite .btn-del", function() {
        let name = $(this).parent().children("h4").text();
        let favorite_div = $(this).parent();

        favorites = removeFavorite(favorites, name);
        destroyFavoriteHTML(favorite_div);
        numberOfFavorites = updateNumberOfFavorites("subtract");
    });


    // clicar no botão de mostrar favoritos
    $(".btn-fav").click(function() {
        document.getElementById("mySidenav").style.width = "300px";
    });


    // clicar no botão de esconder favoritos
    $(".closebtn").click(function() {
        document.getElementById("mySidenav").style.width = "0";
    });


    // clicar no botão para exportar para JSON
    $(".export").click(function() {
        console.log(JSON.stringify(favorites));
    });


    // clicar no botão de ir para o topo da página
    $(".btn-up").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });
});