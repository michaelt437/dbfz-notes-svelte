<script lang="typescript">
	import { onMount } from "svelte";
	import db from "./firebase";
	import TheHeader from "./components/TheHeader.svelte";
	import Sidebar from "./components/TheSideBar.svelte";
	import TheBody from "./components/TheBody.svelte";
	import TheFooter from "./components/TheFooter.svelte";
  import { roster, character } from "./store";
	import type { Character } from "./types";

	let openSidebar: boolean = false;

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

	onMount (async () => {
		await fetchCharacters();
	})
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