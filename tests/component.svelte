<script lang="ts">
	let { cell, row, column } = $props();
</script>

<pre data-testid="component-props">{JSON.stringify({cell, row, column}, null, 2)}</pre>
