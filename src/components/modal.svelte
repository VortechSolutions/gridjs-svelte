<script lang="ts">
	import { createEventDispatcher } from "svelte";
	interface Props {
		header?: import("svelte").Snippet;
		children?: import("svelte").Snippet;
		action?: import("svelte").Snippet;
	}

	let { header, children, action }: Props = $props();

	let modal = $state();

	const dispatch = createEventDispatcher();
	const close = () => dispatch("close");
</script>

<button type="button" class="modal-background" onclick={close} aria-label="Close modal"></button>

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	{@render header?.()}
	{@render children?.()}
	{@render action?.()}
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
	}
</style>
