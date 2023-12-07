<script lang="ts">
	import "$lib/styles/style.scss"
</script>

<div class="main">
	<slot />
</div>


<style lang="scss">
	.main{
		display: flex;
		justify-content: center;
		margin-top: 10cqw;
	}
</style>
