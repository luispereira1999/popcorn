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
function disableSlideshow(slideshowId) {
    clearTimeout(slideshowId);
    return false;
}


// remover slideshow
function removeSlideshow() {
    $("section").remove("#slideshow");
}


// obter tipo de conteúdo a procurar na pesquisa
function getContentType() {
    let text = $("#userSearch option:selected").val();
    return text;
}


// obter tipo de resultado a encontrar na pesquisa
function getResultType() {
    let text = $("#userFound option:selected").val();
    return text;
}


// obter texto do input
function getInputText() {
    return $("#textSearch").val();
}


// obter texto do título do card
function getTitleText(element) {
    return element.text();
}


// obter resultados da pesquisa
function getResults(response) {
    let result = {
        title: "",
        description: "",
        youtubeLink: "",
        wikipediaLink: "",
    };
    let results = [];

    response.Similar.Results.forEach(function(element) {
        result.title = element.Name;
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
function createCardsHTML(results, searchResultType) {
    results.forEach(function(currentResult) {
        let card = new CardHTML();
        card.setAttributes(currentResult);
        card.setText(currentResult.title, currentResult.description);
        card.createTagHTML(searchResultType);
        card.addToDOM();
    });
}


// destruir elementos HTML dos cards
function destroyCardsHTML() {
    $("#cards").children(".card").remove();
}


// adicionar favorito ao array de favoritos
function addFavorite(array, element) {
    array.push(element);
    return array;
}


// remover favorito do array de favoritos
function removeFavorite(array, element) {
    return array = $.grep(array, function(value) {
        return value != element;
    });
}


// criar elementos HTML do favorito
function createFavoriteHTML(title, searchResultType) {
    let favorite = new FavoriteHTML();
    favorite.setAttributes();
    favorite.setText(title);
    favorite.createTagHTML(searchResultType);
    favorite.addToDOM();
}


// destruir elementos HTML do favorito
function destroyFavoriteHTML(element) {
    element.remove();
}


// aumentar o número de favoritos
function increaseNumberOfFavorites() {
    let currentNumber = $("#numberOfFavorites").text();
    currentNumber = parseInt(currentNumber);
    currentNumber += 1;

    $("#numberOfFavorites").text(currentNumber);
}


// diminuir o número de favoritos
function decreaseNumberOfFavorites() {
    let currentNumber = $("#numberOfFavorites").text();
    currentNumber = parseInt(currentNumber);
    currentNumber -= 1;

    $("#numberOfFavorites").text(currentNumber);
}


// mostrar mensagem
function showMessage(message, error) {
    alertify.set("notifier", "position", "top-center");
    alertify.notify(message, error);
}