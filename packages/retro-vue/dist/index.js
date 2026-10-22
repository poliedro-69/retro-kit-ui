import '@your-scope/retrokit-elements';
import { createWrapper } from './factory';
const field = {
    label: 'string',
    type: 'string',
    name: 'string',
    placeholder: 'string',
    disabled: 'boolean',
    required: 'boolean',
    readonly: 'boolean',
};
const toggle = { value: 'string', name: 'string', disabled: 'boolean' };
/* Windows 3.1 */
export const RtWindow = createWrapper({
    name: 'RtWindow',
    tag: 'rt-window',
    props: { heading: 'string', closable: 'boolean' },
    slots: ['menu', 'status'],
});
export const RtButton = createWrapper({
    name: 'RtButton',
    tag: 'rt-button',
    props: { variant: 'string', size: 'string', type: 'string', disabled: 'boolean' },
});
export const RtInput = createWrapper({
    name: 'RtInput',
    tag: 'rt-input',
    props: { ...field, hint: 'string' },
    model: 'text',
});
export const RtCheckbox = createWrapper({ name: 'RtCheckbox', tag: 'rt-checkbox', props: toggle, model: 'checked' });
export const RtRadio = createWrapper({ name: 'RtRadio', tag: 'rt-radio', props: toggle, model: 'radio' });
export const RtGroup = createWrapper({ name: 'RtGroup', tag: 'rt-group', props: { legend: 'string' } });
export const RtProgress = createWrapper({
    name: 'RtProgress',
    tag: 'rt-progress',
    props: { value: 'number', label: 'string' },
});
export const RtBadge = createWrapper({ name: 'RtBadge', tag: 'rt-badge', props: { tone: 'string' } });
export const RtTabs = createWrapper({ name: 'RtTabs', tag: 'rt-tabs', model: 'tabs' });
export const RtTab = createWrapper({ name: 'RtTab', tag: 'rt-tab', props: { name: 'string', label: 'string' } });
export const RtDialog = createWrapper({
    name: 'RtDialog',
    tag: 'rt-dialog',
    props: { heading: 'string', open: 'boolean' },
    slots: ['actions'],
});
/* Mac System 7 */
export const MacWindow = createWrapper({ name: 'MacWindow', tag: 'mac-window', props: { heading: 'string' } });
export const MacButton = createWrapper({
    name: 'MacButton',
    tag: 'mac-button',
    props: { isDefault: 'boolean', type: 'string', disabled: 'boolean' },
});
export const MacInput = createWrapper({ name: 'MacInput', tag: 'mac-input', props: field, model: 'text' });
export const MacCheckbox = createWrapper({ name: 'MacCheckbox', tag: 'mac-checkbox', props: toggle, model: 'checked' });
export const MacRadio = createWrapper({ name: 'MacRadio', tag: 'mac-radio', props: toggle, model: 'radio' });
export const MacGroup = createWrapper({ name: 'MacGroup', tag: 'mac-group', props: { legend: 'string' } });
export const MacProgress = createWrapper({
    name: 'MacProgress',
    tag: 'mac-progress',
    props: { value: 'number', label: 'string' },
});
export const MacAlert = createWrapper({
    name: 'MacAlert',
    tag: 'mac-alert',
    props: { label: 'string' },
    slots: ['actions'],
});
export const components = {
    RtWindow,
    RtButton,
    RtInput,
    RtCheckbox,
    RtRadio,
    RtGroup,
    RtProgress,
    RtBadge,
    RtTabs,
    RtTab,
    RtDialog,
    MacWindow,
    MacButton,
    MacInput,
    MacCheckbox,
    MacRadio,
    MacGroup,
    MacProgress,
    MacAlert,
};
/** app.use(RetroKit) registers every component globally. */
export const RetroKit = {
    install(app) {
        for (const [name, component] of Object.entries(components))
            app.component(name, component);
    },
};
export { isRetroElement } from '@your-scope/retrokit-elements';
export default RetroKit;
