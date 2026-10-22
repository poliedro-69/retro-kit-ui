const kebab = (name) => name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
// Importing this package on the server (Next.js SSR, Nuxt, SvelteKit) must not throw.
const BaseElement = typeof HTMLElement === 'undefined' ? class {
} : HTMLElement;
const sheetCache = new Map();
function adoptStyles(root, css) {
    const canAdopt = typeof CSSStyleSheet !== 'undefined' &&
        'replaceSync' in CSSStyleSheet.prototype &&
        'adoptedStyleSheets' in root;
    if (canAdopt) {
        let sheet = sheetCache.get(css);
        if (!sheet) {
            sheet = new CSSStyleSheet();
            sheet.replaceSync(css);
            sheetCache.set(css, sheet);
        }
        root.adoptedStyleSheets = [sheet];
        return;
    }
    const style = document.createElement('style');
    style.textContent = css;
    root.prepend(style);
}
export function hasContent(nodes) {
    return nodes.some((node) => node.nodeType === 1 || Boolean(node.textContent?.trim()));
}
export class RetroElement extends BaseElement {
    static get observedAttributes() {
        return Object.keys(this.props).map(kebab);
    }
    constructor() {
        super();
        this.ready = false;
        this.internals = null;
        const ctor = this.constructor;
        if (ctor.formAssociated && typeof this.attachInternals === 'function') {
            this.internals = this.attachInternals();
        }
    }
    template() {
        return '';
    }
    setup() { }
    update() { }
    connectedCallback() {
        const ctor = this.constructor;
        // Frameworks may set properties before the element is upgraded; replay them.
        for (const prop of Object.keys(ctor.props)) {
            if (Object.prototype.hasOwnProperty.call(this, prop)) {
                const value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }
        if (!this.ready) {
            if (ctor.shadow) {
                const root = this.shadowRoot ?? this.attachShadow({ mode: 'open', delegatesFocus: true });
                adoptStyles(root, ctor.css);
                root.innerHTML = this.template();
                this.root = root;
            }
            else {
                this.root = this;
            }
            this.ready = true;
            this.setup();
        }
        this.update();
    }
    attributeChangedCallback() {
        if (this.ready)
            this.update();
    }
    $(selector) {
        return this.root.querySelector(selector);
    }
    fire(type, init = { bubbles: true, composed: true }) {
        this.dispatchEvent(new Event(type, init));
    }
    watchSlot(slot, wrapper) {
        const sync = () => {
            wrapper.hidden = !hasContent(slot.assignedNodes({ flatten: true }));
        };
        slot.addEventListener('slotchange', sync);
        sync();
    }
}
RetroElement.css = '';
RetroElement.props = {};
RetroElement.shadow = true;
RetroElement.formAssociated = false;
export function defineElement(tag, ctor) {
    for (const [prop, type] of Object.entries(ctor.props)) {
        const attr = kebab(prop);
        Object.defineProperty(ctor.prototype, prop, {
            configurable: true,
            get() {
                if (type === 'boolean')
                    return this.hasAttribute(attr);
                const raw = this.getAttribute(attr);
                if (type === 'number')
                    return raw === null ? 0 : Number(raw);
                return raw ?? '';
            },
            set(value) {
                if (type === 'boolean')
                    this.toggleAttribute(attr, Boolean(value));
                else if (value === null || value === undefined)
                    this.removeAttribute(attr);
                else if (this.getAttribute(attr) !== String(value))
                    this.setAttribute(attr, String(value));
            },
        });
    }
    if (typeof customElements !== 'undefined' && !customElements.get(tag)) {
        customElements.define(tag, ctor);
    }
}
