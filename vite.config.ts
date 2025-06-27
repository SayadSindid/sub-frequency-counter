
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    // Repo Name
    base: "/sub-frequency-counter/",
    plugins: [    
        tailwindcss(),
    ],
})