<script lang="ts">
	import TheHeader from "./components/TheHeader.svelte";
	import Sidebar from "./components/TheSideBar.svelte";
	import TheBody from "./components/TheBody.svelte";
	import TheFooter from "./components/TheFooter.svelte";

	let openSidebar: boolean = false;
</script>

<main>
	<div class="main-content">
		<TheHeader on:triggerMenu={() => openSidebar = !openSidebar} {openSidebar} />
		<div class="container is-max-widescreen px-5 pb-5 pt-3">
			<div class="columns">
				<Sidebar on:triggerMenu={() => openSidebar = !openSidebar } {openSidebar} />
				<TheBody />
			</div>
		</div>
	</div>
	<TheFooter />
</main>

<style>
	@import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		background-color: #f5f5f5;

	}
	main .main-content {
		background-color: inherit;
	}
</style>