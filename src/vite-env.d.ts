/// <reference types="vite/client" />

interface Window {
  grecaptcha?: {
    ready: (callback: () => void) => void;
    render: (
      container: HTMLElement | string,
      parameters: {
        sitekey: string;
        callback?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark';
        size?: 'normal' | 'compact';
      },
    ) => number;
    reset: (widgetId?: number) => void;
    getResponse: (widgetId?: number) => string;
  };
}
