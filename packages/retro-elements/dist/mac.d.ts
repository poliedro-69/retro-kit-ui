import { RetroElement } from './base';
export declare class MacWindow extends RetroElement {
    static css: string;
    static props: {
        heading: "string";
    };
    heading: string;
    protected template(): string;
    protected update(): void;
}
export declare class MacButton extends RetroElement {
    static css: string;
    static formAssociated: boolean;
    static props: {
        isDefault: "boolean";
        type: "string";
        disabled: "boolean";
    };
    isDefault: boolean;
    type: 'button' | 'submit' | 'reset';
    disabled: boolean;
    protected template(): string;
    protected setup(): void;
    protected update(): void;
}
export declare class MacInput extends RetroElement {
    static css: string;
    static formAssociated: boolean;
    static props: {
        label: "string";
        value: "string";
        type: "string";
        name: "string";
        placeholder: "string";
        disabled: "boolean";
        required: "boolean";
        readonly: "boolean";
    };
    label: string;
    value: string;
    type: string;
    name: string;
    placeholder: string;
    disabled: boolean;
    required: boolean;
    readonly: boolean;
    protected template(): string;
    protected setup(): void;
    protected update(): void;
    formResetCallback(): void;
}
export declare class MacCheckbox extends RetroElement {
    static css: string;
    static formAssociated: boolean;
    static props: {
        checked: "boolean";
        disabled: "boolean";
        name: "string";
        value: "string";
    };
    checked: boolean;
    disabled: boolean;
    name: string;
    value: string;
    protected template(): string;
    protected setup(): void;
    protected update(): void;
    formResetCallback(): void;
}
export declare class MacRadio extends RetroElement {
    static css: string;
    static formAssociated: boolean;
    static props: {
        checked: "boolean";
        disabled: "boolean";
        name: "string";
        value: "string";
    };
    checked: boolean;
    disabled: boolean;
    name: string;
    value: string;
    protected template(): string;
    protected setup(): void;
    private uncheckSiblings;
    protected update(): void;
    formResetCallback(): void;
}
export declare class MacGroup extends RetroElement {
    static css: string;
    static props: {
        legend: "string";
    };
    legend: string;
    protected template(): string;
    protected update(): void;
}
export declare class MacProgress extends RetroElement {
    static css: string;
    static props: {
        value: "number";
        label: "string";
    };
    value: number;
    label: string;
    protected template(): string;
    protected update(): void;
}
export declare class MacAlert extends RetroElement {
    static css: string;
    static props: {
        label: "string";
    };
    label: string;
    protected template(): string;
    protected setup(): void;
    protected update(): void;
}
export declare const macElements: {
    readonly 'mac-window': typeof MacWindow;
    readonly 'mac-button': typeof MacButton;
    readonly 'mac-input': typeof MacInput;
    readonly 'mac-checkbox': typeof MacCheckbox;
    readonly 'mac-radio': typeof MacRadio;
    readonly 'mac-group': typeof MacGroup;
    readonly 'mac-progress': typeof MacProgress;
    readonly 'mac-alert': typeof MacAlert;
};
