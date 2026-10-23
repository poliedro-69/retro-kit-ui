import { RetroElement } from './base';
export declare class RtWindow extends RetroElement {
    static css: string;
    static props: {
        heading: 'string';
        closable: 'boolean';
    };
    heading: string;
    closable: boolean;
    protected template(): string;
    protected setup(): void;
    protected update(): void;
}
export declare class RtButton extends RetroElement {
    static css: string;
    static formAssociated: boolean;
    static props: {
        variant: 'string';
        size: 'string';
        type: 'string';
        disabled: 'boolean';
    };
    variant: 'default' | 'primary';
    size: 'md' | 'sm';
    type: 'button' | 'submit' | 'reset';
    disabled: boolean;
    protected template(): string;
    protected setup(): void;
    protected update(): void;
}
export declare class RtInput extends RetroElement {
    static css: string;
    static formAssociated: boolean;
    static props: {
        label: 'string';
        hint: 'string';
        value: 'string';
        type: 'string';
        name: 'string';
        placeholder: 'string';
        disabled: 'boolean';
        required: 'boolean';
        readonly: 'boolean';
    };
    label: string;
    hint: string;
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
export declare class RtCheckbox extends RetroElement {
    static css: string;
    static formAssociated: boolean;
    static props: {
        checked: 'boolean';
        disabled: 'boolean';
        name: 'string';
        value: 'string';
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
export declare class RtRadio extends RetroElement {
    static css: string;
    static formAssociated: boolean;
    static props: {
        checked: 'boolean';
        disabled: 'boolean';
        name: 'string';
        value: 'string';
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
export declare class RtGroup extends RetroElement {
    static css: string;
    static props: {
        legend: 'string';
    };
    legend: string;
    protected template(): string;
    protected update(): void;
}
export declare class RtProgress extends RetroElement {
    static css: string;
    static props: {
        value: 'number';
        label: 'string';
    };
    value: number;
    label: string;
    protected template(): string;
    protected update(): void;
}
export declare class RtBadge extends RetroElement {
    static css: string;
    static props: {
        tone: 'string';
    };
    tone: 'neutral' | 'info' | 'warn' | 'ok' | 'danger';
    protected template(): string;
}
export declare class RtTab extends RetroElement {
    static shadow: boolean;
    static props: {
        name: 'string';
        label: 'string';
        selected: 'boolean';
    };
    name: string;
    label: string;
    selected: boolean;
    protected update(): void;
}
export declare class RtTabs extends RetroElement {
    static css: string;
    static props: {
        value: 'string';
    };
    value: string;
    protected template(): string;
    protected setup(): void;
    private panels;
    private select;
    refresh(): void;
    protected update(): void;
}
export declare class RtDialog extends RetroElement {
    static css: string;
    static props: {
        heading: 'string';
        open: 'boolean';
    };
    heading: string;
    open: boolean;
    protected template(): string;
    protected setup(): void;
    protected update(): void;
}
export declare const windowsElements: {
    readonly 'rt-window': typeof RtWindow;
    readonly 'rt-button': typeof RtButton;
    readonly 'rt-input': typeof RtInput;
    readonly 'rt-checkbox': typeof RtCheckbox;
    readonly 'rt-radio': typeof RtRadio;
    readonly 'rt-group': typeof RtGroup;
    readonly 'rt-progress': typeof RtProgress;
    readonly 'rt-badge': typeof RtBadge;
    readonly 'rt-tab': typeof RtTab;
    readonly 'rt-tabs': typeof RtTabs;
    readonly 'rt-dialog': typeof RtDialog;
};
