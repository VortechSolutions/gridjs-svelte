<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Grid } from "gridjs";

	const { 
		width = "100%", 
		height = "auto",
		autoWidth = true,
		fixedHeader = false,
		resizable = false,
		from,
		language,
		search = false,
		sort = false,
		pagination = false,
		server,
		columns,
		data,
		plugins,
		style = {},
		className = {},
		cellClick,
		rowClick,
		beforeLoad,
		load,
		ready,
	} = $props();

	// https://github.com/grid-js/gridjs/blob/master/src/config.ts
	export const instance = new Grid({
		from,
		data,
		columns,
		server,
		search,
		sort,
		pagination,
		language,
		width,
		height,
		autoWidth,
		plugins,
		fixedHeader,
		resizable,
		style,
		className,
	});

	let node: Element;

	const dispatch = createEventDispatcher();

	// https://github.com/grid-js/gridjs/blob/master/src/view/table/events.ts
	instance.on("cellClick", (...args) => dispatch("cellClick", { ...args }));
	instance.on("rowClick", (...args) => dispatch("rowClick", { ...args }));
	// https://github.com/grid-js/gridjs/blob/master/src/view/events.ts
	instance.on("beforeLoad", () => dispatch("beforeLoad"));
	instance.on("load", data => dispatch("load", { ...data }));
	instance.on("ready", () => dispatch("ready"));

	$effect(() => {
		const grid = instance.updateConfig({
			from,
			data,
			columns,
			server,
			search,
			sort,
			pagination,
			language,
			width,
			height,
			autoWidth,
			fixedHeader,
			style,
			className,
			resizable,
		});
		if (node && node.childNodes.length === 0) {
			instance.render(node);
		}
		if (grid && node.childNodes.length > 0) {
			grid.forceRender();
		}
	});
</script>

<article bind:this={node}></article>
