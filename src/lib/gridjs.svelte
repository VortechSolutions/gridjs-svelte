<script lang="ts">
	import { onMount } from "svelte";
	import { Grid } from "gridjs";
	import type { Config } from "gridjs";

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
		instance?: Config["instance"];
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
		from = undefined,
		language = undefined,
		search = false,
		sort = false,
		pagination = false,
		server = undefined,
		columns = undefined,
		data = undefined,
		plugins = undefined,
		style = {},
		className = {},
		onload = () => {},
		onready = () => {},
		onbeforeLoad = () => {},
		oncellClick = () => {},
		onrowClick = () => {},
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

	let node: Element = $state();
	const eventTarget = new EventTarget();

	// https://github.com/grid-js/gridjs/blob/master/src/view/table/events.ts
	instance.on("cellClick", (...args) => oncellClick(new CustomEvent("cellClick", { detail: args })));
	instance.on("rowClick", (...args) => onrowClick(new CustomEvent("rowClick", { detail: args })));

	// https://github.com/grid-js/gridjs/blob/master/src/view/events.ts
	instance.on("beforeLoad", () => onbeforeLoad(new CustomEvent("beforeLoad")));
	instance.on("load", data => onload(new CustomEvent("load", { detail: data })));
	instance.on("ready", () => onready(new CustomEvent("ready")));

	$effect.pre(() => {
		if (node) {
			instance
				.updateConfig({
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
				})
				.forceRender();
		}
	});

	onMount(() => {
		if (node) {
			instance.render(node);
		}
	});
	export { eventTarget };
</script>

<article bind:this={node}></article>
