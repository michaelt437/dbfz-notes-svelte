<script lang="ts">
	import { onMount } from "svelte";
	import Sidebar from "./components/TheSideBar.svelte";
	import TheBody from "./components/TheBody.svelte";
</script>

<main>
	<div class="container is-max-widescreen px-5 pb-5 pt-3">
		<div class="columns">
			<Sidebar />
			<TheBody />
		</div>
	</div>
</main>

<style lang="scss">
	@import 'bulma/css/bulma.min.css';
	@import '@fortawesome/fontawesome-free/css/all.css';
</style>