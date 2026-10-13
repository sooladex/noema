import { ImageResponse } from 'next/og';

export const alt = 'Noêma — transformer un texte en cours détaillé, fiches de révision et résumé';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#06070d',
          backgroundImage:
            'radial-gradient(circle at 22% 18%, rgba(124,92,255,0.40) 0%, transparent 46%), radial-gradient(circle at 82% 78%, rgba(34,211,238,0.28) 0%, transparent 44%)',
          padding: 72,
          color: '#e9ebf4',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, color: '#98a0ba' }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: 'linear-gradient(135deg,#7c5cff,#22d3ee)',
            }}
          />
          Noêma
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, lineHeight: 1.08, letterSpacing: -2, color: '#ffffff', display: 'flex' }}>
            Un texte entre.
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.08, letterSpacing: -2, color: '#a99cff', display: 'flex' }}>
            Un cours qui se comprend en sort.
          </div>
          <div style={{ fontSize: 30, color: '#98a0ba', marginTop: 26, display: 'flex' }}>
            Cours détaillé · Fiches de révision · Résumé
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: 24, color: '#6f7794' }}>
          Sans inscription · Export Markdown et PDF
        </div>
      </div>
    ),
    size,
  );
}
