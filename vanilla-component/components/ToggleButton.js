class ToggleButton extends HTMLElement {
  constructor() {
    super();

    this.showAfter = null;
  }

  // creates a toggle button using standard HTML elements.
  createToggleButton() {
    let toggleContainer = document.createElement("label");
    toggleContainer.setAttribute("class", "toggle-container");

    let toggleButton = document.createElement("input");
    toggleButton.type = "checkbox";
    toggleButton.setAttribute("id", "toggle-button");
    // toggle on if the media player element shows "after" video first
    if (this.showAfter) toggleButton.setAttribute("checked", "");

    let toggleSlider = document.createElement("span");
    toggleSlider.setAttribute("class", "toggle-slider");

    let enhanceStatus = document.createElement("span");
    enhanceStatus.setAttribute("id", "enhance-status");
    enhanceStatus.innerHTML = this.showAfter ?
      "Dolby Enhance On" : "Dolby Enhance Off";

    toggleContainer.appendChild(toggleButton);
    toggleContainer.appendChild(toggleSlider);
    toggleContainer.appendChild(enhanceStatus);

    return toggleContainer.outerHTML;
  }

  // creates the CSS style rules for this component.
  createStyle() {
    let style = document.createElement("style");
    // add style rules for this custom element here
    style.innerHTML = `
      .toggle-container {
        margin-top: 1em;
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }

      .toggle-container input { 
        opacity: 0;
        width: 0;
        height: 0;
      }

      .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }

      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }

      input:checked + .toggle-slider {
        background-color: rgb(62, 68, 254);
      }

      input:focus + .toggle-slider {
        box-shadow: 0 0 1px rgb(62, 68, 254);
      }

      input:checked + .toggle-slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }

      .toggle-slider {
        border-radius: 34px;
      }

      .toggle-slider:before {
        border-radius: 50%;
      }

      #enhance-status {
        font-family: Avenir Next;
        margin-left: 60px;
        position: absolute;
        width: 200px;
        font-size: 18px;
        font-weight: 600;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    `

    return style;
  }

  // invoked when this component is added to the DOM
  connectedCallback() {
    // set this.showAfter when the element has been added to DOM
    this.showAfter = this.hasAttribute("showAfter");

    // set the innerHTML for this custom element
    this.innerHTML = this.createToggleButton();;
    // append style to this custom element
    this.appendChild(this.createStyle());
  }
}

customElements.define("toggle-button", ToggleButton);