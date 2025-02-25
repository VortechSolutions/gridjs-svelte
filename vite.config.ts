import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [svelte()],
	build: {
		lib: {
			entry: "src/lib/index.ts", // Ensure this file exists!
			name: "GridjsSvelte",
			formats: ["es", "umd"],
			fileName: format => `gridjs-svelte.${format}.js`,
		},
		rollupOptions: {
			external: ["svelte", "gridjs"],
			output: {
				globals: {
					svelte: "Svelte",
					gridjs: "Gridjs",
				},
			},
		},
	},
});
