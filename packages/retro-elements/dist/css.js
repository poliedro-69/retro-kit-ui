// Every color and font reads a --color-rt-* / --color-mac-* / --font-rt* custom property
// (inherited through the shadow boundary), so themes.css re-skins the elements too.
export const rtBase = `
:host{
  --_face:var(--color-rt-face,#dde0e6);
  --_face-hi:var(--color-rt-face-hi,#eceef2);
  --_light:var(--color-rt-light,#ffffff);
  --_shadow:var(--color-rt-shadow,#8c93a3);
  --_line:var(--color-rt-line,#20242f);
  --_ink:var(--color-rt-ink,#1b1f2a);
  --_paper:var(--color-rt-paper,#ffffff);
  --_pressed:var(--color-rt-pressed,#cdd1d9);
  --_accent:var(--color-rt-accent,#2b49c9);
  --_accent-deep:var(--color-rt-accent-deep,#162a82);
  --_accent-hi:var(--color-rt-accent-hi,#4663e0);
  --_accent-press:var(--color-rt-accent-press,#1f3aa8);
  --_on-accent:var(--color-rt-on-accent,#ffffff);
  --_warn:var(--color-rt-warn,#f5c542);
  --_ok:var(--color-rt-ok,#2f9e5b);
  --_danger:var(--color-rt-danger,#d64545);
  --_font:var(--font-rt,'IBM Plex Sans',ui-sans-serif,system-ui,sans-serif);
  --_mono:var(--font-rt-mono,'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,monospace);
  box-sizing:border-box;
}
*,*::before,*::after{box-sizing:border-box}
[hidden]{display:none!important}
:host([hidden]){display:none!important}
.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.raised{
  border:1px solid var(--_line);border-radius:3px;
  background-color:var(--_face);
  background-image:linear-gradient(180deg,var(--_face-hi),var(--_face));
  box-shadow:inset 1px 1px 0 var(--_light),inset -1px -1px 0 var(--_shadow),0 1px 2px rgb(0 0 0/.18);
}
.pressed{
  border:1px solid var(--_line);border-radius:3px;
  background-color:var(--_pressed);background-image:none;
  box-shadow:inset 1px 1px 3px rgb(0 0 0/.35);
}
.sunken{
  border:1px solid var(--_shadow);border-radius:2px;
  background-color:var(--_paper);
  box-shadow:inset 1px 1px 2px rgb(0 0 0/.28),1px 1px 0 var(--_light);
}
`;
export const macBase = `
:host{
  --_paper:var(--color-mac-paper,#ffffff);
  --_ink:var(--color-mac-ink,#000000);
  --_hover:var(--color-mac-hover,#f5f5f5);
  --_dim:var(--color-mac-dim,#737373);
  --_mono:var(--font-rt-mono,'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,monospace);
  box-sizing:border-box;
}
*,*::before,*::after{box-sizing:border-box}
[hidden]{display:none!important}
:host([hidden]){display:none!important}
.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
`;
