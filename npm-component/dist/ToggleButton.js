"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleButton = function (_HTMLElement) {
  _inherits(ToggleButton, _HTMLElement);

  function ToggleButton() {
    _classCallCheck(this, ToggleButton);

    var _this = _possibleConstructorReturn(this, (ToggleButton.__proto__ || Object.getPrototypeOf(ToggleButton)).call(this));

    _this.showAfter = null;
    return _this;
  }

  // creates a toggle button using standard HTML elements.


  _createClass(ToggleButton, [{
    key: "createToggleButton",
    value: function createToggleButton() {
      var toggleContainer = document.createElement("label");
      toggleContainer.setAttribute("class", "toggle-container");

      var toggleButton = document.createElement("input");
      toggleButton.type = "checkbox";
      toggleButton.setAttribute("id", "toggle-button");
      // toggle on if the media player element shows "after" video first
      if (this.showAfter) toggleButton.setAttribute("checked", "");

      var toggleSlider = document.createElement("span");
      toggleSlider.setAttribute("class", "toggle-slider");

      var enhanceStatus = document.createElement("span");
      enhanceStatus.setAttribute("id", "enhance-status");
      enhanceStatus.innerHTML = this.showAfter ? "Dolby Enhance On" : "Dolby Enhance Off";

      toggleContainer.appendChild(toggleButton);
      toggleContainer.appendChild(toggleSlider);
      toggleContainer.appendChild(enhanceStatus);

      return toggleContainer.outerHTML;
    }

    // creates the CSS style rules for this component.

  }, {
    key: "createStyle",
    value: function createStyle() {
      var style = document.createElement("style");
      // add style rules for this custom element here
      style.innerHTML = "\n      .toggle-container {\n        margin-top: 1em;\n        position: relative;\n        display: inline-block;\n        width: 60px;\n        height: 34px;\n      }\n\n      .toggle-container input { \n        opacity: 0;\n        width: 0;\n        height: 0;\n      }\n\n      .toggle-slider {\n        position: absolute;\n        cursor: pointer;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: #ccc;\n        -webkit-transition: .4s;\n        transition: .4s;\n      }\n\n      .toggle-slider:before {\n        position: absolute;\n        content: \"\";\n        height: 26px;\n        width: 26px;\n        left: 4px;\n        bottom: 4px;\n        background-color: white;\n        -webkit-transition: .4s;\n        transition: .4s;\n      }\n\n      input:checked + .toggle-slider {\n        background-color: rgb(62, 68, 254);\n      }\n\n      input:focus + .toggle-slider {\n        box-shadow: 0 0 1px rgb(62, 68, 254);\n      }\n\n      input:checked + .toggle-slider:before {\n        -webkit-transform: translateX(26px);\n        -ms-transform: translateX(26px);\n        transform: translateX(26px);\n      }\n\n      .toggle-slider {\n        border-radius: 34px;\n      }\n\n      .toggle-slider:before {\n        border-radius: 50%;\n      }\n\n      #enhance-status {\n        font-family: Avenir Next;\n        margin-left: 60px;\n        position: absolute;\n        width: 200px;\n        font-size: 18px;\n        font-weight: 600;\n        top: 50%;\n        -ms-transform: translateY(-50%);\n        transform: translateY(-50%);\n      }\n    ";

      return style;
    }

    // invoked when this component is added to the DOM

  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      // set this.showAfter when the element has been added to DOM
      this.showAfter = this.hasAttribute("showAfter");

      // set the innerHTML for this custom element
      this.innerHTML = this.createToggleButton();;
      // append style to this custom element
      this.appendChild(this.createStyle());
    }
  }]);

  return ToggleButton;
}(HTMLElement);

exports.default = ToggleButton;


customElements.define("toggle-button", ToggleButton);