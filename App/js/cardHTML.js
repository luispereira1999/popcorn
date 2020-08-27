class CardHTML {
    constructor() {
        this.div_card = document.createElement("div");
        this.embed_youtube = document.createElement("embed");
        this.p_tag = document.createElement("p");
        this.button_favorite = document.createElement("button");
        this.i_favorite = document.createElement("i");
        this.button_search = document.createElement("button");
        this.i_search = document.createElement("i");
        this.h3_name = document.createElement("h3");
        this.p_description = document.createElement("p");
        this.p_wikipediaLink = document.createElement("p");
    }


    setAttributes(result, tagName) {
        this.div_card.setAttribute("class", "card card-elements");
        this.embed_youtube.setAttribute("width", "300");
        this.embed_youtube.setAttribute("height", "200");
        this.embed_youtube.setAttribute("src", result.youtubeLink);
        this.embed_youtube.setAttribute("class", "video-embed");
        this.button_favorite.setAttribute("class", "btn btn-card favorite-icon");
        this.i_favorite.setAttribute("class", "far fa-star");
        this.button_search.setAttribute("class", "btn btn-card search-icon");
        this.i_search.setAttribute("class", "fas fa-search");
        this.p_wikipediaLink.setAttribute("class", "wiki");
        this.p_wikipediaLink.setAttribute("target", "_blank");

        this.h3_name.innerHTML = result.name;
        this.p_description.innerHTML = result.description;

        setTagHTML(this.p_tag, tagName);
    }


    addToDOM() {
        let div_cards = document.getElementById("cards");

        this.div_card.appendChild(this.embed_youtube);
        this.div_card.appendChild(this.button_favorite);
        this.button_favorite.appendChild(this.i_favorite);
        this.div_card.appendChild(this.button_search);
        this.button_search.appendChild(this.i_search);
        this.div_card.appendChild(this.h3_name);
        this.div_card.appendChild(this.p_description);
        this.div_card.appendChild(this.p_wikipediaLink);
        this.div_card.appendChild(this.p_tag);
        div_cards.appendChild(this.div_card);
    }
}