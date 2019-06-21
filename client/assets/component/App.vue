<template>
  <div class="app">
    <navbar :isLogin="isLogin" :user="user" @signOut="signOut" @rendLogin="rendLogin" @rendRegister="rendRegister"></navbar>

    <register-page :page="page" :newUser="newUser" @register="register" @rendLogin="rendLogin"></register-page>
  
    <login-page :page="page" :user="user" @login="login" @rendRegister="rendRegister"></login-page>

    <notif-modal :notifStat="notifStat" :message="message"></notif-modal>

    <all-logo :pictures="pictures"></all-logo>

    <form-input :logoUrl="logoUrl" :text="text" :uploadFile="uploadFile"></form-input>

  </div>
</template>

<script>
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
    checkLogin() {
      if (localStorage.getItem('token')) {
        this.user.name = localStorage.getItem("name")
        this.isLogin = true
        // this.rendHome() --> arahkan ke homepage
      }
    },
    register () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/register',
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
        url: 'http://localhost:3000/user/login',
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
        // this.rendHome() --> arahkan ke homepage
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
        url: 'http://localhost:3000/user/signingoogle',
        data: {
          token
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
      this.rendList()
    },
    errorHandler (error){
      this.notifStat = false
      if (err.response){
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