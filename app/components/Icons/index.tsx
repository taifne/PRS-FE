// icons.tsx
import React from 'react';

// Home Icon
export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement> & {
  gradient?: boolean;
  variant?: 'filled' | 'outline';
}> = ({ gradient = false, variant = 'filled', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 hover:scale-105 ${props.className || ''}`}
    style={{
      ...props.style,
      ...(gradient && {
        background: variant === 'filled'
          ? 'radial-gradient(circle at center, #fff 30%, #f5f5f5 100%)'
          : undefined
      })
    }}
    {...props}
  >
    {/* Gradient definition */}
    {gradient && (
      <defs>
        <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FFD93D" />
        </linearGradient>
      </defs>
    )}

    {/* House structure */}
    <path
      d="M12 3L3 10h2v11h14V10h2L12 3z"
      fill={variant === 'filled' ? (gradient ? "url(#homeGradient)" : "currentColor") : "none"}
      stroke={variant === 'outline' ? "currentColor" : "none"}
    />

    {/* Door */}
    <rect
      x="10"
      y="14"
      width="4"
      height="6"
      rx="1"
      fill={variant === 'filled' ? (gradient ? "#fff" : "currentColor") : "none"}
      stroke={variant === 'outline' ? "currentColor" : "none"}
    />

    {/* Window */}
    <rect
      x="6"
      y="8"
      width="4"
      height="4"
      rx="1"
      fill={variant === 'filled' ? (gradient ? "#fff" : "currentColor") : "none"}
      stroke={variant === 'outline' ? "currentColor" : "none"}
    />
    <rect
      x="14"
      y="8"
      width="4"
      height="4"
      rx="1"
      fill={variant === 'filled' ? (gradient ? "#fff" : "currentColor") : "none"}
      stroke={variant === 'outline' ? "currentColor" : "none"}
    />

    {/* Chimney */}
    <path
      d="M19 7h1v3h-1z"
      fill={variant === 'filled' ? (gradient ? "#FF6B6B" : "currentColor") : "none"}
      stroke={variant === 'outline' ? "currentColor" : "none"}
    />

    {/* Smoke */}
    {variant === 'filled' && (
      <path
        d="M19 5c-1 0-2 .5-2 1.5 0-1-1-1.5-2-1.5"
        stroke={gradient ? "#FFD93D" : "currentColor"}
        strokeWidth="1"
        opacity="0.8"
      />
    )}
  </svg>
);
// User Icon
export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12z" />
    <path d="M4 21s2-4 8-4 8 4 8 4" />
  </svg>
);

// Bell Icon
export const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M18 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />
    <path d="M6 12v5h12v-5a6 6 0 0 0-12 0z" />
    <path d="M9 16a2 2 0 1 0 4 0" />
  </svg>
);

// GitHub Icon
export const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.16 6.84 9.49.5.09.68-.21.68-.47v-1.68c-2.22.48-2.68-.88-2.68-.88-.36-.92-.88-1.16-.88-1.16-.72-.5.05-.49.05-.49.8.06 1.22.82 1.22.82 1.22 2.07 3.13 5.49 1.83 6.22 1.6.1-.98.46-1.38.84-1.69-3.55-.4-7.27-1.78-7.27-7.96 0-1.76.63-3.2 1.66-4.32-.17-.4-.72-.8-.27-1.28.62-.64 2.05-.21 2.46.5.85-1.4 2.39-1.4 3.25-.5 1.12-.47 1.67-1.39 1.67-2.47-.56-.25-.65-.91-.55-1.38-.61-.24-1.25-.4-1.89-.4zm0 0" />
  </svg>
);

// Facebook Icon
export const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M22 12a10 10 0 1 0-11.93 9.9v-7h-3v-3h3v-2.2c0-4.4 2.52-6.8 6.72-6.8 1.96 0 3.58.14 4.09.2v3.7h-2.92c-2.29 0-2.89 1.1-2.89 2.75v3h5.72l-.74 3h-4.98v7a10 10 0 0 0 9.98-9.9z" />
  </svg>
);

// Twitter Icon
export const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M23 3a10.27 10.27 0 0 1-2.92.8A4.58 4.58 0 0 0 22.4 1.3a9.2 9.2 0 0 1-2.88 1.1 4.56 4.56 0 0 0-7.79 4.15A13 13 0 0 1 1.64 1.1a4.56 4.56 0 0 0 1.41 6.1A4.55 4.55 0 0 1 .8 6.6v.06a4.56 4.56 0 0 0 3.65 4.46 4.56 4.56 0 0 1-2.07-.57v.06a4.56 4.56 0 0 0 3.65 4.46 4.56 4.56 0 0 1-1.85.1A4.56 4.56 0 0 0 4.9 18c-4.69 0-7.57-3.87-7.57-7.23 0-.11.01-.23.01-.34a10.21 10.21 0 0 0 5.57 1.64 10.34 10.34 0 0 1 10.36-11.56A9.98 9.98 0 0 1 23 3z" />
  </svg>
);

// LinkedIn Icon
export const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M20.452 20.452h-3.88v-5.75c0-1.369-.493-2.299-1.727-2.299-.941 0-1.505.628-1.755 1.285-.089.214-.112.512-.112.806v6.965h-3.878s.052-11.244 0-12.4h3.878v1.75c-.013-.019.027.194.046.29l3.497.01-3.497-.01zm-12.552-.928c-1.2 0-2.2-.99-2.2-2.2 0-1.21.99-2.2 2.2-2.2 1.2 0 2.2.99 2.2 2.2 0 1.21-.99 2.2-2.2 2.2zm1.717-10.847h-3.43v12.4h3.43v-12.4zm1.029-3.338h-5.47c-.225 0-.398.18-.398.398s.173.398.398.398h5.47c.225 0 .398-.18.398-.398s-.173-.398-.398-.398z" />
  </svg>
);

// More icons...
// Add additional icons as needed, following the pattern above
// Instagram Icon
export const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 2.2c3.71 0 6.8 3.09 6.8 6.8v6.4c0 3.71-3.09 6.8-6.8 6.8h-6.4c-3.71 0-6.8-3.09-6.8-6.8v-6.4c0-3.71 3.09-6.8 6.8-6.8h6.4zm0 2.4h-6.4c-2.44 0-4.4 1.96-4.4 4.4v6.4c0 2.44 1.96 4.4 4.4 4.4h6.4c2.44 0 4.4-1.96 4.4-4.4v-6.4c0-2.44-1.96-4.4-4.4-4.4zm4.1 1.7c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zm-7.1 5.6c2.48 0 4.5 2.02 4.5 4.5s-2.02 4.5-4.5 4.5-4.5-2.02-4.5-4.5 2.02-4.5 4.5-4.5z" />
  </svg>
);

// YouTube Icon
export const YouTubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M22.6 6.4c0-.8-.3-1.6-.8-2.2-.4-.5-1-1-1.6-1.3-1.7-.9-4.2-1.3-7.8-1.3-3.7 0-6.2.4-7.9 1.3-.7.3-1.2.8-1.6 1.3-.5.6-.8 1.4-.8 2.2v6.8c0 .8.3 1.6.8 2.2.4.5 1 1 1.6 1.3 1.7.9 4.2 1.3 7.9 1.3 3.6 0 6.1-.4 7.8-1.3.7-.3 1.2-.8 1.6-1.3.5-.6.8-1.4.8-2.2v-6.8zm-12.6 7.5v-4.6l4.5 2.3-4.5 2.3z" />
  </svg>
);

// Pinterest Icon
export const PinterestIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10zm0 2c-4.44 0-8 3.56-8 8 0 4.31 3.15 7.94 7.41 8.57-.1-.76-.19-1.91-.26-2.61-.13-.95-.29-1.81-.47-2.63-.25-.5-.57-1.03-.9-1.4-.54-.52-1.11-.92-1.75-1.15-.73-.25-1.56-.42-2.45-.46-.15 0-.23-.14-.22-.27.01-.13.12-.25.26-.26 1.31-.1 2.67-.31 3.78-.72.26-.15.42-.43.42-.75 0-.37-.23-.7-.58-.84-.85-.37-1.85-.69-2.76-.93-.56-.12-.96-.63-.96-1.23 0-.58.41-1.08.97-1.22 1.26-.34 2.52-.73 3.82-1.12.57-.14.95-.69.95-1.28 0-.65-.37-1.19-.92-1.48-.49-.26-1.09-.3-1.64-.16-1.24.29-2.56.64-3.78 1.02-.17.06-.35-.09-.37-.27-.02-.15.09-.26.23-.26.98 0 2.01.17 2.92.51 1.06.36 2.08.86 3.02 1.46 1.12.66 2.09 1.44 2.96 2.37 1.55 1.68 2.53 3.69 2.53 5.78 0 5.52-4.48 10-10 10z" />
  </svg>
);

// Snapchat Icon
export const SnapchatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10zm0 2c-4.44 0-8 3.56-8 8 0 4.31 3.15 7.94 7.41 8.57-.1-.76-.19-1.91-.26-2.61-.13-.95-.29-1.81-.47-2.63-.25-.5-.57-1.03-.9-1.4-.54-.52-1.11-.92-1.75-1.15-.73-.25-1.56-.42-2.45-.46-.15 0-.23-.14-.22-.27.01-.13.12-.25.26-.26 1.31-.1 2.67-.31 3.78-.72.26-.15.42-.43.42-.75 0-.37-.23-.7-.58-.84-.85-.37-1.85-.69-2.76-.93-.56-.12-.96-.63-.96-1.23 0-.58.41-1.08.97-1.22 1.26-.34 2.52-.73 3.82-1.12.57-.14.95-.69.95-1.28 0-.65-.37-1.19-.92-1.48-.49-.26-1.09-.3-1.64-.16-1.24.29-2.56.64-3.78 1.02-.17.06-.35-.09-.37-.27-.02-.15.09-.26.23-.26.98 0 2.01.17 2.92.51 1.06.36 2.08.86 3.02 1.46 1.12.66 2.09 1.44 2.96 2.37 1.55 1.68 2.53 3.69 2.53 5.78 0 5.52-4.48 10-10 10z" />
  </svg>
);

// WhatsApp Icon
export const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M20.4 4.6c-.3-.3-.6-.6-1-.9-1-.8-2.2-1.3-3.5-1.6-1.3-.3-2.7-.4-4-.4-3.6 0-6.6 1.2-8.8 3.6-2.2 2.3-3.5 5.4-3.5 8.7 0 1.7.3 3.4.9 5 0 0 .4 1.2.5 1.6-.1 0-.1-.1-.1-.1s.1.1-.1-.1-.1.1-.1 0-1.2.5-1.8.7-.9.3-1.6-.6-.9-.4-1.3-.6-1.1-1.5-2.3-.8-.9-.3-1.3.7-.6-.3-.8-.6c-.5-.8-1-1.5-1.3-.9z" />
  </svg>
);

// Spotify Icon
export const SpotifyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M22.5 1h-21c-.8 0-1.5.7-1.5 1.5v20c0 .8.7 1.5 1.5 1.5h21c.8 0 1.5-.7 1.5-1.5v-20c0-.8-.7-1.5-1.5-1.5zm-3 20h-15v-18h15v18zm-3.9-2.7c-1.6-2.1-4.2-3.4-7.1-3.4s-5.5 1.3-7.1 3.4v-1.5c1.3-1.7 3.4-2.7 5.5-2.7s4.2 1 5.5 2.7v1.5zm3.1-3.8c-.5-.7-1.3-1.2-2.2-1.5 1.4-.6 2.1-1.7 2.1-2.9 0-1.6-1.4-2.9-3.1-2.9-1.1 0-2.1.5-2.8 1.3-.2-.5-.4-1.1-.7-1.7 1.4-.7 2.6-1.3 3.5-1.9z" />
  </svg>
);

// Gmail Icon
export const GmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M22 2h-20c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm0 18h-20v-12h20v12zm-10-4l-4-3-4 3v-10h8v10z" />
  </svg>
);
// Calendar Icon
export const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="7" y1="2" x2="7" y2="6" />
    <line x1="17" y1="2" x2="17" y2="6" />
  </svg>
);

// Camera Icon
export const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M20 5h-3.5l-1-2H8.5l-1 2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 1.99-.9 1.99-2V7c0-1.1-.89-2-1.99-2zM12 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
  </svg>
);

// File Icon
export const FileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M6 2h10l4 4v14c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v16h12V8h-6V4H6z" />
  </svg>
);

// Heart Icon
export const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// Message Icon
export const MessageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M21 8V5c0-1.1-.9-2-2-2h-5V1H9v2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5l-4-4zm-7-3h5v3h-5V5zm-2 2H4v11h12V7z" />
  </svg>
);

// Star Icon
export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 17.27L18.18 21 16.54 13.97l5.46-4.73-7.19-.61L12 2 9.23 8.63l-7.19.61 5.46 4.73L5.82 21z" />
  </svg>
);

// Settings Icon
export const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M19 13H5v-2h14v2zm-2 5H7v-2h10v2zm2-10H5V6h14v2z" />
  </svg>
);

// Plus Icon
export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M19 13H12v7h-2v-7H5v-2h5V4h2v7h7v2z" />
  </svg>
);

// Download Icon
export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M5 13h4v6h6v-6h4l-7-7-7 7z" />
  </svg>
);

// Upload Icon
export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M19 11h-4v-6H9v6H5l7 7 7-7z" />
  </svg>
);

// Location Icon
export const LocationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 4 3 7 7 11 4-4 7-7 7-11 0-3.87-3.13-7-7-7zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);

// Lock Icon
export const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9v6H4c-1.1 0-1.99.9-1.99 2L2 21c0 1.1.89 2 1.99 2h16c1.1 0 1.99-.9 1.99-2v-4c0-1.1-.89-2-1.99-2h-1v-6c0-3.87-3.13-7-7-7z" />
  </svg>
);

// Search Icon
export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// Edit Icon
export const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M3 17.25V21h3.75L15.81 13.94l-3.75-3.75L3 17.25zM15.81 6.81c1.04-1.04 2.75-1.04 3.75 0 1.04 1.04 1.04 2.75 0 3.75l-2.4 2.4-3.75-3.75 2.4-2.4z" />
  </svg>
);

// Trash Icon
export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M3 6h18M9 6v12m6 0V6M5 6v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6H5z" />
  </svg>
);

// Upload Icon
export const UploadCloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M20 15v2h-4v5H8v-5H4v-2h4v-5h8v5h4z" />
  </svg>
);
export const TableSVG: React.FC = () => {
  return (
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      {/* Background rectangle with subtle animation */}
      <rect x="10" y="10" width="280" height="180" rx="10" ry="10" fill="#f0f0f0" opacity="0.8">
        <animate attributeName="opacity" from="0.8" to="1" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="10" y="10" width="280" height="180" rx="10" ry="10" stroke="#ccc" strokeWidth="1" fill="none" />

      {/* Horizontal lines with subtle animation */}
      <line x1="10" y1="60" x2="290" y2="60" stroke="#555" strokeWidth="1">
        <animate attributeName="y1" from="60" to="70" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="10" y1="110" x2="290" y2="110" stroke="#555" strokeWidth="1" />
      <line x1="10" y1="160" x2="290" y2="160" stroke="#555" strokeWidth="1" />

      {/* Vertical lines */}
      <line x1="100" y1="10" x2="100" y2="190" stroke="#555" strokeWidth="1" />
      <line x1="200" y1="10" x2="200" y2="190" stroke="#555" strokeWidth="1" />

      {/* Bottom rectangle */}
      <rect x="10" y="180" width="280" height="10" rx="5" ry="5" fill="#ccc" opacity="0.6" />
    </svg>
  );
};
export const TreeViewSvg: React.FC = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <svg
        viewBox="0 0 300 200"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Main tree structure */}
        <g className="tree">
          {/* Root Node */}
          <g className="node" transform="translate(150, 30)">
            <circle r="15" fill="#2196F3" className="node-circle" />
            <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12">Root</text>
          </g>

          {/* First Level */}
          <g className="node" transform="translate(80, 80)">
            <line x1="150" y1="45" x2="80" y2="80" stroke="#90CAF9" strokeWidth="2" />
            <circle r="12" fill="#4CAF50" className="node-circle" />
            <text x="0" y="4" textAnchor="middle" fill="white" fontSize="11">Node 1</text>
          </g>

          <g className="node" transform="translate(220, 80)">
            <line x1="150" y1="45" x2="220" y2="80" stroke="#90CAF9" strokeWidth="2" />
            <circle r="12" fill="#FF9800" className="node-circle" />
            <text x="0" y="4" textAnchor="middle" fill="white" fontSize="11">Node 2</text>
          </g>

          {/* Second Level */}
          <g className="node" transform="translate(40, 130)">
            <line x1="80" y1="92" x2="40" y2="130" stroke="#A5D6A7" strokeWidth="2" />
            <circle r="10" fill="#4CAF50" className="node-circle" />
            <text x="0" y="3" textAnchor="middle" fill="white" fontSize="10">Child 1</text>
          </g>

          <g className="node" transform="translate(120, 130)">
            <line x1="80" y1="92" x2="120" y2="130" stroke="#A5D6A7" strokeWidth="2" />
            <circle r="10" fill="#4CAF50" className="node-circle" />
            <text x="0" y="3" textAnchor="middle" fill="white" fontSize="10">Child 2</text>
          </g>

          <g className="node" transform="translate(260, 130)">
            <line x1="220" y1="92" x2="260" y2="130" stroke="#FFB74D" strokeWidth="2" />
            <circle r="10" fill="#FF9800" className="node-circle" />
            <text x="0" y="3" textAnchor="middle" fill="white" fontSize="10">Child 3</text>
          </g>
        </g>

        <style jsx>{`
            .node-circle {
              transition: transform 0.2s ease;
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
            }
            
            .node:hover .node-circle {
              transform: scale(1.1);
              cursor: pointer;
            }
            
            text {
              pointer-events: none;
              user-select: none;
            }
          `}</style>
      </svg>
    </div>
  );
};
export const PopupSvg: React.FC = () => {
  return (
    <svg width="150" height="125" xmlns="http://www.w3.org/2000/svg">
      {/* Background Layer */}
      <rect x="0" y="0" width="150" height="125" fill="rgba(0, 0, 0, 0.6)" />

      {/* Main Popup Box */}
      <rect
        x="15"
        y="25"
        width="120"
        height="75"
        rx="10"
        ry="10"
        fill="white"
        stroke="#4CAF50"
        strokeWidth="2"
      >
        <animate
          attributeName="rx"
          values="10;12;10"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Popup Title Bar */}
      <rect
        x="15"
        y="25"
        width="120"
        height="20"
        rx="10"
        ry="10"
        fill="#4CAF50"
      >
        <animate
          attributeName="fill"
          values="#4CAF50;#8BC34A;#4CAF50"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
      <text
        x="75"
        y="40"
        textAnchor="middle"
        fontSize="10"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        Popup Title
      </text>

      {/* Close Button */}
      <g transform="translate(125, 27)">
        <rect width="10" height="10" rx="3" ry="3" fill="#FF5252" />
        <line
          x1="2.5"
          y1="2.5"
          x2="7.5"
          y2="7.5"
          stroke="white"
          strokeWidth="1.5"
        />
        <line
          x1="7.5"
          y1="2.5"
          x2="2.5"
          y2="7.5"
          stroke="white"
          strokeWidth="1.5"
        />
      </g>

      {/* Content Area */}
      <rect
        x="20"
        y="50"
        width="110"
        height="45"
        rx="8"
        ry="8"
        fill="#F5F5F5"
      />

      {/* Content Text */}
      <text
        x="75"
        y="65"
        textAnchor="middle"
        fontSize="8"
        fill="#333"
        fontFamily="Arial, sans-serif"
      >
        This is a beautiful popup!
      </text>
      <text
        x="75"
        y="75"
        textAnchor="middle"
        fontSize="7"
        fill="#666"
        fontFamily="Arial, sans-serif"
      >
        You can add more content here.
      </text>

      {/* Subtle Shadow Effect */}
      <rect
        x="15"
        y="25"
        width="120"
        height="75"
        rx="10"
        ry="10"
        fill="transparent"
        stroke="rgba(0, 0, 0, 0.1)"
        strokeWidth="5"
      />
    </svg>
  );
};
export const AutocompleteSvg: React.FC = () => {
  return (
    <svg width="250" height="60" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="250" height="60" fill="rgba(0, 0, 0, 0.2)" opacity="0.2" />
      <rect x="20" y="20" width="210" height="25" rx="8" ry="8" fill="white" stroke="black" strokeWidth="1.5" />
      <text x="30" y="37" fontSize="12" fill="gray">Start typing...</text>
      <rect x="205" y="23" width="15" height="15" fill="white" stroke="black" strokeWidth="1.5" />
      <line x1="205" y1="23" x2="220" y2="33" stroke="black" strokeWidth="1.5" />
      <line x1="220" y1="23" x2="205" y2="33" stroke="black" strokeWidth="1.5" />
    </svg>
  );
};

export const ChartSvg: React.FC = () => {
  return (
    <svg width="220" height="120" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect x="0" y="0" width="220" height="120" fill="rgba(0, 0, 0, 0.05)" />

      {/* Chart Container */}
      <rect
        x="10"
        y="10"
        width="200"
        height="90"
        rx="8"
        ry="8"
        fill="white"
        stroke="#E0E0E0"
        strokeWidth="1"
      />

      {/* Bar 1 */}
      <rect x="20" y="80" width="20" height="20" fill="#64B5F6">
        <animate attributeName="height" from="20" to="40" dur="1s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="y" from="80" to="60" dur="1s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="fill" values="#64B5F6;#90CAF9;#64B5F6" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="30" y="105" textAnchor="middle" fontSize="10" fill="#333" fontFamily="Arial, sans-serif">
        Bar 1
      </text>

      {/* Bar 2 */}
      <rect x="60" y="70" width="20" height="35" fill="#FFA726">
        <animate attributeName="height" from="35" to="50" dur="1s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="y" from="70" to="50" dur="1s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="fill" values="#FFA726;#FFB74D;#FFA726" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="70" y="105" textAnchor="middle" fontSize="10" fill="#333" fontFamily="Arial, sans-serif">
        Bar 2
      </text>

      {/* Bar 3 */}
      <rect x="100" y="50" width="20" height="50" fill="#66BB6A">
        <animate attributeName="height" from="50" to="60" dur="1s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="y" from="50" to="40" dur="1s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="fill" values="#66BB6A;#81C784;#66BB6A" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="110" y="105" textAnchor="middle" fontSize="10" fill="#333" fontFamily="Arial, sans-serif">
        Bar 3
      </text>

      {/* Bar 4 */}
      <rect x="140" y="80" width="20" height="15" fill="#BA68C8">
        <animate attributeName="height" from="15" to="30" dur="1s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="y" from="80" to="70" dur="1s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="fill" values="#BA68C8;#CE93D8;#BA68C8" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="150" y="105" textAnchor="middle" fontSize="10" fill="#333" fontFamily="Arial, sans-serif">
        Bar 4
      </text>

      {/* Bar 5 */}
      <rect x="180" y="40" width="20" height="55" fill="#EF5350">
        <animate attributeName="height" from="55" to="70" dur="1s" begin="2s" repeatCount="indefinite" />
        <animate attributeName="y" from="40" to="30" dur="1s" begin="2s" repeatCount="indefinite" />
        <animate attributeName="fill" values="#EF5350;#E57373;#EF5350" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="190" y="105" textAnchor="middle" fontSize="10" fill="#333" fontFamily="Arial, sans-serif">
        Bar 5
      </text>
    </svg>
  );
};

export const ButtonSvg: React.FC = () => {
  return (
    <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="40" rx="10" ry="10" fill="#4CAF50" stroke="black" strokeWidth="2">
        <animate attributeName="fill" values="#4CAF50;#8BC34A;#4CAF50" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="100" y="35" textAnchor="middle" font-size="16" fill="white">Click Me</text>
    </svg>
  );
};

export const DrawerSvg: React.FC = () => {
  return (
    <svg width="300" height="250" xmlns="http://www.w3.org/2000/svg">
      {/* Background overlay */}
      <rect x="0" y="0" width="300" height="250" fill="rgba(0, 0, 0, 0.2)" />

      {/* Drawer container with shadow and animation */}
      <rect
        x="20"
        y="60"
        width="260"
        height="160"
        rx="15"
        ry="15"
        fill="#ffffff"
        stroke="#ccc"
        strokeWidth="1"
      >
        {/* Drawer opening/closing animation */}
        <animate
          attributeName="height"
          from="160"
          to="180"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Drawer handle */}
      <rect x="140" y="70" width="20" height="4" rx="2" ry="2" fill="#ccc" />
      <rect x="140" y="80" width="20" height="4" rx="2" ry="2" fill="#ccc" />

      {/* Drawer content text */}
      <text
        x="150"
        y="130"
        textAnchor="middle"
        fontSize="16"
        fill="#333"
        fontFamily="Arial, sans-serif"
      >
        Drawer Content
      </text>

      {/* Subtle shadow under the drawer */}
      <rect
        x="20"
        y="220"
        width="260"
        height="10"
        rx="5"
        ry="5"
        fill="rgba(0, 0, 0, 0.1)"
      />
    </svg>
  );
};

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  bgColor?: string;
  strokeWidth?: number;
  speed?: number;
  showBg?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 100,
  color = "#4CAF50",
  bgColor = "rgba(0, 0, 0, 0.1)",
  strokeWidth = 8,
  speed = 1.5,
  showBg = true
}) => {
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * 0.25;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'rotate(-90deg)' }}
      role="status"
      aria-label="Loading"
    >
      {showBg && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
      )}

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
      >
        <animate
          attributeName="stroke-dashoffset"
          from={circumference}
          to={0}
          dur={`${speed}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          values={`${color};${color};#FF4081;${color}`}
          dur={`${speed * 2}s`}
          repeatCount="indefinite"
        />
      </circle>

      {/* Additional rotating element for visual interest */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius - strokeWidth * 1.5}
        stroke={color}
        strokeWidth={strokeWidth / 2}
        fill="none"
        opacity="0.5"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${size / 2} ${size / 2}`}
          to={`360 ${size / 2} ${size / 2}`}
          dur={`${speed * 1.5}s`}
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

// Usage examples:
// <LoadingSpinner />
// <LoadingSpinner size={80} color="#FF4081" speed={2} strokeWidth={6} />

export const ToastSvg: React.FC = () => {
  return (
    <svg width="250" height="70" xmlns="http://www.w3.org/2000/svg">
      {/* Toast Background with Shadow */}
      <rect x="10" y="10" width="230" height="50" rx="12" ry="12" fill="#4CAF50" stroke="none">
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0s" fill="freeze" />
        <animate attributeName="opacity" from="1" to="0" dur="0.5s" begin="2.5s" fill="freeze" />
      </rect>

      {/* Toast Text */}
      <text x="125" y="35" textAnchor="middle" fontSize="14" fill="black" fontWeight="bold">
        Success!
      </text>

      {/* Close Button */}
      <circle cx="225" cy="25" r="6" fill="white">
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.5s" fill="freeze" />
      </circle>
      <line x1="220" y1="20" x2="230" y2="30" stroke="black" strokeWidth="2" />
      <line x1="230" y1="20" x2="220" y2="30" stroke="black" strokeWidth="2" />

      {/* Toast shadow effect */}
      <rect x="10" y="10" width="230" height="50" rx="12" ry="12" fill="rgba(0, 0, 0, 0.1)" />
    </svg>
  );
};


const CardSVG: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 200"
      width="300"
      height="200"
      className="hover:scale-105 transition-transform duration-300"
    >
      <rect x="10" y="10" width="280" height="180" rx="12" ry="12" stroke="black" fill="white" strokeWidth="2" />
      <rect x="20" y="20" width="260" height="30" stroke="black" fill="#f0f0f0" strokeWidth="1" />
      <text x="150" y="40" textAnchor="middle" fontSize="16" fill="black" fontWeight="bold">
        Card Title
      </text>
      <rect x="20" y="60" width="100" height="80" stroke="black" fill="#d9d9d9" strokeWidth="1" />
      <text x="70" y="100" textAnchor="middle" fontSize="12" fill="black">
        Image
      </text>
      <rect x="130" y="60" width="150" height="80" stroke="black" fill="white" strokeWidth="1" />
      <text x="140" y="80" fontSize="12" fill="black">
        • Description Line 1
      </text>
      <text x="140" y="100" fontSize="12" fill="black">
        • Description Line 2
      </text>
      <text x="140" y="120" fontSize="12" fill="black">
        • Description Line 3
      </text>
      <g className="cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200">
        <rect x="100" y="150" width="100" height="30" rx="8" ry="8" stroke="black" fill="#007BFF" strokeWidth="1" />
        <text x="150" y="170" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">
          Click Me
        </text>
      </g>
    </svg>
  );
};

export default CardSVG;
export const DropdownSVG: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 150"
      width="200"
      height="150"
      className="hover:scale-105 transition-transform duration-300"
    >
      <rect x="10" y="10" width="180" height="40" rx="8" ry="8" stroke="black" fill="white" strokeWidth="2" />
      <text x="100" y="35" textAnchor="middle" fontSize="14" fill="black" fontWeight="bold">
        Select an option
      </text>
      <g className="cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-200">
        <polygon points="170,30 150,15 150,45" fill="black" />
      </g>
      <g className="opacity-0 hover:opacity-100 transition-opacity duration-300">
        <rect x="10" y="55" width="180" height="30" rx="8" ry="8" stroke="black" fill="#f0f0f0" strokeWidth="1" />
        <text x="100" y="75" textAnchor="middle" fontSize="12" fill="black">
          Option 1
        </text>
        <rect x="10" y="90" width="180" height="30" rx="8" ry="8" stroke="black" fill="#f0f0f0" strokeWidth="1" />
        <text x="100" y="110" textAnchor="middle" fontSize="12" fill="black">
          Option 2
        </text>
      </g>
    </svg>
  );
};
export const StepperSvg: React.FC = () => {
  return (
    <svg width="180" height="40" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="20" x2="60" y2="20" stroke="black" strokeWidth="1.5">
        <animate attributeName="stroke-dasharray" from="0,60" to="60,0" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="60" y1="20" x2="100" y2="20" stroke="black" strokeWidth="1.5">
        <animate attributeName="stroke-dasharray" from="0,60" to="60,0" dur="1s" begin="0.5s" repeatCount="indefinite" />
      </line>
      <line x1="100" y1="20" x2="140" y2="20" stroke="black" strokeWidth="1.5">
        <animate attributeName="stroke-dasharray" from="0,60" to="60,0" dur="1s" begin="1s" repeatCount="indefinite" />
      </line>
      <circle cx="20" cy="20" r="8" fill="green">
        <animate attributeName="r" from="5" to="8" dur="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="20" r="8" fill="gray">
        <animate attributeName="fill" values="gray;green;gray" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="20" r="8" fill="gray">
        <animate attributeName="fill" values="gray;green;gray" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="20" r="8" fill="gray">
        <animate attributeName="fill" values="gray;green;gray" dur="1.5s" begin="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export const PaginationSvg: React.FC = () => {
  return (
    <svg width="300" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect x="0" y="0" width="300" height="80" fill="rgba(0, 0, 0, 0.05)" rx="10" />

      {/* Page Numbers */}
      {[1, 2, 3, 4, 5].map((num, index) => (
        <g key={num}>
          <circle cx={50 + index * 50} cy="40" r="15" fill={num === 1 ? "blue" : "lightgray"}>
            <animate attributeName="fill" values="lightgray;blue;lightgray" dur="2s" begin={`${index * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text x={50 + index * 50} y="45" textAnchor="middle" fontSize="14" fill="white">{num}</text>
        </g>
      ))}

      {/* Previous Button */}
      <polygon points="15,40 30,30 30,50" fill="gray">
        <animate attributeName="fill" values="gray;black;gray" dur="1.5s" repeatCount="indefinite" />
      </polygon>

      {/* Next Button */}
      <polygon points="285,40 270,30 270,50" fill="gray">
        <animate attributeName="fill" values="gray;black;gray" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
      </polygon>
    </svg>
  );
};
export const TabSvg: React.FC = () => {
  return (
    <svg width="300" height="100" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect x="0" y="0" width="300" height="100" fill="rgba(0, 0, 0, 0.05)" rx="10" />

      {/* Tabs */}
      {[1, 2, 3].map((num, index) => (
        <g key={num}>
          <rect x={20 + index * 90} y="20" width="80" height="40" rx="8"
            fill={num === 1 ? "blue" : "lightgray"}>
            <animate attributeName="fill" values="lightgray;blue;lightgray" dur="2s" begin={`${index * 0.3}s`} repeatCount="indefinite" />
          </rect>
          <text x={60 + index * 90} y="45" textAnchor="middle" fontSize="14" fill="white">Tab {num}</text>
        </g>
      ))}

      {/* Active Indicator */}
      <rect x="20" y="65" width="80" height="5" fill="blue">
        <animate attributeName="x" values="20;110;200;20" dur="3s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
};
// Autocomplete Icon


interface PagnitionIconProps {
  className?: string;
}

export const PagnitionIcon: React.FC<PagnitionIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shape */}
      <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
      {/* Left arrow */}
      <path
        d="M8 12l4-4v8l-4-4z"
        fill="white"
      />
      {/* Right arrow */}
      <path
        d="M16 12l-4 4V8l4 4z"
        fill="white"
      />
    </svg>
  );
};

