
<template>
  <div id="form-input" style="padding-top: 20px;" v-if="statusPage == 'createNew'" class="tab-pane">
        <form @submit.prevent="createLogo">
            <div class="form-group row">
                <label for="inputText" class="col-sm-2 col-form-label">Text</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputText" placeholder="Text" style="width:25%;" v-model="text">
                </div>
            </div>
            <div class="form-group row">
                <label for="uploadGambar" class="col-sm-2 col-form-label">Upload Gambar</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="uploadGambar" placeholder="Text" style="width:25%;" v-model="uploadFile">
                </div>
            </div>
            <div class="form-group row" >
                <label for="inputLogo" class="col-sm-2 col-form-label">Logo</label>
                <div class="col-sm-10" :key="logo.id" v-for="logo in logoUrl">
                    <a>
                         <img :src="logo.url" style="width:10%;">    
                    </a>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" >Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    props:{
        logoUrl: Array,
        statusPage: String
    },
  data() {
    return {
    };
  },
};
</script>
    
<style scoped>
    .image {
        opacity: 1;
        display: block;
        width: 100%;
        height: auto;
        transition: .5s ease;
        backface-visibility: hidden;
    }
    
    .middle {
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-10%, -10%);
        -ms-transform: translate(-10%, -10%);
        text-align: center;
    }
    
    .container:hover .image {
        opacity: 0.3;
    }
    
    .container:hover .middle {
        opacity: 1;
    }
    
    .text {
        background-color: #4CAF50;
        color: white;
        font-size: 16px;
        padding: 16px 32px;
    }
</style>

