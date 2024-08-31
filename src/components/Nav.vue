<template>
   <ul class="nav navbar-nav collapse navbar-collapse">
		<li v-for="l in links" :key="l.path"><router-link :to="l.path">{{ l.text }}</router-link></li>
	</ul>
</template>
<script>
export default {
    name: 'NavComponent',
	props: {
		links: {
			type: Array,
			required: true
		}
	}
}
</script>