
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: "/subtitles-words-freq-counter/",
    plugins: [    
        tailwindcss(),
    ],
})