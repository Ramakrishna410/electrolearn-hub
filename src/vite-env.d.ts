/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

interface ModelViewerJSX {
  src?: string;
  alt?: string;
  'camera-controls'?: boolean;
  'auto-rotate'?: boolean;
  'shadow-intensity'?: string;
  poster?: string;
  loading?: string;
  reveal?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'camera-orbit'?: string;
  'min-camera-orbit'?: string;
  'max-camera-orbit'?: string;
  style?: React.CSSProperties;
  ref?: any;
}

