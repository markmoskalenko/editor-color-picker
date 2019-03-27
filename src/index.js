/**
 * Build styles
 */
require('./index.css').toString();


const defaultConfig = {
  colors: [
    '#009900',
    '#990000',
    '#000099',
    '#000000',
  ],
  columnsCount: 4,
  colorButton: {
    width: 40,
    height: 40,
    spacingX: 8,
    spacingY: 8,
    borderRadius: '4px',
    border: 'none',
    appliedColorIcon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"> <defs> <path id="cdx-font-color__icon-done%id%6" d="M8.689 15.637l-3.026-3.033L4 14.27l3.992 4.003.733.726L19.996 7.7 18.3 6z"/> </defs> <g fill="none" fill-rule="evenodd"> <mask id="cdx-font-color__icon-done4%id%" fill="#fff"> <use xlink:href="#cdx-font-color__icon-done%id%6"/> </mask> <use fill="#fff" fill-rule="nonzero" xlink:href="#cdx-font-color__icon-done%id%6"/> <g fill="#fff" mask="url(#cdx-font-color__icon-done4%id%)"> <path d="M0 0h24v24H0z"/> </g> </g></svg>',
  },
  noColorButton: {
    border: '1px solid #e4e5e9',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"> <defs> <path id="cdx-font-color__icon-erasor%id%0" d="M10.999 16.286l3-3.429H7.142l-3 3.429h6.857zm9.044-9.616c.179.41.108.884-.187 1.223l-8 9.143c-.214.25-.527.393-.857.393H4.142c-.447 0-.858-.26-1.045-.67a1.156 1.156 0 0 1 .187-1.223l8-9.143c.215-.25.527-.393.858-.393h6.857c.446 0 .857.259 1.044.67z"/> </defs> <g fill="none" fill-rule="evenodd"> <mask id="cdx-font-color__icon-erasor2%id%" fill="#fff"> <use xlink:href="#cdx-font-color__icon-erasor%id%0"/> </mask> <use fill="#000" xlink:href="#cdx-font-color__icon-erasor%id%0"/> <g fill="currentColor" mask="url(#cdx-font-color__icon-erasor2%id%)"> <path d="M0 0h24v24H0z"/> </g> </g></svg>',
    iconColor: '#556066'
  },
  debug: false,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><path d="M19.022 6.224a.722.722 0 0 1 .216.531c0 .21-.072.387-.216.531L12.308 14l-2.07-2.07 6.714-6.714A.722.722 0 0 1 17.483 5c.21 0 .387.072.531.216l1.008 1.008zM8.726 13.262c.396 0 .768.102 1.116.306.348.204.624.48.828.828.204.348.306.72.306 1.116a2.88 2.88 0 0 1-.405 1.494c-.27.456-.633.819-1.089 1.089-.456.27-.957.405-1.503.405-.546 0-1.092-.138-1.638-.414A3.831 3.831 0 0 1 5 16.988c.228 0 .456-.057.684-.171.228-.114.414-.273.558-.477.156-.24.234-.516.234-.828 0-.396.102-.768.306-1.116.204-.348.48-.624.828-.828a2.17 2.17 0 0 1 1.116-.306z"></path></svg>'
};


/**
 * Font Color Tool for the Editor.js
 *
 * Allows to change font color of inline fragment.
 */
class FontColor {
  /**
   * Specifies the tool as Inline Toolbar Tool
   *
   * @return {boolean}
   */
  static get isInline() {
    return true;
  }

  // CSS CLASSES

  /**
   * Class name for color buttons from color popup
   * 
   * @type {string}
   */
  static get colorButtonClass() {
    return 'cdx-font-color__color-button';
  }

  /**
   * Class name for color button when its color is applied on selected text
   */
  static get colorButtonAppliedClass() {
    return FontColor.colorButtonClass + '_applied';
  }

  /**
   * Class name for color button that removes color
   * 
   * @type {string}
   */
  static get noColorButtonClass() {
    return 'cdx-font-color__color-button_no-color';
  }

  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get inlineBlockClass() {
    return 'cdx-font-color';
  }

  /**
   * Class name for icon inside Inline Toolbar button
   * 
   * @type {string}
   */
  static get iconClass() {
    return 'cdx-font-color__icon';
  }

  /**
   * Class name for panel with color buttons
   *
   * @type {string}
   */
  static get panelBaseClass() {
    return FontColor.inlineBlockClass + '__panel';
  }

  /**
   * Class name for panel when hidden
   * 
   * @type {string}
   */
  static get panelHiddenClass() {
    return FontColor.panelBaseClass + '_hidden';
  }

  // END CSS CLASSES

