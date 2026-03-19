import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const fontData = readFileSync(
  join(process.cwd(), 'src/assets/fonts/NotoSansJP-Bold.ttf'),
);

export async function generateOgImage(title: string): Promise<ArrayBuffer> {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0f0f0f',
          fontFamily: '"Noto Sans JP"',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: '56px',
                fontWeight: 700,
                color: '#f0efe9',
                lineHeight: 1.4,
                letterSpacing: '-0.02em',
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '24px',
                color: '#8a8a8a',
                letterSpacing: '0.1em',
              },
              children: 'blog.colt45s.dev',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngData = resvg.render();
  const png = pngData.asPng();
  return Uint8Array.from(png).buffer as ArrayBuffer;
}
