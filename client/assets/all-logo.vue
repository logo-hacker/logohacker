
<template>
    <div v-if="statusPage == 'all-logo'" class="tab-pane container active">
        <div class="row">
            <div class="col-md-3" :key="pict.id" v-for="pict in pictures">
                <a>
                    <picture>
                        <img alt="pict.name" :src="pict.image_url" style="width:100%; padding-top: 50px;">
                    </picture>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        pictures: Array
    },
  data() {
    return {

    };
  },
};
</script>

<style scoped>
</style>

