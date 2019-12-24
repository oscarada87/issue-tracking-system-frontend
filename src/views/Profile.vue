<template>
  <div>
    <NavBar />
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-card title="基本資料" class="mt-5">
            <b-table striped hover :items="user" :fields="fields"></b-table>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  data() {
    return {
      user: [],
      CharactorOptions: [
        { charactorId: 0, name: "未配置" },
        { charactorId: 1, name: "系統管理員" },
        { charactorId: 2, name: "一般使用者" }
      ],
      fields: [
        {
          key: "name",
          label: "名稱"
        },
        {
          key: "account",
          label: "帳號"
        },
        {
          key: "eMail",
          label: "信箱"
        },
        {
          key: "charactorId",
          label: "權限",
          formatter: (value /*, key, item*/) => {
            return value
              ? this.CharactorOptions[value].name
              : this.CharactorOptions[0].name;
          }
        }
      ]
    };
  },
  components: { NavBar },
  methods: {
    async GetUser() {
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
      this.user = [res.data];
      console.log(this.user);
    }
  },
  mounted() {
    this.GetUser();
  }
};
</script>