<script lang="typescript">
	import TheHeader from "./components/TheHeader.svelte";
	import TheBody from "./components/TheBody.svelte";
	import TheFooter from "./components/TheFooter.svelte";
	import TheAddModal from "./components/TheAddModal.svelte";
	import TheEditModal from "./components/TheEditModal.svelte";

	let openSidebar: boolean = false;
	let openEditModal: boolean = false;
	let openAddModal: boolean = false;

	function invokeEditModal () {
		openEditModal = true;
	}
	function invokeAddModal () {
		openAddModal = true;
	}
</script>

<main>
	<div class="main-content">
		<TheHeader on:triggerMenu={() => openSidebar = !openSidebar} {openSidebar} />
		<div class="container is-max-widescreen px-5 pb-5 pt-3">
			<div class="columns" style="justify-content: center;">
				<TheBody on:openEditModal={invokeEditModal} on:openAddModal={invokeAddModal} />
			</div>
		</div>
	</div>
	<TheFooter />
	{#if openAddModal}
		<TheAddModal {openAddModal} on:closeModal={() => openAddModal = false}/>
	{/if}
	{#if openEditModal}
		<TheEditModal {openEditModal} on:closeModal={() => openEditModal = false} />
	{/if}
</main>

<style>
	@import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		background-color: #f5f5f5;
		position: relative;
	}
	main .main-content {
		background-color: inherit;
	}
</style>