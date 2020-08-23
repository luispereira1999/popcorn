// mostrar slideshow
function showSlideshow() {
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length == 0) {
        return;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";

    // a imagem muda num espaço de 4 segundos
    return setTimeout(showSlideshow, 4000);
}


// obtém os resultados da pesquisa
function getResults(response, numberOfResults, results) {
    // guarda os dados de um resultado da pesquisa
    let result = {
        name: "",
        description: "",
        youtubeLink: "",
        wikipediaLink: "",
        isFavorite: false
    };

    for (let i = 0; i < numberOfResults; i++) {
        result.name = response.Similar.Results[i].Name;
        result.description = response.Similar.Results[i].wTeaser;
        result.youtubeLink = response.Similar.Results[i].yUrl;
        result.wikipediaLink = response.Similar.Results[i].wUrl;
        result.isFavorite = false;
        results.push(JSON.parse(JSON.stringify(result)));
    }

    return results;
}


// obtém o número de resultados da pesquisa
function getNumberOfResults(response) {
    return response.Similar.Results.length;
}


// definir os cards quando a pesquisa é realizada
function setCards(results, numberOfResults, resultType) {
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

    for (let i = 0; i < numberOfResults; i++) {
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
        card.embed_youtube.setAttribute("src", results[i].youtubeLink);
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
        card.h3_name.innerHTML = results[i].name;
        card.p_description.innerHTML = results[i].description;
        setTag(card.p_tag, resultType);

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


// definir tag no card
function setTag(tag, resultType) {
    if (resultType === "music") {
        tag.setAttribute("class", "tags tags-musicas");
        tag.innerHTML = "Música";
    } else if (resultType === "movies") {
        tag.setAttribute("class", "tags tags-filmes");
        tag.innerHTML = "Filme";
    } else if (resultType === "shows") {
        tag.setAttribute("class", "tags tags-series");
        tag.innerHTML = "Série";
    } else if (resultType === "books") {
        tag.setAttribute("class", "tags tags-livros");
        tag.innerHTML = "Livro";
    } else if (resultType === "authors") {
        tag.setAttribute("class", "tags tags-autores");
        tag.innerHTML = "Autor";
    } else if (resultType === "games") {
        tag.setAttribute("class", "tags tags-jogos");
        tag.innerHTML = "Jogo";
    } else if (resultType === "podcasts") {
        tag.setAttribute("class", "tags tags-podcasts");
        tag.innerHTML = "Podcast";
    }
}


// mostrar mensagem
function showMessage(message) {
    alertify.set("notifier", "position", "top-center");
    alertify.notify(message, "error");
}