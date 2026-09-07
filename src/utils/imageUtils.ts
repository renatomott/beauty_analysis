/**
 * Utilitários para processamento, redimensionamento e conversão de fotos no navegador
 */

export function readFileAsBase64(file: File, maxDimension: number = 1600): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Erro ao ler arquivo da imagem'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Formato de imagem inválido ou corrompido'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale down if larger than maxDimension to keep performance high and payload safe
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve({
            base64: reader.result as string,
            mimeType: file.type || 'image/jpeg',
          });
        }

        ctx.drawImage(img, 0, 0, width, height);
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const quality = 0.90;
        const dataUrl = canvas.toDataURL(mime, quality);

        resolve({
          base64: dataUrl,
          mimeType: mime,
        });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
