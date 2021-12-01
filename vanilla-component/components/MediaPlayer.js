class MediaPlayer extends HTMLElement {
  constructor() {
      super();
      // is this media an audio file?
      this.isAudio = null;
      // is this media player for the enhanced (or "after") media?
      this.isAfter = null;
      // cover for media player
      this.poster = null;
      // media file directory
      this.mediaFile = null;
      // represents the media format
      this.mime = null;
  }
   
  // creates a standard HTML video/audio element.
  createMedia() {
      let media = document.createElement(this.isAudio ? "audio" : "video");
      // set attributes for media element (<video> or <audio>)
      media.setAttribute("id", this.isAfter ? "after-media" : "before-media");
      media.setAttribute("poster", this.poster);
      // only show the "after" media
      media.style.display = this.isAfter ? 'block' : 'none';
      // only enable controls for "after" media
      if (this.isAfter) media.controls = true;

      let source = document.createElement("source");
      // set attributes for source element (<source></source>)
      source.setAttribute("id", this.isAfter ? "after-source" : "before-source");
      source.setAttribute("src", this.mediaFile);
      source.setAttribute("mime", this.mime || (this.isAudio ? "audio/mp3" : "video/mp4"));

      media.appendChild(source);

      // return serialized HTML element (i.e. HTML element as plain text)
      return media.outerHTML;
  }

  // creates the CSS style rules for this component.
  createStyle() {
      let style = document.createElement("style");
      // add style rules for the MediaPlayer element here
      style.innerHTML = ``;
   
      return style;
  }

  // this function is invoked when this component is added to the DOM
  connectedCallback() {
      this.isAudio = this.hasAttribute("isAudio");
      this.isAfter = this.hasAttribute("isAfter");
      this.poster = this.getAttribute("poster");
      this.mediaFile = this.getAttribute("mediaFile");
      this.mime = this.getAttribute("mime");

      // set the innerHTML for this custom element
      this.innerHTML = this.createMedia();
      // append style to this custom element
      this.appendChild(this.createStyle());
  }
}

customElements.define("media-player", MediaPlayer);
