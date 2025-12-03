/**
 * Canvas Distortion Effects
 * Reality tears, glitches, and supernatural disturbances
 */

export class CanvasDistortions {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get canvas context');
    this.ctx = context;
  }

  // Mirror dimension - flip canvas
  mirrorFlip(duration: number = 2000): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    tempCtx.putImageData(imageData, 0, 0);

    // Flip horizontally
    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(tempCanvas, -this.canvas.width, 0);
    this.ctx.restore();

    // Restore after duration
    setTimeout(() => {
      this.ctx.putImageData(imageData, 0, 0);
    }, duration);
  }

  // Reality tear - glitch effect
  realityTear(): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    // Create glitch strips
    for (let i = 0; i < 5; i++) {
      const y = Math.floor(Math.random() * this.canvas.height);
      const height = 10 + Math.floor(Math.random() * 30);
      const offset = (Math.random() - 0.5) * 50;

      const stripData = this.ctx.getImageData(0, y, this.canvas.width, height);
      this.ctx.putImageData(stripData, offset, y);
    }

    // RGB split
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < 0.01) {
        const offset = Math.floor(Math.random() * 20) * 4;
        if (i + offset < data.length) {
          data[i] = data[i + offset]; // Red channel shift
        }
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  // Spectral interference - ghostly distortion
  spectralInterference(): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    // Add ghostly overlay
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < 0.05) {
        const ghost = Math.random() * 50;
        data[i] = Math.min(255, data[i] + ghost); // R
        data[i + 1] = Math.min(255, data[i + 1] + ghost); // G
        data[i + 2] = Math.min(255, data[i + 2] + ghost); // B
        data[i + 3] = Math.max(0, data[i + 3] - 30); // Reduce alpha
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  // Vignette darkening - edges fade to black
  applyVignette(intensity: number = 0.3): void {
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.width * 0.3,
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.width * 0.7
    );

    gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
    gradient.addColorStop(1, `rgba(0, 0, 0, ${intensity})`);

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Cursed brush - brush fights back
  cursedBrushStroke(x: number, y: number, color: string): void {
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 40;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2 + Math.random() * 4;
    this.ctx.globalAlpha = 0.3;
    this.ctx.lineCap = 'round';

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();

    this.ctx.globalAlpha = 1;
  }

  // Aging effect - make canvas look old
  applyAging(): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    // Sepia tone
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
      data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
      data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    }

    // Add scratches
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const length = Math.random() * 50;

      this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + length, y + (Math.random() - 0.5) * 10);
      this.ctx.stroke();
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  // Invert colors - negative effect
  invertColors(duration: number = 1000): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const original = new Uint8ClampedArray(data);

    // Invert
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]; // R
      data[i + 1] = 255 - data[i + 1]; // G
      data[i + 2] = 255 - data[i + 2]; // B
    }

    this.ctx.putImageData(imageData, 0, 0);

    // Restore after duration
    setTimeout(() => {
      for (let i = 0; i < data.length; i++) {
        data[i] = original[i];
      }
      this.ctx.putImageData(imageData, 0, 0);
    }, duration);
  }

  // Static noise overlay
  addStaticNoise(intensity: number = 0.05): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < intensity) {
        const noise = (Math.random() - 0.5) * 100;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  // Bleeding effect - colors bleed into each other
  applyBleeding(): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const width = this.canvas.width;

    for (let y = 1; y < this.canvas.height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        if (Math.random() < 0.02) {
          const i = (y * width + x) * 4;
          const below = ((y + 1) * width + x) * 4;

          // Blend with pixel below
          data[below] = (data[i] + data[below]) / 2;
          data[below + 1] = (data[i + 1] + data[below + 1]) / 2;
          data[below + 2] = (data[i + 2] + data[below + 2]) / 2;
        }
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }
}
