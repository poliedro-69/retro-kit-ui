import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'RetroKit — free retro UI kits for React and Tailwind'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#168b91',
        color: '#101010',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        height: '100%',
        padding: '56px',
        width: '100%',
      }}
    >
      <div style={{ background: '#c0c0c0', border: '8px solid #101010', display: 'flex', flexDirection: 'column', height: '100%', padding: '22px' }}>
        <div style={{ background: '#000080', color: '#fff', display: 'flex', fontSize: 30, fontWeight: 700, padding: '12px 18px' }}>
          RetroKit.exe
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '44px 36px' }}>
          <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: '-4px' }}>RetroKit</div>
          <div style={{ fontSize: 34 }}>Free retro UI kits for React and Tailwind</div>
          <div style={{ color: '#06484c', fontSize: 26 }}>Windows 3.1 · Mac System 7 · Web Components</div>
        </div>
      </div>
    </div>,
    { ...size },
  )
}
