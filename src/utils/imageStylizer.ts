/**
 * Fast box blur algorithm for 1D typed arrays (horizontal + vertical passes)
 */
function fastBoxBlur(
  input: Uint8ClampedArray,
  width: number,
  height: number,
  radius: number
): Uint8ClampedArray {
  const output = new Uint8ClampedArray(input.length);
  const temp = new Uint8ClampedArray(input.length);

  // Horizontal pass
  for (let y = 0; y < height; y++) {
    const yOffset = y * width;
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let count = 0;
      for (let k = -radius; k <= radius; k++) {
        const px = Math.min(width - 1, Math.max(0, x + k));
        sum += input[yOffset + px];
        count++;
      }
      temp[yOffset + x] = Math.round(sum / count);
    }
  }

  // Vertical pass
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let sum = 0;
      let count = 0;
      for (let k = -radius; k <= radius; k++) {
        const py = Math.min(height - 1, Math.max(0, y + k));
        sum += temp[py * width + x];
        count++;
      }
      output[y * width + x] = Math.round(sum / count);
    }
  }

  return output;
}

/**
 * Transforms any facial portrait into an architectural/editorial pencil sketch.
 * Emulates graphite hatching, fine line stippling, and paper-white background isolation
 * as seen in anatomical and aesthetic clinical reference reports.
 */
export async function createPencilSketch(
  imageUrl: string,
  options: {
    blurRadius?: number;
    backgroundThreshold?: number;
  } = {}
): Promise<string> {
  return new Promise((resolve) => {
    // If browser doesn't support Image or running in headless SSR
    if (typeof window === 'undefined' || typeof Image === 'undefined') {
      resolve(imageUrl);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const maxWidth = 900;
        const width = Math.min(img.width, maxWidth);
        const height = Math.round((img.height / img.width) * width);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          resolve(imageUrl);
          return;
        }

        // Draw original scaled
        ctx.drawImage(img, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;
        const totalPixels = width * height;

        // 1. Convert to grayscale
        const gray = new Uint8ClampedArray(totalPixels);
        for (let i = 0; i < data.length; i += 4) {
          const g = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          gray[i / 4] = g;
        }

        // 2. Invert grayscale
        const inverted = new Uint8ClampedArray(totalPixels);
        for (let i = 0; i < totalPixels; i++) {
          inverted[i] = 255 - gray[i];
        }

        // 3. Fast Box Blur on inverted image
        const radius = options.blurRadius ?? 4;
        const blurred = fastBoxBlur(inverted, width, height, radius);

        // 4. Color Dodge: (gray * 255) / (255 - blurred)
        const sketch = new Uint8ClampedArray(totalPixels);
        for (let i = 0; i < totalPixels; i++) {
          const b = blurred[i];
          const g = gray[i];
          if (b >= 254) {
            sketch[i] = 255;
          } else {
            const val = (g * 255) / (255 - b);
            sketch[i] = Math.min(255, Math.floor(val));
          }
        }

        // 5. Enhance contrast and blend subtle graphite shading
        const bgThreshold = options.backgroundThreshold ?? 220;
        for (let i = 0; i < data.length; i += 4) {
          const idx = i / 4;
          let s = sketch[idx];
          const g = gray[idx];

          // Retain deep pupil, iris, eyelashes, beard, and contour definition
          if (g < 150) {
            const shadowWeight = (150 - g) / 150;
            s = Math.max(0, Math.floor(s * (1 - shadowWeight * 0.65) + g * (shadowWeight * 0.65)));
          }

          // High-key studio paper whitening for very light backgrounds
          if (s > bgThreshold && g > 170) {
            s = 255;
          } else {
            // Apply slight curve for graphite pencil richness
            const norm = s / 255;
            s = Math.floor(Math.pow(norm, 1.3) * 255);
            
            // Add subtle pencil grain (noise) for texture
            if (s < 250) {
              const noise = (Math.random() - 0.5) * 18;
              s = Math.min(255, Math.max(0, s + noise));
            }
          }

          data[i] = s;
          data[i + 1] = s;
          data[i + 2] = s;
          data[i + 3] = 255;
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      } catch (err) {
        console.warn('Client sketch generation failed, using original:', err);
        resolve(imageUrl);
      }
    };

    img.onerror = () => {
      resolve(imageUrl);
    };

    img.src = imageUrl;
  });
}
