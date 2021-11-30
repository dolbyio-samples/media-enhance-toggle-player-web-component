'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./ToggleButton');

require('./MediaPlayer');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaComparison = function (_HTMLElement) {
  _inherits(MediaComparison, _HTMLElement);

  function MediaComparison() {
    _classCallCheck(this, MediaComparison);

    // the source for the "before" media file
    var _this = _possibleConstructorReturn(this, (MediaComparison.__proto__ || Object.getPrototypeOf(MediaComparison)).call(this));

    _this.beforeSrc = null;
    // the source for the "after" media file
    _this.afterSrc = null;
    // the media type: video or audio?
    _this.mediaType = null;
    // when true, play the audio of the after/enhanced media first
    _this.showAfter = null;
    // the poster for the media player
    _this.poster = null;
    // represents the media format
    _this.mime = null;

    // attaches shadow DOM to current instance of this element
    _this.attachShadow({ 'mode': 'open' });
    return _this;
  }

  // creates the custom MediaPlayer element


  _createClass(MediaComparison, [{
    key: 'createMediaPlayer',
    value: function createMediaPlayer(isAfter) {
      // create instance of the MediaPlayer custom element
      var mediaPlayer = document.createElement("media-player");
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

  }, {
    key: 'createToggleButton',
    value: function createToggleButton() {
      var toggleButton = document.createElement("toggle-button");
      // set attributes for this custom element
      if (this.showAfter) toggleButton.setAttribute("showAfter", "");

      // return serialized HTML element (i.e. HTML element as plain text)
      return toggleButton.outerHTML;
    }

    // creates the CSS style rules for this component

  }, {
    key: 'createStyle',
    value: function createStyle() {
      var style = document.createElement("style");
      // add style for the mediaComparison component here
      style.innerHTML = '';

      return style;
    }

    // invoked when the video/audio is played

  }, {
    key: 'playVideo',
    value: function playVideo(subComponents) {
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

  }, {
    key: 'pauseVideo',
    value: function pauseVideo(subComponents) {
      if (subComponents.beforeSource.src && subComponents.afterSource.src) {
        // pause both media at the same time
        subComponents.afterMedia.pause();
        subComponents.beforeMedia.pause();
      }
    }

    // invoked when the video/audio ends

  }, {
    key: 'endVideo',
    value: function endVideo(subComponents) {
      // get the default value from custom element attribute
      this.showAfter = this.hasAttribute("showAfter");
      // reset the mute statuses to the original state
      subComponents.afterMedia.muted = !this.showAfter;
      subComponents.beforeMedia.muted = this.showAfter;
      // set the current time of both media to 0
      subComponents.beforeMedia.currentTime = subComponents.afterMedia.currentTime = 0;
      // reset the toggle button and enhance status to original state
      subComponents.toggleButton.checked = this.showAfter;
      subComponents.enhanceStatus.innerHTML = this.showAfter ? "Dolby Enhance On" : "Dolby Enhance Off";
    }

    // invoked when the toggle button is clicked

  }, {
    key: 'toggleMedia',
    value: function toggleMedia(subComponents) {
      if (subComponents.afterSource.src && subComponents.beforeSource.src) {
        subComponents.afterMedia.muted = this.showAfter;
        subComponents.beforeMedia.muted = !this.showAfter;

        // negate this.showAfter property to emulate a toggle
        this.showAfter = !this.showAfter;
        subComponents.enhanceStatus.innerHTML = this.showAfter ? "Dolby Enhance On" : "Dolby Enhance Off";
      }
    }

    // invoked when this component is added to the DOM

  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      /* assign class properties to their corresponding attribute value
      when this element has been loaded into the DOM */
      this.beforeSrc = this.getAttribute("beforeSrc");
      this.afterSrc = this.getAttribute("afterSrc");
      this.mediaType = this.getAttribute("mediaType");
      this.showAfter = this.hasAttribute("showAfter");
      this.poster = this.getAttribute("poster");
      this.mime = this.getAttribute("mime");

      // create sub-components for this custom element
      var afterMediaPlayer = this.createMediaPlayer(true);
      var beforeMediaPlayer = this.createMediaPlayer(false);
      var toggleButton = this.createToggleButton();

      // assign HTML content that should be rendered by this custom element
      this.shadowRoot.innerHTML = '\n        ' + afterMediaPlayer + '\n        ' + beforeMediaPlayer + '\n        ' + toggleButton + '\n    ';
      // append style to the shadow root of this custom element
      this.shadowRoot.appendChild(this.createStyle());

      // get sub-components from this custom element's shadow root 
      var subComponents = {
        beforeMedia: this.shadowRoot.getElementById("before-media"),
        beforeSource: this.shadowRoot.getElementById("before-source"),
        afterMedia: this.shadowRoot.getElementById("after-media"),
        afterSource: this.shadowRoot.getElementById("after-source"),
        toggleButton: this.shadowRoot.getElementById("toggle-button"),
        enhanceStatus: this.shadowRoot.getElementById("enhance-status")
      };

      // add event listeners to elements in MediaPlayer and ToggleButton
      subComponents.toggleButton.addEventListener("click", function () {
        return _this2.toggleMedia(subComponents);
      });

      subComponents.afterMedia.addEventListener("play", function () {
        return _this2.playVideo(subComponents);
      });

      subComponents.afterMedia.addEventListener("pause", function () {
        return _this2.pauseVideo(subComponents);
      });
      subComponents.afterMedia.addEventListener("ended", function () {
        return _this2.endVideo(subComponents);
      });

      // replace with videojs to hide controls.
      // subComponents.afterMedia.addEventListener("volumechange", () => {
      //   subComponents.afterMedia.volume = 1;
      //   subComponents.afterMedia.muted = !this.showAfter;
      //   subComponents.beforeMedia.muted = this.showAfter;
      // });
    }
  }]);

  return MediaComparison;
}(HTMLElement);

exports.default = MediaComparison;


customElements.define('media-comparison', MediaComparison);