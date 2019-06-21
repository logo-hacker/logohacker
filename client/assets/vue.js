// const USER_PATH = `http://localhost:3000`

// const app = new Vue({
//     el: '#app',
//     data: {
//         canvas: '',
//         image_base64: ''
//     },
//     created() {
        
//     },
//     mounted() {
//         var canvas = document.getElementById('canv');
//         var context = canvas.getContext('2d');
        
//         context.arc(100, 100, 50, 0, 2 * Math.PI);
//         context.lineWidth = 5;
//         context.fillStyle = '#EE1111';
//         context.fill(); 
//         context.strokeStyle = '#CC0000';
//         context.stroke();
//     },
//     methods: {
//         b64toBlob(b64Data, contentType, sliceSize) {
//             contentType = contentType || '';
//             sliceSize = sliceSize || 512;
    
//             var byteCharacters = atob(b64Data);
//             var byteArrays = [];
    
//             for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//                 var slice = byteCharacters.slice(offset, offset + sliceSize);
    
//                 var byteNumbers = new Array(slice.length);
//                 for (var i = 0; i < slice.length; i++) {
//                     byteNumbers[i] = slice.charCodeAt(i);
//                 }
    
//                 var byteArray = new Uint8Array(byteNumbers);
    
//                 byteArrays.push(byteArray);
//             }
    
//             var blob = new Blob(byteArrays, {type: contentType});
//             return blob;
//         },


//         screenshot() {
//             var canvas = document.getElementById('canv');
//             document.getElementById('inp_img').value = canvas.toDataURL();

//             var image = new Image();
//             image.src = canvas.toDataURL()

//             this.image_base64 = image.src
//             var ImageURL = image.src
//             var block = ImageURL.split(";");
//             // Get the content type of the image
//             var contentType = block[0].split(":")[1];// In this case "image/gif"
//             // get the real base64 content of the file
//             var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

//             // Convert it to a blob to upload
//             var blob = this.b64toBlob(realData, contentType);

//             // Create a FormData and append the file with "image" as parameter name
//             var formDataToUpload = new FormData();
//             console.log(blob);
//             formDataToUpload.append("name", 'name');
//             formDataToUpload.append("userId", '231321');
//             formDataToUpload.append("image_url", blob);

//             axios
//             .post(`${USER_PATH}/logos`, formDataToUpload)
//             .then(user => {
//                 console.log(user);
//             })
//             .catch(err => {
//                 userForm={}
//                 console.log(err);
//             })


//             // const result = document.getElementById("result")

//             // html2canvas(document.getElementById("capture"))
//             // .then((canvas) => {
//             //     result.appendChild(canvas)

//             //     var x = document.getElementById('result > canvas');
                
//             //     // document.getElementById('inp_img').value = x.toDataURL();

//             //     const imageDownload = result.toDataURL();
//             //     // el.href = imageDownload;
//             //     console.log('zzz', result.toDataURL());
//             // })
//             // .catch(err => {
//             //     // console.log(err);
//             // })
//         }
//     },
//     computed: {
        
//     }
// })
import Vue from 'vue';
import App from './component/App.vue';


// Bootstrap Vue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
new Vue(App).$mount('#app');
