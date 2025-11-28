export function isVideo(filename: string): boolean {
  return filename.toLowerCase().endsWith('.mp4');
}

export const SLIDESHOW_INTERVAL_MS = 15000;
