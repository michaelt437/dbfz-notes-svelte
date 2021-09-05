<script lang="typescript">
	import { onMount } from "svelte";
	import db from "./firebase";
	import TheHeader from "./components/TheHeader.svelte";
	import Sidebar from "./components/TheSideBar.svelte";
	import TheBody from "./components/TheBody.svelte";
	import TheFooter from "./components/TheFooter.svelte";
	import TheAddModal from "./components/TheAddModal.svelte";
	import TheEditModal from "./components/TheEditModal.svelte";
  import { roster, character } from "./store";

	let openSidebar: boolean = false;
	let openEditModal: boolean = false;
	let openAddModal: boolean = false;

	function fetchCharacters (): Promise<void> {
		return new Promise ((resolve, reject) => {
			db.collection("characters")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(character => {
					$roster = [...$roster, { name: character.data().name, id: character.id }];
				})
				character.set($roster[0])
				resolve();
			})
			.catch(error => {
				reject(error);
			})
		})
	}

	function invokeEditModal () {
		openEditModal = true;
	}
	function invokeAddModal () {
		openAddModal = true;
	}

	onMount (async () => {
		await fetchCharacters();
	})
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
	<TheAddModal {openAddModal} on:closeModal={() => openAddModal = false}/>
	<TheEditModal {openEditModal} on:closeModal={() => openEditModal = false} />
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