  /**
   * Character separating colors in data attribute of style element
   */
  static get stylesDataAttributeColorSeparator() {
    return ';';
  }

  /**
   * Data attribute applied on HTML style elements inserted by Font Color
   */
  static get stylesDataAttribute() {
    return 'data-editorjs_font_color_plugin';
  }

  /**
   * Sanitizer rule
   */
  static get sanitize() {
    return {
      span: {
        class: true,
        'data-color': true
      }
    };
  }

  /**
   * CSS class for given color
   * 
   * @param {string} color 
   */
  static classFor(color) {
    return [FontColor.inlineBlockClass, color.replace('#', 'hash')].join('_');
  }

  /**
   * @param {{api: object, config: {colors: string[], columnsCount: number, iconColor: string, colorButton: {width: number, height: number, spacingX: number, spacingY: number, borderRadius: string}, debug: boolean}}}
   */
  constructor({api, config}) {
    this.api = api;

    /**
     * Toolbar Button
     *
     * @type {HTMLElement|undefined}
     */
    this.button = undefined;

    /**
     * Configure styles and available colors
     * 
     * @see defaultConfig
     */
    this.config = {...defaultConfig, ...config};
    /**
     * Selected font color
     * 
     * @type {string}
     */
    this.color = 'inherit';

    /**
     * Color buttons from panel
     * 
     * @type {HTMLButtonElement[]}
     */
    this.colorButtons = [];

    this.createColorClasses();

    /**
     * If true, output additional information into browser's console
     * 
     * @type {boolean}
     */
    this.debug = this.config.debug;

    /**
     * Panel with color buttons
     * Appears after the Inline Toolbar button has been clicked 
     * 
     * @type {HTMLElement|undefined}
     */
    this.panel = undefined;

    /**
     * Last selected range
     * 
     * @type {Range|undefined}
     */
    this.range = undefined;

    /**
     * Tag representing the term
     *
     * @type {string}
     */
    this.tag = 'SPAN';

    /**
     * CSS classes for Inline Toolbar icon
     */
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive
    };
  }


  /**
   * Check and change Term's state for current selection
   */
  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, FontColor.inlineBlockClass);
    this.button.classList.toggle(this.iconClasses.active, !!termTag);
    if (!termTag) {
      return;
    }
    const color = termTag.getAttribute('data-color');
    this.updateColorButtonsStatuses(color);
  }

  /**
   * Handle opening/closing of Inline Toolbar
   */
  clear() {
    this.hidePanel();
  }

  /**
   * Create color button
   * 
   * Color button is a button from color popup.
   * When clicked, the button applies its background color to selected text.
   * 
   * @param {string|undefined} color 
   */
  createColorButton(color) {
    const randomIdPart = (Math.random() * 1000).toString().split('.')[1];
    const button = document.createElement('button');
    button.classList.add(FontColor.colorButtonClass);
    button.setAttribute('data-color', color);
    const icon = this.config.colorButton.appliedColorIcon.replace(/%id%/g, randomIdPart);
    button.innerHTML = icon;
    button.style.backgroundColor = color || 'transparent';
    button.style.width = this.config.colorButton.width + 'px';
    button.style.height = this.config.colorButton.height + 'px';
    button.style.marginBottom = this.config.colorButton.spacingY + 'px';
    button.style.marginRight = this.config.colorButton.spacingX + 'px';
    button.style.borderRadius = this.config.colorButton.borderRadius;
    button.style.border = this.config.colorButton.border;
    if (!color) {
      button.classList.add(FontColor.noColorButtonClass);
      button.innerHTML = this.config.noColorButton.icon.replace(/%id%/g, randomIdPart);
      button.style.color = this.config.noColorButton.iconColor;
      const border = this.config.noColorButton.border || this.config.colorButton.border;
      button.style.border = border;
    }
    button.addEventListener('click', () => this.handleColorButtonClick(color));
    return button;
  }

  /**
   * Create stylesheet for colors
   * 
   * For each color from config a class has to be created.
   * If there is already a class for that color, skip.
   */
  createColorClasses() {
    const existingStyles = document.head.getElementsByTagName('style');
    // style elements created by this plugin
    const fontColorStyles = [].filter.call(existingStyles, styleElement => styleElement.hasAttribute(FontColor.stylesDataAttribute));
    const colorsWithClassesAlreadyCreated = fontColorStyles
      .map(styleElement => styleElement.getAttribute(FontColor.stylesDataAttribute).split(FontColor.stylesDataAttributeColorSeparator))
      .flat();
    const colorsToCreateClasses = this.config.colors
      .filter(color => colorsWithClassesAlreadyCreated.indexOf(color) === -1);
    const css = colorsToCreateClasses
      .map(color => `.${FontColor.classFor(color)}{color:${color}}`)
      .join('')
      .trim();
    if (!css) {
      return;
    }
    const styles = document.createElement('style');
    styles.type = 'text/css';
    styles.innerHTML = css;
    const attrValue = this.config.colors.join(FontColor.stylesDataAttributeColorSeparator);
    styles.setAttribute(FontColor.stylesDataAttribute, attrValue);
    document.head.appendChild(styles);
  }

  /**
   * Remove current color if exists and apply the new one
   * 
   * @param {string|undefined} color 
   */
  handleColorButtonClick(color) {
    if (this.debug) {
      console.log('clicked on color: ', color);
    }
    this.color = color || 'inherit';
    if (!this.range) {
      if (this.debug) {
        console.warn('Color applied without range: ', this.range);
      }
      return;
    }
    const termWrapper = this.api.selection.findParentTag(this.tag, FontColor.inlineBlockClass);
    if (this.debug) {
      console.log('termWrapper: ', termWrapper);
    }
    if (termWrapper) {
      this.unwrap(termWrapper);
    }
    if (color) {
      this.wrap(this.range);
    }
    this.updateColorButtonsStatuses(color);
  }

  /**
   * Hide colors panel
   */
  hidePanel() {
    this.panel.classList.toggle(FontColor.panelHiddenClass, true);
  }

  /**
   * Create button element for Toolbar
   *
   * @return {HTMLElement}
   */
  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.config.icon;
    this.button.addEventListener('click', () => this.panel.classList.toggle(FontColor.panelHiddenClass));
    // need timeout 'couse but has not been rendered yet 
    setTimeout(() => {
      const siblings = [].filter.call(this.button.parentElement.children, child => this.button !== child);
      // hide colors panel when another inline tool is clicked
      siblings.forEach(sibling => sibling.addEventListener('click', () => this.hidePanel()));
    }, 50);
    return this.button;
  }

  /**
   * Create colors panel
   * 
   * @returns {HTMLElement}
   */
  renderActions() {
    this.panel = document.createElement('div');

    /**
     * Buttons for each color from config
     * 
     * @type {HTMLButtonElement[]}
     */
    const userColorButtons = this.config.colors
      .map(color => this.createColorButton(color));

    /**
     * Button to remove color
     * 
     * @type {HTMLButtonElement}
     */
    const noColorButton = this.createColorButton();

    this.colorButtons = [
      ...userColorButtons,
      noColorButton
    ];
    this.panel.classList.add(FontColor.panelBaseClass, FontColor.panelHiddenClass);
    this.panel.style.width = (this.config.columnsCount * (this.config.colorButton.width + this.config.colorButton.spacingX) + this.config.colorButton.spacingX) + 'px';
    this.panel.style.paddingLeft = this.config.colorButton.spacingX + 'px';
    this.panel.style.paddingTop = this.config.colorButton.spacingY + 'px';
    this.panel.append(...this.colorButtons);
    this.panel.tabIndex = 0;
    return this.panel;
  }

  /**
   * Show colors panel
   */
  showPanel() {
    this.panel.classList.toggle(FontColor.panelHiddenClass, false);
  }

  /**
   * Handle selection
   *
   * @param {Range} range - selected fragment
   */
  surround(range) {
    if (this.debug) {
      console.log('surround: ', range);
    }
    this.range = range;
  }

  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(range) {
    /**
     * Wrapper for coloring
     */
    const span = document.createElement(this.tag);
    span.classList.add(FontColor.inlineBlockClass, FontColor.classFor(this.color));
    span.setAttribute('data-color', this.color);
    span.appendChild(range.extractContents());
    range.insertNode(span);
    /**
     * Expand selection to colored block
     */
    this.api.selection.expandToTag(span);
  }

  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(termWrapper) {
    /**
     * Expand selection to term-tag
     */
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    this.range = sel.getRangeAt(0);

    const unwrappedContent = this.range.extractContents();

    /**
     * Remove empty term-tag
     */
    termWrapper.remove();

    /**
     * Insert extracted content
     */
    this.range.insertNode(unwrappedContent);

    /**
     * Restore selection
     */
    sel.removeAllRanges();
    sel.addRange(this.range);
  }

  /**
   * 
   * @param {string} color 
   */
  updateColorButtonsStatuses(color) {
    this.colorButtons.forEach(button => {
      const isApplied = button.getAttribute('data-color') === color;
      button.classList.toggle(FontColor.colorButtonAppliedClass, isApplied);
    });
  }
}

module.exports = FontColor;

