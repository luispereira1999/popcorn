// é o tipo de conteúdo que será a pesquisa
let contentType = "";
// é o texto da pesquisa
let searchText = "";
// é o tipo de resultado que será encont    rado na pesquisa
let resultType = "";

// guarda os dados de todos os resultado da pesquisa
let searchResults = [];

// guarda os dados de todos os resuldados de favoritos
let favoriteResults = [];

// é o número de favoritos
let numberOfFavoriteResults = 0;

// é a posição atual da imagem do slidheshow
let currentIndex = 0;
let slideshowValue = 0;
let slideshowIsActive = true;
// inicializar slidheshow
ShowSlideshow();

// guarda todos os favoritos
let favorites = [];

// indíce atual da lista de favoritos
let i = 0;

// mostrar o slideshow
function ShowSlideshow() {
    let slides = document.getElementsByClassName("mySlides");
	
    for (let i = 0; i < slides.length; i++)
        $(slides[i]).hide();

    currentIndex++;
    
    if (currentIndex > slides.length)
        currentIndex = 1;
        
    $(slides[currentIndex - 1]).show();
        
    // a imagem muda num espaço de 4 segundos
    slideshowValue = setTimeout(ShowSlideshow, 4000);
}


// clicar no botão de mostrar a lista de favoritos
$(".btn-fav").click(function() {
    document.getElementById("mySidenav").style.width = "300px";  
});


// clicar no botão de esconder a lista de favoritos
$(".closebtn").click(function() {
    document.getElementById("mySidenav").style.width = "0";
});


