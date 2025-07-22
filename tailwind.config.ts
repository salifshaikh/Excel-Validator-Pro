import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			error: {
  				'25': '#fffbfa',
  				'50': '#fef3f2',
  				'100': '#fee4e2',
  				'200': '#fecdca',
  				'300': '#fda29b',
  				'400': '#f97066',
  				'500': '#f04438',
  				'600': '#d92d20',
  				'700': '#b42318',
  				'800': '#912018',
  				'900': '#7a271a',
  				'950': '#55160c'
  			},
  			success: {
  				'25': '#f6fef9',
  				'50': '#ecfdf3',
  				'100': '#d1fadf',
  				'200': '#a6f4c5',
  				'300': '#6ce9a6',
  				'400': '#32d583',
  				'500': '#12b76a',
  				'600': '#039855',
  				'700': '#027a48',
  				'800': '#05603a',
  				'900': '#054f31',
  				'950': '#053321'
  			},
  			brand: {
  				'25': '#fffaf5',
  				'50': '#fff6ed',
  				'100': '#ffead5',
  				'200': '#fddcab',
  				'300': '#feb273',
  				'400': '#fd853a',
  				'500': '#fb6514',
  				'600': '#ec4a0a',
  				'700': '#c4320a',
  				'800': '#9c2a10',
  				'900': '#7e2410',
  				'950': '#511c10'
  			},
  			gray: {
  				'50': '#F9FAFB'
  			},
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
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			outfit: [
  				'Outfit',
  				'sans-serif'
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, any>) => void;
    }) {
      addUtilities({
        ".border-gray-50\\!": {
          "border-color": "#F9FAFB !important",
        },
        ".bg-gray-50\\!": {
          "background-color": "#F9FAFB !important",
        },
      });
    },
  ],
};
export default config;
