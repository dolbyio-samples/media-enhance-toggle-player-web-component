class MediaComparison extends HTMLElement {
  constructor() {
    super();

    // the source for the "before" media file
    this.beforeSrc = null;
    // the source for the "after" media file
    this.afterSrc = null;
    // the media type: video or audio?
    this.mediaType = null;
    // when true, play the audio of the after/enhanced media first
    this.showAfter = null;
    // the poster for the media player
    this.poster = null;
    // represents the media format
    this.mime = null;

    // attaches shadow DOM to current instance of this element
    this.attachShadow({ 'mode': 'open' });
  }

  // creates the custom MediaPlayer element
  createMediaPlayer(isAfter) {
    // create instance of the MediaPlayer custom element
    let mediaPlayer = document.createElement("media-player");
    // set attributes for this custom element
    mediaPlayer.setAttribute("poster", this.poster || "");
    mediaPlayer.setAttribute("mediaFile", isAfter ? this.afterSrc : this.beforeSrc);
    mediaPlayer.setAttribute("mime", this.mime || "");

    if (this.mediaType === "audio") mediaPlayer.setAttribute("isAudio", true);
    if (isAfter) mediaPlayer.setAttribute("isAfter", isAfter);
    // return serialized HTML element (i.e. HTML element as plain text)
    return mediaPlayer.outerHTML;
  }

  // creates instance of the ToggleButton custom element
  createToggleButton() {
    let toggleButton = document.createElement("toggle-button");
    // set attributes for this custom element
    if (this.showAfter) toggleButton.setAttribute("showAfter", "");

    // return serialized HTML element (i.e. HTML element as plain text)
    return toggleButton.outerHTML;
  }

  // creates the CSS style rules for this component
  createStyle = () => {
    let style = document.createElement("style");
    // add style for the mediaComparison component here
    style.innerHTML = ``;

    return style;
  }

  // invoked when the video/audio is played
  playVideo(subComponents) {
    if (subComponents.beforeSource.src && subComponents.afterSource.src) {
      // mute the appropriate media player
      subComponents.afterMedia.muted = !this.showAfter;
      subComponents.beforeMedia.muted = this.showAfter;
      // play both media at the same time
      subComponents.beforeMedia.play();
      subComponents.afterMedia.play();
    }
  }

  // invoked when the video/audio is paused
  pauseVideo(subComponents) {
    if (subComponents.beforeSource.src && subComponents.afterSource.src) {
      // pause both media at the same time
      subComponents.afterMedia.pause();
      subComponents.beforeMedia.pause();
    }
  }

  // invoked when the video/audio ends
  endVideo(subComponents) {
    // get the default value from custom element attribute
    this.showAfter = this.hasAttribute("showAfter");
    // reset the mute statuses to the original state
    subComponents.afterMedia.muted = !this.showAfter;
    subComponents.beforeMedia.muted = this.showAfter;
    // set the current time of both media to 0
    subComponents.beforeMedia.currentTime =
      subComponents.afterMedia.currentTime = 0;
    // reset the toggle button and enhance status to original state
    subComponents.toggleButton.checked = this.showAfter;
    subComponents.enhanceStatus.innerHTML =
      this.showAfter ? "Dolby Enhance On" : "Dolby Enhance Off";
  }


  // invoked when the toggle button is clicked
  toggleMedia(subComponents) {
    if (subComponents.afterSource.src && subComponents.beforeSource.src) {
      subComponents.afterMedia.muted = this.showAfter;
      subComponents.beforeMedia.muted = !this.showAfter;

      // negate this.showAfter property to emulate a toggle
      this.showAfter = !this.showAfter;
      subComponents.enhanceStatus.innerHTML =
        this.showAfter ? "Dolby Enhance On" : "Dolby Enhance Off";
    }
  }

  // invoked when this component is added to the DOM
  connectedCallback() {
    /* assign class properties to their corresponding attribute value
    when this element has been loaded into the DOM */
    this.beforeSrc = this.getAttribute("beforeSrc");
    this.afterSrc = this.getAttribute("afterSrc");
    this.mediaType = this.getAttribute("mediaType");
    this.showAfter = this.hasAttribute("showAfter");
    this.poster = this.getAttribute("poster");
    this.mime = this.getAttribute("mime");

    // create sub-components for this custom element
    let afterMediaPlayer = this.createMediaPlayer(true);
    let beforeMediaPlayer = this.createMediaPlayer(false);
    let toggleButton = this.createToggleButton();

    // assign HTML content that should be rendered by this custom element
    this.shadowRoot.innerHTML = `
        ${afterMediaPlayer}
        ${beforeMediaPlayer}
        ${toggleButton}
    `
    // append style to the shadow root of this custom element
    this.shadowRoot.appendChild(this.createStyle());

    // get sub-components from this custom element's shadow root 
    let subComponents = {
      beforeMedia: this.shadowRoot.getElementById("before-media"),
      beforeSource: this.shadowRoot.getElementById("before-source"),
      afterMedia: this.shadowRoot.getElementById("after-media"),
      afterSource: this.shadowRoot.getElementById("after-source"),
      toggleButton: this.shadowRoot.getElementById("toggle-button"),
      enhanceStatus: this.shadowRoot.getElementById("enhance-status")
    };

    // add event listeners to elements in MediaPlayer and ToggleButton
    subComponents.toggleButton.addEventListener("click", () => {
      return this.toggleMedia(subComponents)
    });

    subComponents.afterMedia.addEventListener("play", () => {
      return this.playVideo(subComponents)
    });

    subComponents.afterMedia.addEventListener("pause", () => {
      return this.pauseVideo(subComponents)
    });
    subComponents.afterMedia.addEventListener("ended", () => {
      return this.endVideo(subComponents)
    });
  }
}

customElements.define('media-comparison', MediaComparison);
