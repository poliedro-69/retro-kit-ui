export type PropType = 'string' | 'boolean' | 'number';
export type PropSpec = Record<string, PropType>;
declare const BaseElement: typeof HTMLElement;
export declare function hasContent(nodes: Node[]): boolean;
export declare abstract class RetroElement extends BaseElement {
    static css: string;
    static props: PropSpec;
    static shadow: boolean;
    static formAssociated: boolean;
    static get observedAttributes(): string[];
    protected root: ShadowRoot | this;
    protected ready: boolean;
    protected internals: ElementInternals | null;
    constructor();
    protected template(): string;
    protected setup(): void;
    protected update(): void;
    connectedCallback(): void;
    attributeChangedCallback(): void;
    protected $<T extends Element = HTMLElement>(selector: string): T;
    protected fire(type: string, init?: EventInit): void;
    protected watchSlot(slot: HTMLSlotElement, wrapper: HTMLElement): void;
}
type ElementClass = {
    new (): RetroElement;
    props: PropSpec;
    prototype: RetroElement;
};
export declare function defineElement(tag: string, ctor: ElementClass): void;
export {};