// clicar no botão para a pesquisa principal
$(".btn-search").click(function() {
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

    if ($(input_search).val() != "" && $(option_content).val() != "" && $(option_result).val() != "")
    {
        if (slideshowIsActive === true) {
            // parar slideshow
            clearTimeout(slideshowValue);
            // remover slideshow
            $("section").remove("#slideshow");
            slideshowIsActive = false;
        }

        contentType = option_content.value;
        resultType = option_result.value;
        searchText = input_search.value;
        
        let encodedText = encodeURIComponent(contentType + ":" + searchText);

        $.ajax({
            // url do pedido
            url: "https://tastedive.com/api/similar?k=352546-PopcornO-A04D9R8O&q=" + encodedText + "&info=1&limit=3&type=" + resultType,

            // especificar o tipo de chamada
            jsonp: "callback",

            // diz ao jquery que estamos à espera de jsonp
            dataType: "jsonp",

            // obtém os resultados da pesquisa
            success: function(response) {
                //console.log(response);
                // obtém o número de resultados
                let numberOfSearchResults = GetNumberOfSearchResults(response);

                if (numberOfSearchResults > 0) {
                    // obtém os resultados da pesquisa para um array de objetos
                    GetResults(response, numberOfSearchResults);

                    // é o texto que indica a pesquisa realizada
                    let searchPresentationText = "Texto de Apresentação: ";
                    
                    //ShowResults(searchResults, numberOfSearchResults);
                    SetCards(searchResults, numberOfSearchResults);
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


// obtém o número de resultados da pesquisa
function GetNumberOfSearchResults(response) {
    return response.Similar.Results.length;
}


// definir os elementos cards quando a pesquisa é realizada
function SetCards(searchResults, numberOfSearchResults) {
    // guarda os elementos de um card criado através da pesquisa
    let card = {
        div_card: null,
        embed_youtube: null,
        p_tag: null,
        button_favorite: null,
        i_favorite: null,
        button_search: null,
        i_search: null,
        h3_name: null,
        p_description: null,
        p_wikipediaLink: null
    };
    
    // guarda todos os cards criados da pesquisa
    let cards = [];
    
    // é a div que contém todos os cards
    let div_cards = document.getElementsByClassName("cards-section")[0];

    for (let i = 0; i < numberOfSearchResults; i++) {
        // criar elementos
        card.div_card = document.createElement("div");
        card.embed_youtube = document.createElement("embed");
        card.p_tag = document.createElement("p");
        card.button_favorite = document.createElement("button");
        card.i_favorite = document.createElement("i");
        card.button_search = document.createElement("button");
        card.i_search = document.createElement("i");
        card.h3_name = document.createElement("h3");
        card.p_description = document.createElement("p");
        card.p_wikipediaLink = document.createElement("p");
        
        // definir atributos dos elementos
        card.div_card.setAttribute("id", "card-" + i);
        card.div_card.setAttribute("class", "card card-elements");
        card.embed_youtube.setAttribute("width", "300");
        card.embed_youtube.setAttribute("height", "200");
        card.embed_youtube.setAttribute("src", searchResults[i].youtubeLink);
        card.embed_youtube.setAttribute("class", "video-embed");
        card.button_favorite.setAttribute("id", "favorite-icon-" + i);
        card.button_favorite.setAttribute("class", "btn btn-card favorite-icon");
        card.i_favorite.setAttribute("class", "far fa-star");
        card.button_search.setAttribute("id", "search-icon-" + i);
        card.button_search.setAttribute("class", "btn btn-card search-icon");
        card.i_search.setAttribute("class", "fas fa-search");
        card.p_wikipediaLink.setAttribute("class", "wiki");
        card.p_wikipediaLink.setAttribute("target", "_blank");
       
        // definir texto dos elementos
        card.h3_name.innerHTML = searchResults[i].name;
        card.p_description.innerHTML = searchResults[i].description;
        SetTag(card);
        
        // adicionar elementos ao DOM
        card.div_card.appendChild(card.embed_youtube);
        card.div_card.appendChild(card.subdiv_card);
        card.subdiv_card.appendChild(card.button_favorite);
        card.button_favorite.appendChild(card.i_favorite);
        card.subdiv_card.appendChild(card.button_search);
        card.button_search.appendChild(card.i_search);
        card.subdiv_card.appendChild(card.h3_name);
        card.subdiv_card.appendChild(card.p_description);
        card.subdiv_card.appendChild(card.p_wikipediaLink);
        card.div_card.appendChild(card.p_tag);
        div_cards.appendChild(card.div_card);
        
        // adicionar card ao array de cards
        cards.push(card);
    }
}


// definir tag no card
function SetTag(card) {
    if (resultType === "music") {
        card.p_tag.setAttribute("class", "tags tags-musicas");
        card.p_tag.innerHTML = "Música";
    }
    else if (resultType === "movies") {
        card.p_tag.setAttribute("class", "tags tags-filmes");
        card.p_tag.innerHTML = "Filme";
    }
    else if (resultType === "shows") {
        card.p_tag.setAttribute("class", "tags tags-series");
        card.p_tag.innerHTML = "Série";
    }
    else if (resultType === "books") {
        card.p_tag.setAttribute("class", "tags tags-livros");
        card.p_tag.innerHTML = "Livro";
    }
    else if (resultType === "authors") {
        card.p_tag.setAttribute("class", "tags tags-autores");
        card.p_tag.innerHTML = "Autor";
    }
    else if (resultType === "games") {
        card.p_tag.setAttribute("class", "tags tags-jogos");
        card.p_tag.innerHTML = "Jogo";
    }
    else if (resultType === "podcasts") {
        card.p_tag.setAttribute("class", "tags tags-podcasts");
        card.p_tag.innerHTML = "Podcast";
    }
}


// clicar num botão de pesquisa de um card
$(".cards-section").on("click", ".card .search-icon", function() {
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
        success: function(response) {
            //console.log(response);
            // obtém o número de resultados
            let numberOfSearchResults = GetNumberOfSearchResults(response);

            if (numberOfSearchResults > 0) {
                // obtém os resultados da pesquisa para um array de objetos
                GetResults(response, numberOfSearchResults);

                // é o texto que indica a pesquisa realizada
                let searchPresentationText = "Texto de Apresentação: ";
                    
                //ShowResults(searchResults, numberOfSearchResults);
                SetCards(searchResults, numberOfSearchResults);
                //console.log(searchPresentationText);
            }
            else
                alert("Sem resultados!");
        }
    });
});


// obtém os resultados da pesquisa
function GetResults(response, numberOfSearchResults) {
    // guarda os dados de um resultado da pesquisa
    let result = {
        name: "",
        description: "",
        youtubeLink: "",
        wikipediaLink: "",
        isFavorite: false
    };
    
    for (let i = 0; i < numberOfSearchResults; i++) {         
        result.name = response.Similar.Results[i].Name;
        result.description = response.Similar.Results[i].wTeaser;
        result.youtubeLink = response.Similar.Results[i].yUrl;
        result.wikipediaLink = response.Similar.Results[i].wUrl;
        result.isFavorite = false;
        searchResults.push(JSON.parse(JSON.stringify(result)));
    }
}


// definir os cards quando a pesquisa é realizada
function SetCards(searchResults, numberOfSearchResults) {
    // guarda os elementos de um card criado através da pesquisa
    let card = {
        div_card: null,
        embed_youtube: null,
        p_tag: null,
        button_favorite: null,
        i_favorite: null,
        button_search: null,
        i_search: null,
        h3_name: null,
        p_description: null,
        p_wikipediaLink: null
    };
    
    // guarda todos os cards criados da pesquisa
    let cards = [];
    
    // é a div que contém todos os cards
    let div_cards = document.getElementsByClassName("cards-section")[0];

    for (let i = 0; i < numberOfSearchResults; i++) {
        // criar elementos
        card.div_card = document.createElement("div");
        card.embed_youtube = document.createElement("embed");
        card.p_tag = document.createElement("p");
        card.button_favorite = document.createElement("button");
        card.i_favorite = document.createElement("i");
        card.button_search = document.createElement("button");
        card.i_search = document.createElement("i");
        card.h3_name = document.createElement("h3");
        card.p_description = document.createElement("p");
        card.p_wikipediaLink = document.createElement("p");
        
        // definir atributos dos elementos
        card.div_card.setAttribute("id", "card-" + i);
        card.div_card.setAttribute("class", "card card-elements");
        card.embed_youtube.setAttribute("width", "300");
        card.embed_youtube.setAttribute("height", "200");
        card.embed_youtube.setAttribute("src", searchResults[i].youtubeLink);
        card.embed_youtube.setAttribute("class", "video-embed");
        card.button_favorite.setAttribute("id", "favorite-icon-" + i);
        card.button_favorite.setAttribute("class", "btn btn-card favorite-icon");
        card.i_favorite.setAttribute("class", "far fa-star");
        card.button_search.setAttribute("id", "search-icon-" + i);
        card.button_search.setAttribute("class", "btn btn-card search-icon");
        card.i_search.setAttribute("class", "fas fa-search");
        card.p_wikipediaLink.setAttribute("class", "wiki");
        card.p_wikipediaLink.setAttribute("target", "_blank");
       
        // definir texto dos elementos
        card.h3_name.innerHTML = searchResults[i].name;
        card.p_description.innerHTML = searchResults[i].description;
        SetTag(card);
        
        // adicionar elementos ao DOM
        card.div_card.appendChild(card.embed_youtube);
        card.div_card.appendChild(card.button_favorite);
        card.button_favorite.appendChild(card.i_favorite);
        card.div_card.appendChild(card.button_search);
        card.button_search.appendChild(card.i_search);
        card.div_card.appendChild(card.h3_name);
        card.div_card.appendChild(card.p_description);
        card.div_card.appendChild(card.p_wikipediaLink);
        card.div_card.appendChild(card.p_tag);
        div_cards.appendChild(card.div_card);
        
        // adicionar card ao array de cards
        cards.push(card);
    }
}


// clicar num icon de favorito de um card
$(".cards-section").on("click", ".card .favorite-icon", function() {
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
        SetTag(favorite);
        // adicionar favorito ao array de favoritos
        favorites.push(favorite);
        favoriteResults.push(searchResults[parentIndex]);
        favoriteResults[i].isFavorite = true;
      
        i += 1;
    }
});


// clicar no remover favorito
$(".favorites").on("click", ".favorite .btn-del", function() {
    let parentIndex = $(this).parent().index();
    this.parentElement.remove(this);
    favoriteResults[parentIndex].isFavorite = false;
    numberOfFavoriteResults -= 1;
    document.getElementsByClassName("btn-fav")[0].innerHTML = numberOfFavoriteResults;
    favorites.splice($.inArray(parentIndex, favorites), 1);
    i -= 1;
});


// clicar no botão para exportar para json
$(".export").click(function() {
    console.log(JSON.stringify(favoriteResults));
});


// clicar no botão de ir para o topo da página
$(".btn-up").click(function () {
   $("html, body").animate({scrollTop: 0}, 1000);
});