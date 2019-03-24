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
   * Class name for color buttons from color popup
   * 
   * @type {string}
   */
  static get colorButtonClass() {
    return 'cdx-font-color__color-button';
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
    const button = document.createElement('button');
    button.classList.add(FontColor.colorButtonClass);
    if (!color) {
      button.classList.add(FontColor.noColorButtonClass);
    }
    button.style.backgroundColor = color || 'transparent';
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
    const icon = document.createElement('b');
    icon.append('a');
    icon.style.color = this.config.iconColor;
    icon.classList.add(FontColor.iconClass);
    this.button.appendChild(icon);
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

    const colorButtons = [
      noColorButton,
      ...userColorButtons
    ];
    this.panel.classList.add(FontColor.panelBaseClass, FontColor.panelHiddenClass);
    this.panel.style.width = (this.config.columnsCount * (this.config.colorButton.width + this.config.colorButton.spacingX) + this.config.colorButton.spacingX) + 'px';
    this.panel.style.paddingLeft = this.config.colorButton.spacingX + 'px';
    this.panel.style.paddingTop = this.config.colorButton.spacingY + 'px';
    this.panel.append(...colorButtons);
    this.panel.tabIndex = 0;
    //this.panel.addEventListener('blur', () => this.api.toolbar.close());
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
    if (!range) {
      return;
    }
    //this.panel.classList.toggle(FontColor.panelHiddenClass, false);
    //this.panel.focus();
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

