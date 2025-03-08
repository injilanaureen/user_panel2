import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'Figtree',
                    ...defaultTheme.fontFamily.sans
                ]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
				primary_color: "#497D74",
				secondary_color: "#296e62",
				accent_color: "#29665c",
				background_color: "#2a5e55",
				hover_cover: "#1d524a",
				subHover_cover: "#1b4a42",
				subSubHover_cover: "#154039",
				"green-light": "#d1fae5", // text-green-100
				"gray-light": "#e5e7eb", // bg-gray-200
				"white-light": "#ffffff", // bg-white
				"green-dark": "#065f46", // text-green-900
				"gray-dark": "#1f2937", // bg-gray-800
				"white-dark": "#000000", // bg-black
				"gray-lighter": "#f3f4f6", // bg-gray-100
				"gray-darker": "#1f2937", // bg-gray-800
				"hover-primary": "#ecfdf5", // hover:bg-primary-50
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			// input: 'hsl(var(--input))',
    			// ring: 'hsl(var(--ring))',
    			// chart: {
    			// 	'1': 'hsl(var(--chart-1))',
    			// 	'2': 'hsl(var(--chart-2))',
    			// 	'3': 'hsl(var(--chart-3))',
    			// 	'4': 'hsl(var(--chart-4))',
    			// 	'5': 'hsl(var(--chart-5))'
    			// }
    		}
    	}
    },

    plugins: [forms, require("tailwindcss-animate")],
};
