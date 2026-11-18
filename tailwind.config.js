/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#040405',
        onyx: '#0A0A0C',
        graphite: '#121317',
        steel: '#1C1E24',
        line: 'rgba(229,228,226,0.08)',
        platinum: '#E8E7E4',
        silver: '#A9ADB5',
        mist: '#6E727B',
        champagne: { DEFAULT: '#D2BC8A', soft: '#E6D6B0', deep: '#9C8657' },
      },
      fontFamily: {
        display: ['Michroma', 'Manrope Variable', 'sans-serif'],
        sans: ['Manrope Variable', 'Inter Variable', 'system-ui', 'sans-serif'],
        body: ['Inter Variable', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { brand: '0.42em', wide2: '0.22em' },
      maxWidth: { site: '1240px' },
      keyframes: {
        sheen: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: {
        sheen: 'sheen 7s linear infinite',
        float: 'float 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
