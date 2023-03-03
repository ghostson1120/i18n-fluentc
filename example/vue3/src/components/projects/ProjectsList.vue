<template>
	<base-container v-if="user">
		<h2>{{ user.fullName }}: {{ $t('projects') }}</h2>
		<base-search
			v-if="hasProjects"
			@search="updateSearch"
			:search-term="enteredSearchTerm"
		></base-search>
		<ul v-if="hasProjects">
			<project-item
				v-for="prj in availableProjects"
				:key="prj.id"
				:title="prj.title"
			></project-item>
		</ul>
		<h3 v-else>{{ $t('no-projects') }}</h3>
	</base-container>
	<base-container v-else>
		<h3>{{ $t('no-user-selected') }}</h3>
	</base-container>
</template>

<script>
import { computed, watch, toRefs } from 'vue';
import { useTranslation } from 'i18next-vue';

import ProjectItem from './ProjectItem.vue';
import useSearch from '../../hooks/search.js';

export default {
	components: {
		ProjectItem,
	},
	props: ['user'],
	setup(props) {
		const { t } = useTranslation();
		const { user } = toRefs(props);

		const projects = computed(function () {
			const projects = user.value ? user.value.projects : [];
			return projects.map(prj => ({
				id: prj.id,
				title: t(prj.id) || prj.default
			}));
		});

		const { enteredSearchTerm, availableItems, updateSearch } = useSearch(
			projects,
			'title'
		);

		const hasProjects = computed(function () {
			return user.value.projects && availableItems.value.length > 0;
		});

		watch(user, function () {
			updateSearch('');
		});

		return {
			enteredSearchTerm,
			availableProjects: availableItems,
			hasProjects,
			updateSearch,
		};
	},
};
</script>

<style scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>