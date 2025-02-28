<script lang="ts">
	import type { Config } from "gridjs";
	import type { Plugin } from "gridjs/dist/src/plugin";
	import type { TableEvents } from "gridjs/dist/src/view/table/events";
	import type Tabular from "gridjs/dist/src/tabular";
	import type { People } from "../types/people";

	import { h, PluginPosition } from "gridjs";
	import Grid from "../lib/gridjs.svelte";
	import Planet from "../components/planet.svelte";
	import { SvelteWrapper } from "../lib/plugins";
	import { Gender } from "../types/people";

	// https://gridjs.io/docs/plugins/basics
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const headingPlugin: Plugin<any> = {
		id: "heading",
		position: PluginPosition.Header,
		component: () => h("h1", { style: { width: "100%" } }, "Star Wars Peoples"),
	};

	// https://gridjs.io/docs/config/className
	const className: Config["className"] = {
		error: "error",
	};

	// https://gridjs.io/docs/config/style
	const style: Config["style"] = {
		table: {
			width: "100%",
		},
		header: {
			display: "flex",
			alignItems: "center",
			flexDirection: "row-reverse",
		},
	};

	// https://gridjs.io/docs/config/language
	const language: Config["language"] = {
		search: {
			placeholder: "Find people",
		},
	};

	// https://gridjs.io/docs/config/server
	const server: Config["server"] = {
		url: "https://swapi.dev/api/people",
		total: (data: People) => data.count,
		then: (data: People) => data.results.map(people => [people.name, people.gender, people.homeworld, people.url]),
	};

	// https://gridjs.io/docs/config/columns
	const columns: Config["columns"] = [
		"Name",
		{
			name: "Gnder",
			width: "10%",
			formatter: cell => {
				if (cell === Gender.NA) {
					return "???";
				}

				return cell.toString().replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
			},
		},
		{
			name: "Planet",
			width: "15%",
			plugin: {
				component: SvelteWrapper,
				props: {
					component: Planet,
				},
			},
		},
		{
			name: "Action",
			width: "10%",
			formatter: cell => {
				return h(
					"button",
					{
						className: "btn",
						onClick: () => alert(`See the detail on ${cell}`),
					},
					"Detail",
				);
			},
		},
	];

	// https://gridjs.io/docs/config/pagination
	const pagination: Config["pagination"] = {
		limit: 10,
		server: {
			// https://github.com/grid-js/gridjs/issues/84
			url: (prev, page) => `${prev}${prev.includes("?") ? "&" : "?"}page=${page + 1}`,
		},
	};

	// https://gridjs.io/docs/config/search
	const search: Config["search"] = {
		server: {
			url: (prev, keyword) => `${prev}?search=${keyword}`,
		},
	};

	// https://gridjs.io/docs/examples/event-handler
	// https://github.com/grid-js/gridjs/blob/master/src/view/events.ts#L6
	function onready() {
		console.log("🚀 ~ onReady ~ Grid.js is ready");
	}

	// https://gridjs.io/docs/examples/event-handler
	// https://github.com/grid-js/gridjs/blob/master/src/view/events.ts#L5
	function onload(event: CustomEvent<Tabular>) {
		// @ts-expect-error - (for demo purpose) actually `_length` is private property
		console.table("🚀 ~ onLoad ~ people count", event.detail._length);
	}

	// https://gridjs.io/docs/examples/event-handler
	// https://github.com/grid-js/gridjs/blob/master/src/view/events.ts#L4
	function onbeforeLoad() {
		console.log("🚀 ~ onBeforeLoad ~ fired onBeforeLoad function");
	}

	// https://gridjs.io/docs/examples/event-handler
	// https://github.com/grid-js/gridjs/blob/master/src/view/table/events.ts#L6-L11
	function oncellClick(event: CustomEvent<TableEvents["cellClick"]>) {
		const [_e, { data }] = Object.values(event.detail);
		console.log(`🚀 ~ onCellClick ~ clicked cell:`, _e, data);
	}

	// https://gridjs.io/docs/examples/event-handler
	// https://github.com/grid-js/gridjs/blob/master/src/view/table/events.ts#L12
	function onrowClick(event: CustomEvent<TableEvents["rowClick"]>) {
		const [_e, row] = Object.values(event.detail);
		console.log(`🚀 ~ onRowClick ~ clicked row:`, _e, row.cell(0).data, row.cell(3).data);
	}
</script>

<Grid
	{search}
	{columns}
	{server}
	{pagination}
	{language}
	{className}
	{style}
	plugins={[headingPlugin]}
	{onload}
	{onready}
	{onbeforeLoad}
	{oncellClick}
	{onrowClick}
/>

<style global>
	@import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";

	:global(:root) {
		--primary-color: #ffe300;
		--error-color: red;
	}

	:global(.btn) {
		background-color: var(--primary-color);
		padding: 0.5rem 1rem;
		border-width: 0;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	:global(.error) {
		color: var(--error-color);
	}
</style>
