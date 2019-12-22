<template>
  <div>
    <b-form @submit.prevent="register">
      <b-form-group
        id="fieldset-userName"
        label="Enter your Name"
        label-for="input-userName"
        :invalid-feedback="invalidUserNameFeedback"
        :valid-feedback="validFeedback"
        :state="state"
      >
        <b-form-input
          id="input-userName"
          v-model="userName"
          :state="userNameState"
          type="text"
          trim
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="fieldset-userID"
        label="Enter your userID"
        label-for="input-userID"
        :invalid-feedback="invalidUserIDFeedback"
        :valid-feedback="validFeedback"
        :state="state"
      >
        <b-form-input
          id="input-userID"
          v-model="userID"
          :state="userIDState"
          type="text"
          trim
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="fieldset-password"
        label="Enter your Password"
        label-for="input-password"
        :invalid-feedback="invalidPasswordFeedback"
        :valid-feedback="validFeedback"
        :state="state"
      >
        <b-form-input
          id="input-password"
          v-model="password"
          :state="passwordState"
          type="password"
          trim
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="fieldset-email"
        label="Enter your Email"
        label-for="input-email"
        :invalid-feedback="invalidEmailFeedback"
        :valid-feedback="validFeedback"
        :state="emailState"
      >
        <b-form-input
          id="input-email"
          v-model="email"
          :state="emailState"
          type="email"
          trim
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" :disabled="!btnLoginEnabled">Sign up</b-button>
    </b-form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  mounted() {
    this.$bvModal.show("modal-register-scoped");
  },
  props: ["titleName"],
  data() {
    return {
      userID: "",
      userName: "",
      password: "",
      email: "",
      isPasswordOrUserNameError: false
    };
  },
  components: {},
  methods: {
    register() {
      //write login authencation logic here!
      axios
        .post(
          "http://lspssapple.asuscomm.com:81/api/user/account",
          {
            account: this.userID,
            password: this.password,
            name: this.userName,
            email: this.email
          },
          { headers: { "content-type": "application/json;charset=utf-8" } }
        )
        .then(res => {
          console.log(res.data);
          // this.isPasswordOrUserIDError = false;
          // this.$router.push("/");
          // localStorage.setItem("token", res.data);
        })
        .catch(err => {
          console.log(err);
          // this.isPasswordOrUserIDError = true;
        });
      console.log(this.userID, this.userName, this.password, this.email);
    }
  },
  computed: {
    btnLoginEnabled() {
      return this.userNameState && this.passwordState && this.userIDState;
    },
    userNameState() {
      return this.userName.length > 0;
    },
    passwordState() {
      return this.password.length >= 4;
    },
    userIDState() {
      return this.userID.length >= 4;
    },
    emailState() {
      return this.email.length > 0;
    },
    invalidUserNameFeedback() {
      if (this.userName.length > 0) {
        return "";
      } else {
        return "Please enter something";
      }
    },
    invalidUserIDFeedback() {
      if (this.userID.length > 0) {
        return "";
      } else if (this.userID.length > 0) {
        return "Enter at least 4 characters";
      } else {
        return "Please enter something";
      }
    },
    invalidEmailFeedback() {
      if (this.email.length > 4) {
        return "";
      } else if (this.email.length > 0) {
        return "Enter at least 4 characters";
      } else {
        return "Please enter something";
      }
    },
    invalidPasswordFeedback() {
      if (this.password.length > 4) {
        return "";
      } else if (this.userID.length > 0) {
        return "Enter at least 4 characters";
      } else {
        return "Please enter something";
      }
    },
    validFeedback() {
      // return this.state === true ? "Thank you" : "";
    }
  }
};
</script>
