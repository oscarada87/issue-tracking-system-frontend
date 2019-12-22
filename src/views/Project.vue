<template>
  <div class="project">
    <NavBar />
    <Modal :createProject="createProject" @inputName="getName" />

    <b-container fluid class="mt-3 bv-example-row bv-example-row-flex-cols">
      <b-row>
        <b-col cols="3">
          <h1>My Projects</h1>
        </b-col>
        <b-col />
      </b-row>

      <b-row class="mt-3">
        <b-col cols="1"></b-col>
        <b-col cols="6">
          <ProjectsTable />
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from "@/components/NavBar";
import Modal from "@/components/ProjectModal";
import ProjectsTable from "@/components/ProjectsTable";

export default {
  name: "project",
  data() {
    return {
      description: "",
      name: "",
      state: ""
    };
  },
  methods: {
    createProject() {
      this.$bvModal.hide("modal-scoped");
    },
    getName(name) {
      console.log(name);
    }
  },
  components: {
    NavBar,
    Modal,
    ProjectsTable
  }
};
</script>
