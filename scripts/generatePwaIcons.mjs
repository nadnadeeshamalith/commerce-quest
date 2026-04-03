// Generates placeholder PWA icons into /public.
// Creates:
// - public/icon-192x192.png
// - public/icon-512x512.png
//
// No external dependencies required (pure PNG writer).

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const publicDir = path.join(process.cwd(), 'public');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// CRC32 implementation for PNG chunks.
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  const crcVal = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function writeSolidIconPng({ filePath, width, height, bg, fg }) {
  // bg/fg: { r,g,b,a } 0..255
  const raw = Buffer.alloc((width * 4 + 1) * height);
  let offset = 0;

  for (let y = 0; y < height; y++) {
    // Filter byte 0 for each scanline.
    raw[offset++] = 0;
    for (let x = 0; x < width; x++) {
      // Simple icon: white circle + inner cut (like "Q" bubble)
      const dx = x - width / 2;
      const dy = y - height / 2;
      const r = Math.min(width, height) * 0.28;
      const rr = dx * dx + dy * dy;
      const inCircle = rr <= r * r;
      const inHole = rr <= (r * 0.45) * (r * 0.45) && (Math.abs(dx) < r * 0.28);

      const useFg = inCircle && !inHole;
      const c = useFg ? fg : bg;

      raw[offset++] = c.r;
      raw[offset++] = c.g;
      raw[offset++] = c.b;
      raw[offset++] = c.a;
    }
  }

  const compressed = zlib.deflateSync(raw);

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]); // PNG signature

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const png = Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);

  fs.writeFileSync(filePath, png);
}

async function main() {
  ensureDir(publicDir);

  // Theme: dark blue-ish background, white icon.
  const bg = { r: 37, g: 99, b: 235, a: 255 }; // blue background
  const fg = { r: 255, g: 255, b: 255, a: 255 }; // white icon

  await writeSolidIconPng({
    filePath: path.join(publicDir, 'icon-192x192.png'),
    width: 192,
    height: 192,
    bg,
    fg,
  });

  await writeSolidIconPng({
    filePath: path.join(publicDir, 'icon-512x512.png'),
    width: 512,
    height: 512,
    bg,
    fg,
  });

  console.log('Generated PWA icons in public/.');
}

main().catch((e) => {
  console.error('Icon generation failed:', e);
  process.exitCode = 1;
});

