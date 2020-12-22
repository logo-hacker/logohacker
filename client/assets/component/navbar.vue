<template>
  <nav class="navbar navbar-expand navbar-light justify-content-between" style="min-height: 50px; max-height: 60px; background-color: #21374b;">
    <div class="nav-size">
      <div class="navbar-item" href="#">
        <img src="https://s.w.org/style/images/about/WordPress-logotype-wmark.png" width="40" height="40" alt="logo">
      </div>
    </div>

    <div class="nav-size d-flex justify-content-center">
        <h1>Logo-Hackers</h1>
    </div>

    <div class="nav-size d-flex justify-content-end">
      <div>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
              <a class="nav-link white-link register-button" href="#" @click="rendRegister" v-show="isLogin == false">Register</a>
          </li>
          <li class="nav-item">
              <a class="nav-link white-link login-button" href="#" @click="rendLogin" v-show="isLogin == false">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link white-link" v-show="isLogin == true" @click="allPost">All Post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link white-link" v-show="isLogin == true" @click="myPost">My Post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link white-link" v-show="isLogin == true" @click="create">Create</a>
          </li>
          <li class="nav-item">
              <a class="nav-link white-link" href="#" id="logoff" @click="signOut" v-show="isLogin == true">Logout</a>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    'isLogin': Boolean,
    'user' : Object
  },
  data() {
    return {

    };
  },
  methods: {
    rendRegister (){
      this.$emit('rendRegister')
    },
    rendLogin () {
      this.$emit('rendLogin')
    },
    signOut () {
      this.$emit('signOut')
    },
    myPost() {
      this.$emit('myPost')
    },
    allPost() {
      this.$emit('allPost')
    },
    create() {
      this.$emit('create')
    }
  }
};
</script>

<style scoped>
  .nav-size{
    width: 30%;
  }
  h1 {
    color: rgb(255, 255, 255);
  }
  .white-link {
    color: rgb(212, 212, 212) !important;
  }
  a{ color: #fff; }
</style>