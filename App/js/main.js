$(document).ready(function () {
    // é o tipo de conteúdo que será a pesquisa
    let contentType = "";
    // é o texto da pesquisa
    let searchText = "";
    // é o tipo de resultado que será encontrado na pesquisa
    let resultType = "";

    // guarda os dados de todos os resultado da pesquisa
    let searchResults = [];

    // guarda os dados de todos os resultados de favoritos
    let favoriteResults = [];

    // é o número de favoritos
    let numberOfFavoriteResults = 0;

    // // é a posição atual da imagem do slideshow
    // let currentIndex = 0;
    // let slideshowValue = 0;
    // let slideshowIsActive = true;
    // // inicializar slideshow
    // let slideIndex = 0;
    // if (slideshowIsActive) {
    //     showSlideshow();
    // }

    // guarda todos os favoritos
    let favorites = [];

    // índice atual da lista de favoritos
    let i = 0;


    // clicar no botão de mostrar a lista de favoritos
    $(".btn-fav").click(function () {
        document.getElementById("mySidenav").style.width = "300px";
    });


    // clicar no botão de esconder a lista de favoritos
    $(".closebtn").click(function () {
        document.getElementById("mySidenav").style.width = "0";
    });


    // clicar no botão para a pesquisa principal
    $(".btn-search").click(function (e) {
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
            // if (slideshowIsActive === true) {
            //     // parar slideshow
            //     clearTimeout(slideshowValue);
            //     // remover slideshow
            //     $("section").remove("#slideshow");
            //     slideshowIsActive = false;
            // }
            // if (slideshowIsActive) {
            //     // parar slideshow
            //     clearTimeout(slideshowValue);
            //     // remover slideshow
            //     $("section").remove("#slideshow");
            //     slideshowIsActive = false;
            // }

            contentType = option_content.value;
            resultType = option_result.value;
            searchText = input_search.value;

            let domain = "https://tastedive.com/api/similar";
            let apiKey = "382610-popcorn-40K5FW57";
            let encodedText = encodeURIComponent(contentType + ":" + searchText);

            $.ajax({
                // url do pedido
                url: domain + "?k=" + apiKey + "&q=" + encodedText + "&info=1&limit=3&type=" + resultType,

                // especificar o tipo de chamada
                jsonp: "callback",

                // diz ao jquery que estamos à espera de jsonp
                dataType: "jsonp",

                // obtém os resultados da pesquisa
                success: function (response) {
                    // obtém o número de resultados
                    let numberOfSearchResults = getNumberOfSearchResults(response);

                    if (numberOfSearchResults > 0) {
                        // obtém os resultados da pesquisa para um array de objetos
                        getResults(response, numberOfSearchResults, searchResults);

                        // é o texto que indica a pesquisa realizada
                        let searchPresentationText = "Texto de Apresentação: ";

                        setCards(searchResults, numberOfSearchResults);
                        //console.log(searchPresentationText);
                    }
                    else
                        alert("Sem resultados!");
                }
            });
        }
        else
            alert("Erro: Valor não inserido!");
    });


    // clicar num botão de pesquisa de um card
    $(".cards-section").on("click", ".card .search-icon", function () {
        let parentIndex = $(this).parent().index();
        searchText = searchResults[parentIndex].name;

        searchResults = [];
        alert("Novo texto da pesquisa:" + searchText);

        $(".card").remove();

        let encodedText = encodeURIComponent(contentType + ":" + searchText);

        $.ajax({
            // url do pedido
            url: "https://tastedive.com/api/similar?k=352546-PopcornO-A04D9R8O&q=" + encodedText + "&info=1&limit=3&type=" + resultType,

            // especificar o tipo de chamada
            jsonp: "callback",

            // diz ao jquery que estamos à espera de jsonp
            dataType: "jsonp",

            // obtém os resultados da pesquisa
            success: function (response) {
                //console.log(response);
                // obtém o número de resultados
                let numberOfSearchResults = getNumberOfSearchResults(response);

                if (numberOfSearchResults > 0) {
                    // obtém os resultados da pesquisa para um array de objetos
                    getResults(response, numberOfSearchResults);

                    // é o texto que indica a pesquisa realizada
                    let searchPresentationText = "Texto de Apresentação: ";

                    //ShowResults(searchResults, numberOfSearchResults);
                    setCards(searchResults, numberOfSearchResults);
                    //console.log(searchPresentationText);
                }
                else
                    alert("Sem resultados!");
            }
        });
    });


    // clicar num icon de favorito de um card
    $(".cards-section").on("click", ".card .favorite-icon", function () {
        let parentIndex = $(this).parent().index();

        if (!searchResults[parentIndex].isFavorite) {
            //searchResults[parentIndex].isFavorite = true;
            numberOfFavoriteResults += 1;
            document.getElementsByClassName("btn-fav")[0].innerHTML = numberOfFavoriteResults;

            // guarda os elementos de um favorito
            let favorite = {
                div_favorite: null,
                h4_name: null,
                p_tag: null,
                button_delete: null
            };

            // é a div que contém todos os favoritos
            let div_favorites = document.getElementsByClassName("favorites")[0];

            // criar elementos
            favorite.div_favorite = document.createElement("div");
            favorite.h4_name = document.createElement("h4");
            favorite.p_tag = document.createElement("p");
            favorite.button_delete = document.createElement("button");

            // definir atributos dos elementos
            favorite.div_favorite.setAttribute("id", "favorite-" + i);
            favorite.div_favorite.setAttribute("class", "favorite");
            favorite.h4_name.setAttribute("class", "title-fav");
            favorite.p_tag.setAttribute("class", "tags tags-fav");
            favorite.button_delete.setAttribute("class", "btn btn-del fas fa-trash-alt");

            // definir texto dos elementos
            favorite.h4_name.innerHTML = searchResults[parentIndex].name;

            // adicionar elementos ao DOM
            favorite.div_favorite.appendChild(favorite.h4_name);
            favorite.div_favorite.appendChild(favorite.p_tag);
            favorite.div_favorite.appendChild(favorite.button_delete);
            div_favorites.appendChild(favorite.div_favorite);
            setTag(favorite, resultType);
            // adicionar favorito ao array de favoritos
            favorites.push(favorite);
            favoriteResults.push(searchResults[parentIndex]);
            favoriteResults[i].isFavorite = true;

            i += 1;
        }
    });


    // clicar no remover favorito
    $(".favorites").on("click", ".favorite .btn-del", function () {
        let parentIndex = $(this).parent().index();
        this.parentElement.remove(this);
        favoriteResults[parentIndex].isFavorite = false;
        numberOfFavoriteResults -= 1;
        document.getElementsByClassName("btn-fav")[0].innerHTML = numberOfFavoriteResults;
        favorites.splice($.inArray(parentIndex, favorites), 1);
        i -= 1;
    });


    // clicar no botão para exportar para json
    $(".export").click(function () {
        console.log(JSON.stringify(favoriteResults));
    });


    // clicar no botão de ir para o topo da página
    $(".btn-up").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });
}); 