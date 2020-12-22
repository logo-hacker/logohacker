
<template>
    <div v-if="statusPage == 'all-logo'" class="tab-pane container active">
        <div class="row">
            <div class="col-md-3" :key="pict.id" v-for="pict in pictures">
                <a>
                    <picture>
                        <img alt="pict.name" :src="pict.image_url" style="width:100%; padding-top: 50px;">
                    </picture>
                </a>
                <div class="row">
                    <div class="col">
                        <a href="#" class="fa fa-facebook" @click="shareFacebook"></a> 
                        <a href="#" class="fa fa-twitter" @click="shareTwitter"></a>
                        <a href="#" class="fa fa-instagram" @click="shareInstagram"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        pictures: Array,
        statusPage: String
    },
  data() {
    return {

    };
  },methods:{
      shareFacebook(){
        this.$emit('shareFacebook')
      },
      shareTwitter(){
        this.$emit('shareTwitter')
      },
      shareInstagram(){
        this.$emit('shareInstagram')
      }
  }
};
</script>

<style scoped>
.fa {
  padding: 20px;
  font-size: 30px;
  width: 50px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;
}

.fa:hover {
    opacity: 0.7;
}

.fa-facebook {
  background: #3B5998;
  color: white;
}

.fa-twitter {
  background: #55ACEE;
  color: white;
}

.fa-instagram {
  background: #125688;
  color: white;
}
</style>

