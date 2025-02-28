<script lang="ts">
	import type { Row, Cell } from "gridjs";
	import Modal from "./modal.svelte";

	interface Props {
		row: Row;
		cell: Cell;
	}

	let { row, cell }: Props = $props();

	let title = $derived(`Planet ${row.cell(0).data}`);

	let showModal = $state(false);

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<button class="btn" onclick={toggleModal}>See detail</button>

<!-- for demo purpose -->
{#if showModal}
	<Modal onclose={toggleModal}>
		{#snippet header()}
			<h2>{title}</h2>
		{/snippet}

		<pre>
      {JSON.stringify(cell, null, 2)}
    </pre>

		{#snippet action()}
			<button onclick={toggleModal}>Ok</button>
		{/snippet}
	</Modal>
{/if}
