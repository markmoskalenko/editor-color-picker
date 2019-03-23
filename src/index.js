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
    width: 24,
    height: 24,
    spacingX: 8,
    spacingY: 8,
    borderRadius: '100%'
  },
  debug: false,
  iconColor: '#009900'
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
   * Class name for Inline Toolbar button's container
   * 
   * @type {string}
   */
  static get containerBaseClass() {
    return 'cdx-font-color__container';
  }

  /**
   * Class name for color buttons from color popup
   * 
   * @type {string}
   */
  static get colorButtonClass() {
    return 'cdx-font-color__color-button';
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
   * Class name for popup with color buttons
   *
   * @type {string}
   */
  static get popupBaseClass() {
    return FontColor.inlineBlockClass + '__popup';
  }

  /**
   * Class name for popup when hidden
   *
   * @type {string}
   */
  static get hiddenPopupClass() {
    return FontColor.popupBaseClass + '_hidden';
  }

  // END CSS CLASSES

  /**
   * 
   */
  static get stylesDataAttributeColorSeparator() {
    return ';';
  }

  /**
   * Data attribute applied on HTML style elements that were inserted by this class
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
    this.config = {...defaultConfig, config};

    /**
     * Selected font color
     * 
     * @type {string}
     */
    this.color = 'inherit';

    this.createColorClasses();

    /**
     * If true, output additional information into browser's console
     * 
     * @type {boolean}
     */
    this.debug = this.config.debug;

    /**
     * Popup with colors
     * 
     * @type {HTMLElement|undefined}
     */
    this.popup = undefined;

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
   * Create color button
   * 
   * Color button is a button from color popup.
   * When clicked, the button applies its background color to selected text.
   * 
   * @param {string} color 
   */
  createColorButton(color) {
    const button = document.createElement('button');
    button.classList.add(FontColor.colorButtonClass);
    button.style.backgroundColor = color;
    button.style.width = this.config.colorButton.width + 'px';
    button.style.height = this.config.colorButton.height + 'px';
    button.style.marginBottom = this.config.colorButton.spacingY + 'px';
    button.style.marginRight = this.config.colorButton.spacingX + 'px';
    button.style.borderRadius = this.config.colorButton.borderRadius;
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
    this.haveColorClassesBeenCreated = true;
  }

  /**
   * Remove current color if exists and apply the new one
   * 
   * @param {string} color 
   */
  handleColorButtonClick(color) {
    this.color = color;
    if (this.range) {
      const termWrapper = this.api.selection.findParentTag(this.tag, FontColor.inlineBlockClass);
      if (this.debug) {
        console.log('termWrapper: ', termWrapper);
      }
      if (termWrapper) {
        this.unwrap(termWrapper);
      }
      this.wrap(this.range);
    } else {
      if (this.debug) {
        console.warn('Color applied without range');
      }
    }
  }

  /**
   * Create button element for Toolbar
   *
   * @return {HTMLElement}
   */
  render() {
    const container = document.createElement('span');
    container.classList.add(FontColor.containerBaseClass);
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.iconClasses.base);
    this.popup = document.createElement('div');
    const colorButtons = this.config.colors.map(color => this.createColorButton(color));
    this.popup.classList.add(FontColor.popupBaseClass, FontColor.hiddenPopupClass);
    this.popup.style.width = (this.config.columnsCount * (this.config.colorButton.width + this.config.colorButton.spacingX) + this.config.colorButton.spacingX) + 'px';
    this.popup.style.paddingLeft = this.config.colorButton.spacingX + 'px';
    this.popup.style.paddingTop = this.config.colorButton.spacingY + 'px';
    this.popup.append(...colorButtons);
    this.popup.tabIndex = 0;
    this.popup.addEventListener('blur', () => {
      this.popup.classList.toggle(FontColor.hiddenPopupClass, true);
    });
    container.appendChild(this.button);
    container.appendChild(this.popup);
    const icon = document.createElement('b');
    icon.append('a');
    icon.style.color = this.config.iconColor;
    icon.classList.add(FontColor.iconClass);
    this.button.appendChild(icon);
    return container;
  }

  /**
   * Handle Inline Toolbar button click
   * 
   * Show colors popup
   *
   * @param {Range} range - selected fragment
   */
  surround(range) {
    this.range = range;
    if (!range) {
      return;
    }
    this.popup.classList.toggle(FontColor.hiddenPopupClass, false);
    this.popup.focus();
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
   * Check and change Term's state for current selection
   */
  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, FontColor.inlineBlockClass);
    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }
}

module.exports = FontColor;

