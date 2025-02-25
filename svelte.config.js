import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),

		package: {	
			dir: "dist",	
			files: filepath => !/.stories.svelte|.test.ts/g.test(filepath),	
		},	
	},
};

export default config;
