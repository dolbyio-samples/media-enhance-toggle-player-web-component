export default class MediaPlayer extends HTMLElement {
  constructor() {
    super();

    this.isAudio = null;
    this.isAfter = null;
    this.poster = null;
    this.mediaFile = null;
    this.mime = null;
  }

  createMedia() {
    let media = document.createElement(this.isAudio ? "audio" : "video");
    media.setAttribute("id", this.isAfter ? "after-media" : "before-media");
    media.setAttribute("poster", this.poster);
    media.style.display = this.isAfter ? 'block' : 'none';
    if (this.isAfter) media.controls = true;

    let source = document.createElement("source");
    source.setAttribute("id", this.isAfter ? "after-source" : "before-source");
    source.setAttribute("src", this.mediaFile);
    source.setAttribute("mime", this.mime || (this.isAudio ? "audio/mp3" : "video/mp4"));

    media.appendChild(source);

    return media.outerHTML;
  }

  createStyle() {
    let style = document.createElement("style");
    // insert style for the mediaPlayer component here
    style.innerHTML = ``;

    return style;
  }

  connectedCallback() {
    this.isAudio = this.hasAttribute("isAudio");
    this.isAfter = this.hasAttribute("isAfter");
    this.poster = this.getAttribute("poster");
    this.mediaFile = this.getAttribute("mediaFile");
    this.mime = this.getAttribute("mime");

    this.innerHTML = this.createMedia();
    this.appendChild(this.createStyle());
  }
}

customElements.define("media-player", MediaPlayer);
