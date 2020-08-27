class FavoriteHTML {
    constructor() {
        this.div_favorite = document.createElement("div");
        this.h4_name = document.createElement("h4");
        this.p_tag = document.createElement("p");
        this.button_delete = document.createElement("button");
    }


    setAttributes(text, type) {
        this.div_favorite.setAttribute("class", "favorite");
        this.h4_name.setAttribute("class", "title-fav");
        this.p_tag.setAttribute("class", "tags tags-fav");
        this.button_delete.setAttribute("class", "btn btn-del fas fa-trash-alt");

        this.h4_name.innerHTML = text;
        this.p_tag.innerHTML = text;

        setTagHTML(this.p_tag, type);
    }


    addToDOM() {
        let div_favorites = document.getElementById("favorites");

        this.div_favorite.appendChild(this.h4_name);
        this.div_favorite.appendChild(this.p_tag);
        this.div_favorite.appendChild(this.button_delete);
        div_favorites.appendChild(this.div_favorite);
    }
}