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


// desativar slideshow
function removeSlideshow(slideshowId) {
    clearTimeout(slideshowId);
    $("section").remove("#slideshow");
    return false;
}


// obter tipo de conteúdo da pesquisa
function getContentType() {
    let dropdown_content = document.getElementsByName("userSearch")[0];
    let option_content = dropdown_content.options[dropdown_content.selectedIndex];
    return option_content.value;
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
    let dropdown_result = document.getElementsByName("userFound")[0];
    let option_result = dropdown_result.options[dropdown_result.selectedIndex];
    return option_result.value;
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
        element.setAttribute("class", "tags tags-musicas");
        element.innerHTML = "Música";
    } else if (type === "movies") {
        element.setAttribute("class", "tags tags-filmes");
        element.innerHTML = "Filme";
    } else if (type === "shows") {
        element.setAttribute("class", "tags tags-series");
        element.innerHTML = "Série";
    } else if (type === "books") {
        element.setAttribute("class", "tags tags-livros");
        element.innerHTML = "Livro";
    } else if (type === "authors") {
        element.setAttribute("class", "tags tags-autores");
        element.innerHTML = "Autor";
    } else if (type === "games") {
        element.setAttribute("class", "tags tags-jogos");
        element.innerHTML = "Jogo";
    } else if (type === "podcasts") {
        element.setAttribute("class", "tags tags-podcasts");
        element.innerHTML = "Podcast";
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
    let currentLength = document.getElementById("numberOfFavorites").innerHTML;
    currentLength = parseInt(currentLength);
    currentLength += 1;

    document.getElementById("numberOfFavorites").innerHTML = currentLength;
}


// subtrair número de favoritos
function decreaseNumberOfFavorites() {
    let currentLength = document.getElementById("numberOfFavorites").innerHTML;
    currentLength = parseInt(currentLength);
    currentLength -= 1;

    document.getElementById("numberOfFavorites").innerHTML = currentLength;
}


// mostrar mensagem
function showMessage(message, error) {
    alertify.set("notifier", "position", "top-center");
    alertify.notify(message, error);
}