<template>
  <div id="form-input" style="padding-top: 20px;" v-if="statusPage === 'createNew'" class="tab-pane">
        <form @submit.prevent="screenshot()">
            <div class="form-group row">
                <label for="inputText" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputText" placeholder="input name" style="width:25%;" v-model="logo.name"
                    >
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

            <input 
            id="inp_img" 
            name="image_url" 
            type="hidden" 
            v-model="logo.image_base64" 
            >

            <input id="bt_upload" type="submit" value="Download">
        </form>

        <input 
            type="button" 
            id="btnSave" 
            value="Save PNG"
        />

        <div>
        <!-- <div id="capture" style="padding: 10px; background: #f5da55">
            <h4 style="color: #000; ">Hello world!</h4>
            <div>
                Logo
            </div>
        </div> -->

        <!-- SOURCE CAPTURE-->
        <div id="capture" style="margin-top:3em; display: flex;" ref="capture">
            <img 
                src="../src/youtube.png"
                alt="Logo Image"
                style="display:block; margin: 0em .5em; width: 75px;"
            >
            <div style="align-self: center;">{{logo.name}}</div>
        </div>

        <div @click="print">print</div>

        <!-- OUTPUT -->
        <div id="output"></div>
        <img :src="output">

        <!-- <canvas id="canv" width="200" height="200">
            <img :src="logo.icon" alt="">
        </canvas> -->


        <!-- <form method="post" action="" @submit.prevent="screenshot();">
            <input id="inp_img" name="image_url" type="hidden" value="" 
            >
            <input id="bt_upload" type="submit" value="Download">
        </form> -->
    </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
    props:{
        logoUrl: Array,
        statusPage: String
    },
    data() {
        return {
            logo: {
                name: '',
                icon: '',
                image_base64: ''
            },
            output: null
        };
    },
    methods: {
        showCaptureRef() {
            return this.$refs.capture;
        },
        print() {
            html2canvas(document.getElementById('capture')).then(canvas => {
                // console.log(canvas);
                const base64URL = canvas.toDataURL()
                // req.body.appendChild(canvas)

                
                this.$emit('print', this.logo.name, base64URL)

            }).catch((error) => {
                console.log(error);
            });
        },
        screenshot() {
            var canvas = document.getElementById('capture');

            this.$emit('screenshot', canvas)
        },
        // savePNG() {
        //     html2canvas(document.getElementById('widget'), {
        //         onrendered: function(canvas) {
        //             theCanvas = canvas;
        //             document.body.appendChild(canvas);

        //             // Convert and download as image 
        //             // Canvas2Image.saveAsPNG(canvas); 
        //             // $("#img-out").append(canvas);
        //             // Clean up 
        //             //document.body.removeChild(canvas);
        //         }
        //     });
        //     this.$emit('savePNG')
        // },
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

