<template>
  <div class="app">
    <navbar :isLogin="isLogin" :user="user"   @signOut="signOut"  
      @rendLogin="rendLogin" 
      @rendRegister="rendRegister"
      @allPost="allPost"
      @myPost="myPost"
      @create="create"
    ></navbar>

    <register-page 
      :page="page" 
      :newUser="newUser" 
      @register="register" 
      @rendLogin="rendLogin"
    ></register-page>
  
    <login-page :page="page" :user="user" @login="login" @rendRegister="rendRegister"></login-page>

    <notif-modal :notifStat="notifStat" :message="message"></notif-modal>

    <all-logo :pictures="pictures"></all-logo>

    <form-input 
      :statusPage="statusPage"
      :logoUrl="logoUrl" 
      :text="text" 
      :uploadFile="uploadFile"
      @screenshot="screenshot"
      @savePNG="savePNG"
      @print="print"
    ></form-input>

  </div>
</template>

<script>
const BASE_PATH = `http://localhost:3000`

import navbar from './navbar.vue'
import register from './register.vue'
import login from './login.vue'
import notifModal from './notif-modal.vue'
import allLogo from './all-logo'
import formInput from './form-input'

export default {
  components: {
    'navbar': navbar,
    'register-page' : register,
    'login-page' : login,
    'notif-modal' : notifModal,
    'all-logo' : allLogo,
    'form-input' : formInput
  },
  data() {
    return {
      newUser : {
        email: "",
        password: "",
      },
      user : {
        email: "",
        password: "",
      },
      notifStat : false,
      message : "",
      page: "login",
      menu: "list",
      isLogin: false,
      statusPage: '',
      pictures:[],
      logoUrl: [],
      text: '',
      uploadFile: ''
    };
  },
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
    this.checkLogin()
  },
  methods: {
    create() {
      console.log('create');
      this.statusPage='createNew'
    },
    allPost() {

    },
    myPost() {

    },
    savePNG() {
      
    },
    print(name, canvas) {
      // let config = {
      //   headers: {
      //     token: localStorage.token
      //   }
      // }
      axios
      .post(`${BASE_PATH}/logos`, {
        name,
        image: canvas
      })
      .then(user => {
          console.log(user);
      })
      .catch(err => {
          // userForm={}
          console.log(err)
      })
    },
    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    },
    screenshot(canvas) {
      // var canvas = document.getElementById('canv');
      document.getElementById('inp_img').value = canvas.toDataURL();

      var image = new Image();
      image.src = canvas.toDataURL()

      // this.image_base64 = image.src
      var ImageURL = image.src
      var block = ImageURL.split(";");
      // Get the content type of the image
      var contentType = block[0].split(":")[1];// In this case "image/gif"
      // get the real base64 content of the file
      var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

      // Convert it to a blob to upload
      var blob = this.b64toBlob(realData, contentType);

      // Create a FormData and append the file with "image" as parameter name
      var formDataToUpload = new FormData();
      console.log(blob);
      formDataToUpload.append("name", 'name');
      formDataToUpload.append("userId", '231321');
      formDataToUpload.append("image_url", blob);

      axios
      .post(`${BASE_PATH}/logos`, formDataToUpload)
      .then(user => {
          console.log(user);
      })
      .catch(err => {
          // userForm={}
          console.log(err)
      })

      const result = document.getElementById("result")

      // html2canvas(document.getElementById("capture"))
      // .then((canvas) => {
      //     result.appendChild(canvas)

      //     var x = document.getElementById('result > canvas');
          
      //     // document.getElementById('inp_img').value = x.toDataURL();

      //     const imageDownload = result.toDataURL();
      //     // el.href = imageDownload;
      //     console.log('zzz', result.toDataURL());
      // })
      // .catch(err => {
      //     // console.log(err);
      // })
    },
    checkLogin() {
      if (localStorage.getItem('token')) {
        this.user.name = localStorage.getItem("name")
        this.isLogin = true
        this.rendHome()
      }
    },
    register () {
      axios({
        method: 'post',
        url: `${BASE_PATH}/users/register`,
        data: {
          email: this.newUser.email,
          password: this.newUser.password
        }
      })
      .then((response) => {
        this.notifStat = true
        this.message = "Register Success!"
        this.$bvModal.show('notif-modal')
        this.newUser.email = ""
        this.newUser.password = ""
        this.page = "login"
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    login (){
      axios({
        method: 'post',
        url: `${BASE_PATH}/users/login`,
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
      .then(({data}) => {
        this.user.email = data.email
        this.user.password = ""
        this.notifStat = true
        this.message = "Login Success!"
        this.$bvModal.show('notif-modal')
        this.isLogin = true
        localStorage.setItem("token", data.token)
        localStorage.setItem("name", data.email)
        this.rendHome()
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      let token = id_token
      axios({
        method: 'post',
        url: `${BASE_PATH}/users/loginGoogle`,
        headers: {
          token
        }
      })
      .then(({data}) => {
        this.user.email = data.email
        this.user.password = ""
        this.notifStat = true
        this.message = "Login Success!"
        // this.$bvModal.show('notif-modal')
        this.isLogin = true
        localStorage.setItem("token", data.token)
        localStorage.setItem("name", data.email)
        this.rendHome()
        // this.rendHome() --> arahkan ke homepage
      })
      .catch((error) => {
        this.errorHandler(error)
      });
    },
    signOut () {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      this.notifStat = true
      this.message = "Logout Success!"
      this.$bvModal.show('notif-modal')
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      this.isLogin = false
      this.user.email = ""
      this.user.password = ""
      this.newUser.email = ""
      this.newUser.password = ""
      this.page = "login"
    },
    rendLogin () {
      this.newUser.email = ""
      this.newUser.password = ""
      this.page = "login"
    },
    rendRegister () {
      this.newUser.email = ""
      this.newUser.password = ""
      this.page = "register"
    },
    rendHome () {
      this.page = "home"
    },
    errorHandler (error){
      this.notifStat = false
      if (error.response){
        this.message = error.response.data.message
      } else {
        this.message = `Connection to server error!`
      }
      this.$bvModal.show('notif-modal')
    },
  }
};
</script>

<style scoped>
  .app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
</style>