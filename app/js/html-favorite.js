class HtmlFavorite {
   constructor() {
      this.div_favorite = $("<div></div>");
      this.h4_title = $("<h4></h4>");
      this.p_tag = $("<p></p>");
      this.button_delete = $("<button></button>");
   }


   setHtmlAttributes() {
      this.div_favorite.addClass("favorite");
      this.h4_title.addClass("favorite-title");
      this.button_delete.addClass("btn btn-del fas fa-trash-alt");
   }


   setHtmlText(title) {
      this.h4_title.text(title);
   }


   createHtmlTag(searchResultType) {
      let tag = new HtmlTag(this.p_tag, searchResultType);
      let applyTag = tag.getFunctionToSetHtmlTag();
      tag.setHtmlTag(applyTag);
   }


   addHtmlToPage() {
      let div_favorites = $(".favorites-items");

      this.div_favorite.append(this.h4_title);
      this.div_favorite.append(this.p_tag);
      this.div_favorite.append(this.button_delete);
      div_favorites.append(this.div_favorite);
   }
}