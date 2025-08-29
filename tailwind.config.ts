import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: 'hsl(var(--surface))',
				'surface-elevated': 'hsl(var(--surface-elevated))',
				
				// Apple-inspired grey palette
				grey: {
					50: 'hsl(var(--grey-50))',
					100: 'hsl(var(--grey-100))',
					200: 'hsl(var(--grey-200))',
					300: 'hsl(var(--grey-300))',
					400: 'hsl(var(--grey-400))',
					500: 'hsl(var(--grey-500))',
				},
				
				// Apple blue
				'apple-blue': {
					DEFAULT: 'hsl(var(--apple-blue))',
					light: 'hsl(var(--apple-blue-light))',
					dark: 'hsl(var(--apple-blue-dark))',
				},
				
				// Apple silver
				silver: {
					DEFAULT: 'hsl(var(--silver))',
					light: 'hsl(var(--silver-light))',
					dark: 'hsl(var(--silver-dark))',
				},
				
				// Semantic colors
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					light: 'hsl(var(--primary-light))',
					dark: 'hsl(var(--primary-dark))',
				},
				success: 'hsl(var(--success))',
				error: 'hsl(var(--error))',
			},
			borderRadius: {
				'apple-sm': 'var(--radius-sm)',
				'apple-md': 'var(--radius-md)',
				'apple-lg': 'var(--radius-lg)',
				'apple-xl': 'var(--radius-xl)',
			},
			boxShadow: {
				'apple-soft': 'var(--shadow-soft)',
				'apple-medium': 'var(--shadow-medium)',
				'apple-large': 'var(--shadow-large)',
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
			},
			fontFamily: {
				'inter': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
			},
			transitionTimingFunction: {
				'ease-out-cubic': 'var(--ease-out-cubic)',
				'ease-in-out-cubic': 'var(--ease-in-out-cubic)',
			},
			transitionDuration: {
				'fast': 'var(--transition-fast)',
				'normal': 'var(--transition-normal)',
				'slow': 'var(--transition-slow)',
			},
			keyframes: {
				fadeInUp: {
					'0%': { 
						opacity: '0', 
						transform: 'translateY(20px)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'translateY(0)' 
					},
				},
				scaleIn: {
					'0%': { 
						opacity: '0', 
						transform: 'scale(0.95)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'scale(1)' 
					},
				},
			},
			animation: {
				'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.33, 1, 0.68, 1) forwards',
				'scale-in': 'scaleIn 0.4s cubic-bezier(0.33, 1, 0.68, 1) forwards',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
