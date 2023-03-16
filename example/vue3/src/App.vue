<template>
	<main>
		<div class="language-switcher">
			<select class="lang-switcher ml-2" @change="switchLanguage" :value="lang">
				<option v-for="lang in languages" :key="lang.code" :value="lang.code">{{ lang.localLabel }}</option>
			</select>
		</div>
		<div class="content">
			<user-list :users="activeUsers" @list-projects="selectUser"></user-list>
			<projects-list :user="selectedUser"></projects-list>
		</div>
	</main>
</template>

<script>
import { ref, computed } from 'vue';
import { useTranslation } from 'i18next-vue';

import { USER_DATA, LANGUAGES } from './constant.js';
import UserList from './components/users/UserList.vue';
import ProjectsList from './components/projects/ProjectsList.vue';

export default {
	components: {
		UserList,
		ProjectsList,
	},
	setup() {
		const { i18next } = useTranslation();
		const selectedUser = ref(null);
		const activeUsers = USER_DATA;
		const languages = ref(LANGUAGES);

		function selectUser(uid) {
			selectedUser.value = activeUsers.find((usr) => usr.id === uid);
		}

		function switchLanguage(evt) {
			i18next.changeLanguage(evt.target.value);
		}

		const lang = computed(function() {
			return i18next.language;
		});

		const loadLanguages = async () => {
			const langs = await i18next.services.backendConnector.backend.getLanguages();
			console.log('langs', langs);
			if (!langs || !langs.length) return;
			languages.value = langs;
		}

		loadLanguages();

		return { selectUser, switchLanguage, selectedUser, activeUsers, languages, lang };
	},
};
</script>

<style>
* {
	box-sizing: border-box;
}
html {
	font-family: sans-serif;
}
body {
	margin: 0;
}

.language-switcher {
	margin-top: 20px;
	display: flex;
	justify-content: center;
}

.content {
	display: flex;
	justify-content: space-around;
}

button {
	font: inherit;
	outline: none;
	border-radius: 5px;
	border: 1px solid #0040a0;
	background-color: transparent;
	color: #0040a0;
	padding: 0.5rem 1.5rem;
	cursor: pointer;
	margin: 0.5rem 0.5rem 0.5rem 0;
	transition: 100ms ease-in-out;
}
button:hover,
button:active {
	background-color: #eff5ff;
}

button.selected {
	background-color: #0040a0;
	color: white;
}
</style>