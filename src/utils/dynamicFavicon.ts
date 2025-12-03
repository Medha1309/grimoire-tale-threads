/**
 * Dynamic Favicon System
 * Creates awareness through subtle favicon changes based on app state
 */

type FaviconState = 'idle' | 'active' | 'notification' | 'watching' | 'typing';

class DynamicFavicon {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private currentState: FaviconState = 'idle';
  private animationFrame: number | null = null;
  private blinkInterval: number | null = null;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 32;
    this.canvas.height = 32;
    this.ctx = this.canvas.getContext('2d')!;
  }

  /**
   * Initialize the dynamic favicon system
   */
  init() {
    this.setState('idle');
    this.setupEventListeners();
    this.startBlinkCycle();
  }

  /**
   * Set up event listeners for awareness
   */
  private setupEventListeners() {
    // Detect user activity
    document.addEventListener('mousemove', () => this.setState('active'));
    document.addEventListener('keydown', () => this.setState('typing'));
    
    // Return to idle after inactivity
    let idleTimer: NodeJS.Timeout;
    const resetIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => this.setState('idle'), 3000);
    };
    
    document.addEventListener('mousemove', resetIdle);
    document.addEventListener('keydown', resetIdle);

    // Detect tab visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.setState('watching');
      } else {
        this.setState('active');
      }
    });
  }

  /**
   * Random blink cycle to make it feel alive
   */
  private startBlinkCycle() {
    const scheduleNextBlink = () => {
      const delay = 3000 + Math.random() * 7000; // 3-10 seconds
      this.blinkInterval = window.setTimeout(() => {
        this.blink();
        scheduleNextBlink();
      }, delay);
    };
    scheduleNextBlink();
  }

  /**
   * Quick blink animation
   */
  private blink() {
    const originalState = this.currentState;
    this.drawEyeClosed();
    this.updateFavicon();
    
    setTimeout(() => {
      this.setState(originalState);
    }, 150);
  }

  /**
   * Set the favicon state
   */
  setState(state: FaviconState) {
    this.currentState = state;
    this.draw();
    this.updateFavicon();
  }

  /**
   * Draw the favicon based on current state
   */
  private draw() {
    this.ctx.clearRect(0, 0, 32, 32);

    switch (this.currentState) {
      case 'idle':
        this.drawEyeOpen();
        break;
      case 'active':
        this.drawEyeAlert();
        break;
      case 'notification':
        this.drawEyeWithDot();
        break;
      case 'watching':
        this.drawEyeWatching();
        break;
      case 'typing':
        this.drawEyeTyping();
        break;
    }
  }

  /**
   * Draw an open eye (idle state)
   */
  private drawEyeOpen() {
    const ctx = this.ctx;
    
    // Eye outline
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(16, 16, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // White of eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(16, 16, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iris
    ctx.fillStyle = '#8b0000';
    ctx.beginPath();
    ctx.arc(16, 16, 4, 0, Math.PI * 2);
    ctx.fill();

    // Pupil
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(16, 16, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draw a closed eye (blink)
   */
  private drawEyeClosed() {
    const ctx = this.ctx;
    
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(4, 16);
    ctx.quadraticCurveTo(16, 18, 28, 16);
    ctx.stroke();
  }

  /**
   * Draw an alert eye (active state)
   */
  private drawEyeAlert() {
    const ctx = this.ctx;
    
    // Wider eye
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(16, 16, 13, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(16, 16, 11, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Larger pupil
    ctx.fillStyle = '#8b0000';
    ctx.beginPath();
    ctx.arc(16, 16, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(16, 16, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draw eye with notification dot
   */
  private drawEyeWithDot() {
    this.drawEyeOpen();
    
    // Red notification dot
    const ctx = this.ctx;
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(26, 8, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  /**
   * Draw a watching eye (when tab is hidden)
   */
  private drawEyeWatching() {
    const ctx = this.ctx;
    
    // Narrowed eye
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(16, 16, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(16, 16, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupil looking slightly to the side
    ctx.fillStyle = '#8b0000';
    ctx.beginPath();
    ctx.arc(18, 16, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(18, 16, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draw typing state (rapid movement)
   */
  private drawEyeTyping() {
    const ctx = this.ctx;
    const offset = Math.sin(Date.now() / 100) * 2;
    
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(16, 16, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(16, 16, 10, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Moving pupil
    ctx.fillStyle = '#8b0000';
    ctx.beginPath();
    ctx.arc(16 + offset, 16, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(16 + offset, 16, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Update the actual favicon in the DOM
   */
  private updateFavicon() {
    const dataUrl = this.canvas.toDataURL('image/png');
    
    let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    
    link.href = dataUrl;
  }

  /**
   * Show notification state
   */
  showNotification() {
    this.setState('notification');
    
    // Return to previous state after 3 seconds
    setTimeout(() => {
      this.setState('idle');
    }, 3000);
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.blinkInterval) {
      clearTimeout(this.blinkInterval);
    }
  }
}

// Singleton instance
let faviconInstance: DynamicFavicon | null = null;

export const initDynamicFavicon = () => {
  if (!faviconInstance) {
    faviconInstance = new DynamicFavicon();
    faviconInstance.init();
  }
  return faviconInstance;
};

export const showFaviconNotification = () => {
  if (faviconInstance) {
    faviconInstance.showNotification();
  }
};

export const setFaviconState = (state: FaviconState) => {
  if (faviconInstance) {
    faviconInstance.setState(state);
  }
};
