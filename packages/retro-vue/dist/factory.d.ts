export type FieldKind = 'none' | 'text' | 'checked' | 'radio' | 'tabs';
type PropKind = 'string' | 'boolean' | 'number';
type PropMap = Record<string, PropKind>;
export declare function createWrapper(options: {
    name: string;
    tag: string;
    props?: PropMap;
    slots?: string[];
    model?: FieldKind;
}): import("vue").DefineComponent<{}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").PublicProps, Readonly<{}> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export {};
