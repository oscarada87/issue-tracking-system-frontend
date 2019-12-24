<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link to="/">
        <b-navbar-brand>ITS</b-navbar-brand>
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-item-dropdown text="Dashboard" left>
            <b-dropdown-item href="#">123</b-dropdown-item>
            <b-dropdown-item href="#">456</b-dropdown-item>
            <b-dropdown-item href="#">789</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- <b-nav-item-dropdown text="Project" left>
            <b-dropdown-item @click="$bvModal.show('modal-scoped')">create</b-dropdown-item>
            <b-dropdown-item @click="goMyProject">my project</b-dropdown-item>
          </b-nav-item-dropdown>-->
          <b-nav-item href="#/project">Project</b-nav-item>
          <b-nav-item href="#/issue">Issue</b-nav-item>
          <b-nav-item v-if="isShow" href="#/accountmanagement">AccountManagement</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>-->
          <b-button variant="transparent">
            <font-awesome-icon icon="info-circle" size="lg" />
          </b-button>

          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <font-awesome-icon icon="user" size="lg" />
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      this.$router.push("/login");
    },
    async CheckIdentity() {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");
      const api = `http://lspssapple.asuscomm.com:81/api/user/${user_id}`;
      const vm = this;
      let res = await axios
        .get(api, {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json;charset=utf-8"
          }
        })
        .then(res => {
          return res;
        })
        .catch(err => {
          return err.response;
        });
      if (res.data.charactorId == 1) this.isShow = true;
      else this.isShow = false;
    }
  },
  mounted() {
    this.CheckIdentity();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
