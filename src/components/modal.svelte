<script lang="ts">
	import { type Snippet } from "svelte";
	interface Props {
		header?: Snippet;
		children?: Snippet;
		action?: Snippet;
		onclose?: () => void;
	}

	let { header, children, action, onclose }: Props = $props();

	let modal = $state();

	const close = () => {
		if (onclose) onclose();
	};
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
