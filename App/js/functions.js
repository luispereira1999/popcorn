// mostrar slideshow
function showSlideshow() {
    let slides = $(".mySlides");
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


// desativar slideshow
function removeSlideshow(slideshowId) {
    clearTimeout(slideshowId);
    $("section").remove("#slideshow");
    return false;
}


// obter tipo de conteúdo da pesquisa
function getContentType() {
    let text = $("#userSearch option:selected").val();
    return text;
}


// obter texto da pesquisa
function getSearchText(element) {
    if (element.is("input")) {
        var text = element.val();
    } else if (element.is("h3")) {
        var text = element.text();
    }

    return text;
}


// obter tipo de resultado da pesquisa
function getResultType() {
    let text = $("#userFound option:selected").val();
    return text;
}


// obter resultados da pesquisa
function getResults(response) {
    let result = {
        name: "",
        description: "",
        youtubeLink: "",
        wikipediaLink: "",
    };
    let results = [];

    response.Similar.Results.forEach(function(element) {
        result.name = element.Name;
        result.description = element.wTeaser;
        result.youtubeLink = element.yUrl;
        result.wikipediaLink = element.wUrl;
        results.push(JSON.parse(JSON.stringify(result)));
    });

    return results;
}


// obter número de resultados da pesquisa
function getNumberOfResults(response) {
    return response.Similar.Results.length;
}


// criar elementos HTML dos cards
function createCardsHTML(array, tagName) {
    array.forEach(function(element) {
        let card = new CardHTML();
        card.setAttributes(element, tagName);
        card.addToDOM();
    });
}


// destruir elementos HTML dos cards
function destroyCardsHTML() {
    $(".card").remove();
}


// definir atributos do elemento HTML da tag
function setTagHTML(element, type) {
    if (type === "music") {
        element.addClass("tags tags-musicas");
        element.text("Música");
    } else if (type === "movies") {
        element.addClass("tags tags-filmes");
        element.text("Filme");
    } else if (type === "shows") {
        element.addClass("tags tags-series");
        element.text("Série");
    } else if (type === "books") {
        element.addClass("tags tags-livros");
        element.text("Livro");
    } else if (type === "authors") {
        element.addClass("tags tags-autores");
        element.text("Autor");
    } else if (type === "games") {
        element.addClass("tags tags-jogos");
        element.text("Jogo");
    } else if (type === "podcasts") {
        element.addClass("tags tags-podcasts");
        element.text("Podcast");
    }
}


// adicionar favorito
function addFavorite(array, element) {
    array.push(element);
    return array;
}


// remover favorito
function removeFavorite(array, element) {
    return array = $.grep(array, function(value) {
        return value != element;
    });
}


// criar elementos HTML do favorito
function createFavoriteHTML(text, type) {
    let favorite = new FavoriteHTML();
    favorite.setAttributes(text, type);
    favorite.addToDOM();
}


// destruir elementos HTML do favorito
function destroyFavoriteHTML(element) {
    element.remove();
}


// adicionar número de favoritos
function increaseNumberOfFavorites() {
    let currentLength = $("#numberOfFavorites").text();
    currentLength = parseInt(currentLength);
    currentLength += 1;

    $("#numberOfFavorites").text(currentLength);
}


// subtrair número de favoritos
function decreaseNumberOfFavorites() {
    let currentLength = $("#numberOfFavorites").text();
    currentLength = parseInt(currentLength);
    currentLength -= 1;

    $("#numberOfFavorites").text(currentLength);
}


// mostrar mensagem
function showMessage(message, error) {
    alertify.set("notifier", "position", "top-center");
    alertify.notify(message, error);
}