<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { type Config, Grid } from "gridjs";

	interface Props {
		width?: Config["width"];
		height?: Config["height"];
		autoWidth?: Config["autoWidth"];
		fixedHeader?: Config["fixedHeader"];
		resizable?: Config["resizable"];
		from?: Config["from"];
		language?: Config["language"];
		search?: Config["search"];
		sort?: Config["sort"];
		pagination?: Config["pagination"];
		server?: Config["server"];
		columns?: Config["columns"];
		data?: Config["data"];
		plugins?: Config["plugins"];
		style?: Config["style"];
		className?: Config["className"];
		store?: Config["store"];
		eventEmitter?: Config["eventEmitter"];
		plugin?: Config["plugin"];
		container?: Config["container"];
		tableRef?: Config["tableRef"];
		header?: Config["header"];
		storage?: Config["storage"];
		processingThrottleMs?: Config["processingThrottleMs"];
		pipeline?: Config["pipeline"];
		translator?: Config["translator"];
		onload?: (event: CustomEvent) => void;
		onready?: (event: CustomEvent) => void;
		onbeforeLoad?: (event: CustomEvent) => void;
		oncellClick?: (event: CustomEvent) => void;
		onrowClick?: (event: CustomEvent) => void;
	}

	let {
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
	}: Props = $props();

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
