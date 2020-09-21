// esta classe serve para criar os elementos HTML de um card (de um resultado da pesquisa)

class HtmlCard {
   constructor() {
      this.div_card = $("<div></div>");

      this.embed_youtube = $("<embed>");

      this.div_header = $("<div></div>");
      this.h3_title = $("<h3></h3>");
      this.a_wikipediaLink = $("<a></a>");
      this.button_favorite = $("<button></button>");
      this.i_favorite = $("<i></i>");
      this.button_search = $("<button></button>");
      this.i_search = $("<i></i>");

      this.p_description = $("<p></p>");
      this.p_tag = $("<p></p>");
   }


   setHtmlAttributes(result) {
      this.div_card.addClass("card card-elements");

      this.embed_youtube.addClass("video-embed");
      this.embed_youtube.attr("src", result.youtubeLink);

      this.div_header.addClass("card-header");
      this.a_wikipediaLink.attr("href", result.wikipediaLink);
      this.a_wikipediaLink.attr("target", "_blank");

      this.button_favorite.addClass("btn btn-card btn-favorite");
      this.i_favorite.addClass("far fa-star");
      if (favorites.includes(result.title)) {
         this.i_favorite.css("color", "#a946ffe3");
      }
      this.button_search.addClass("btn btn-card btn-card-search");
      this.i_search.addClass("fas fa-search");
   }


   setHtmlText(title, description) {
      this.a_wikipediaLink.text(title);
      this.p_description.text(description);
   }


   createHtmlTag(searchResultType) {
      let tag = new HtmlTag(this.p_tag, searchResultType);
      let applyTag = tag.getFunctionToSetHtmlTag();
      tag.setHtmlTag(applyTag);
   }


   addHtmlToPage() {
      let div_cards = $(".cards");

      this.div_card.append(this.embed_youtube);

      this.div_header.append(this.h3_title);
      this.h3_title.append(this.a_wikipediaLink);
      this.button_favorite.append(this.i_favorite);
      this.div_header.append(this.button_favorite);
      this.button_search.append(this.i_search);
      this.div_header.append(this.button_search);
      this.div_card.append(this.div_header);

      this.div_card.append(this.p_description);
      this.div_card.append(this.p_tag);

      div_cards.append(this.div_card);
   }
}