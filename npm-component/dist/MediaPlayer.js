"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaPlayer = function (_HTMLElement) {
  _inherits(MediaPlayer, _HTMLElement);

  function MediaPlayer() {
    _classCallCheck(this, MediaPlayer);

    var _this = _possibleConstructorReturn(this, (MediaPlayer.__proto__ || Object.getPrototypeOf(MediaPlayer)).call(this));

    _this.isAudio = null;
    _this.isAfter = null;
    _this.poster = null;
    _this.mediaFile = null;
    _this.mime = null;
    return _this;
  }

  _createClass(MediaPlayer, [{
    key: "createMedia",
    value: function createMedia() {
      var media = document.createElement(this.isAudio ? "audio" : "video");
      media.setAttribute("id", this.isAfter ? "after-media" : "before-media");
      media.setAttribute("poster", this.poster);
      media.style.display = this.isAfter ? 'block' : 'none';
      if (this.isAfter) media.controls = true;

      var source = document.createElement("source");
      source.setAttribute("id", this.isAfter ? "after-source" : "before-source");
      source.setAttribute("src", this.mediaFile);
      source.setAttribute("mime", this.mime || (this.isAudio ? "audio/mp3" : "video/mp4"));

      media.appendChild(source);

      return media.outerHTML;
    }
  }, {
    key: "createStyle",
    value: function createStyle() {
      var style = document.createElement("style");
      // insert style for the mediaPlayer component here
      style.innerHTML = "";

      return style;
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.isAudio = this.hasAttribute("isAudio");
      this.isAfter = this.hasAttribute("isAfter");
      this.poster = this.getAttribute("poster");
      this.mediaFile = this.getAttribute("mediaFile");
      this.mime = this.getAttribute("mime");

      this.innerHTML = this.createMedia();
      this.appendChild(this.createStyle());
    }
  }]);

  return MediaPlayer;
}(HTMLElement);

exports.default = MediaPlayer;


customElements.define("media-player", MediaPlayer);