export const PopupIcon: React.FC<PagnitionIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Popup window rectangle */}
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      {/* Popup pointer (triangle) */}
      <polygon points="12,21 8,17 16,17" />
    </svg>
  );
};
export const StepperIcon: React.FC<PagnitionIconProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 64 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal line connecting the steps */}
      <line
        x1="16"
        y1="8"
        x2="48"
        y2="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* First step: filled circle (active/completed) */}
      <circle cx="8" cy="8" r="4" fill="currentColor" />
      {/* Second step: outlined circle */}
      <circle
        cx="32"
        cy="8"
        r="4"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Third step: outlined circle */}
      <circle
        cx="56"
        cy="8"
        r="4"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};
export const CustomTableIcon = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Table top */}
    <rect x="3" y="3" width="18" height="2" fill="currentColor" />
    {/* Table legs */}
    <rect x="5" y="5" width="2" height="16" fill="currentColor" />
    <rect x="17" y="5" width="2" height="16" fill="currentColor" />
    {/* Table rows */}
    <rect x="3" y="9" width="18" height="2" fill="currentColor" />
    <rect x="3" y="15" width="18" height="2" fill="currentColor" />
  </svg>
);
export const ToastIcon = ({ className = 'w-6 h-6', fillColor = '#000' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* SVG path data goes here */}
    <path d="M12 2C7.58 2 4 4.58 4 8v8c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V8c0-3.42-3.58-6-8-6zm0 2c3.87 0 6 2.13 6 4H6c0-1.87 2.13-4 6-4zm-6 6h12v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-8z" />
  </svg>
);
export const AutocompleteIcon = ({ className = 'w-6 h-6', fillColor = '#000' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* SVG path data goes here */}
    <path d="M10 2a8 8 0 106.32 12.9l4.39 4.39a1 1 0 001.41-1.41l-4.39-4.39A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12zm-1 3v2H7a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 000-2h-2V7a1 1 0 00-2 0z" />
  </svg>
);
export const TreeViewIcon = ({ className = 'w-6 h-6', fillColor = '#000' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Replace the path data below with the actual path data from your SVG */}
    <path d="M12 2C7.58 2 4 4.58 4 8v8c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V8c0-3.42-3.58-6-8-6zm0 2c3.87 0 6 2.13 6 4H6c0-1.87 2.13-4 6-4zm-6 6h12v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-8z" />
  </svg>
);
export const ChartIcon = ({ type = 'bar' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#000"
  >
    {type === 'bar' ? (
      <>
        {/* Bar chart icon */}
        <rect x="3" y="10" width="4" height="10" />
        <rect x="10" y="6" width="4" height="14" />
        <rect x="17" y="2" width="4" height="18" />
      </>
    ) : (
      <>
        {/* Line chart icon */}
        <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="9" cy="11" r="1.5" />
        <circle cx="13" cy="15" r="1.5" />
        <circle cx="21" cy="7" r="1.5" />
      </>
    )}
  </svg>
);