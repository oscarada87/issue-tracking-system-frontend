<template>
  <div>
    <NavBar />
    <b-container fluid class="mt-3">
      <b-card>
        <!-- User Interface controls -->
        <b-row class="mb-5">
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Sort"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="sortBySelect"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-select
                  v-model="sortBy"
                  id="sortBySelect"
                  :options="sortOptions"
                  class="w-75"
                >
                  <template v-slot:first>
                    <option value>-- none --</option>
                  </template>
                </b-form-select>
                <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
                  <option :value="false">Asc</option>
                  <option :value="true">Desc</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <!-- User Interface controls END -->
          <!-- 初始排序方式 -->
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Initial sort"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="initialSortSelect"
              class="mb-0"
            >
              <b-form-select
                v-model="sortDirection"
                id="initialSortSelect"
                size="sm"
                :options="['asc', 'desc', 'name']"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <!-- 初始排序方式 END-->

          <!-- 輸入搜尋 -->
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Filter"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <!-- 輸入搜尋 END -->

          <!-- 勾選要過濾的欄位 -->
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Filter On"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              description="Leave all unchecked to filter on all data"
              class="mb-0"
            >
              <b-form-checkbox-group v-model="filterOn" class="mt-1">
                <b-form-checkbox value="name">使用者名稱</b-form-checkbox>
                <b-form-checkbox value="account">使用者帳號</b-form-checkbox>
                <b-form-checkbox value="isActive">啟用狀態</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <!-- 勾選要過濾的欄位 END -->

          <!-- 設定每頁顯示數量 下拉選單-->
          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="Per page"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              label-for="perPageSelect"
              class="mb-0"
            >
              <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
            </b-form-group>
          </b-col>
          <!-- 設定每頁顯示數量 END-->

          <!-- 選擇頁數按鈕 -->
          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
          <!-- 選擇頁數按鈕 END -->
        </b-row>

        <!-- Main table element -->
        <b-table
          show-empty
          small
          stacked="md"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
          <template v-slot:cell(name)="row">{{ row.value }}</template>

          <template v-slot:cell(actions)="row">
            <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">編輯</b-button>
            <b-button
              size="sm"
              @click="row.toggleDetails"
            >{{ row.detailsShowing ? '隱藏' : '顯示' }}詳細</b-button>
          </template>

          <template v-slot:row-details="row">
            <b-card>
              <ul class="text-left">
                <!-- <li v-for="(value, key) in row.item" :key="key">{{ row.item['isActive'] }}</li> -->
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
          </template>
        </b-table>

        <!-- Info modal -->
        <!-- :title="infoModal.title" -->
        <b-modal
          :id="infoModal.id"
          title="編輯"
          ok-only
          @hide="resetInfoModal"
          @show="resetInfoModal"
          centered
        >
          <!-- <pre>{{ infoModal.content }}</pre> -->
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group id="name-group" label="使用者名稱" label-for="name" description="修改使用者名稱">
              <b-form-input id="name" v-model="newData.name" required />
            </b-form-group>
            <b-form-group id="Email-group" label="信箱" label-for="Email" description="修改信箱">
              <b-form-input id="Email" v-model="newData.Email" required />
            </b-form-group>
            <b-form-group
              id="CharactorId-group"
              label="Charactor"
              label-for="CharactorId"
              description="Change Charactor"
            >
              <!-- <b-form-input id="CharactorId" v-model="newData.CharactorId" required /> -->
              <b-form-select
                v-model="newData.CharactorId"
                :options="CharactorOptions"
                class="mb-3"
                value-field="CharactorId"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-select>
            </b-form-group>
            <b-form-group
              id="LineId-group"
              label="LineId"
              label-for="LineId"
              description="修改 LineId"
            >
              <b-form-input id="LineId" v-model="newData.LineId" required />
            </b-form-group>
          </form>
        </b-modal>
        <!-- Info modal END-->
      </b-card>
    </b-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  data() {
    return {
      newData: {
        name: "",
        account: "",
        password: "",
        Email: "",
        CharactorId: "",
        LineId: ""
      },
      CharactorSelect: 1,
      items: [
        {
          CharactorId: 1,
          isActive: true,
          password: 40,
          account: "Dickerson",
          name: "Macdon"
        },
        {
          CharactorId: 1,
          isActive: false,
          password: 21,
          account: "Larsen",
          name: "Shaw"
        },
        {
          CharactorId: 1,
          isActive: false,
          password: 9,
          account: "Mini",
          name: "Navarro"
        },
        /*_rowVariant: "success"*/
        {
          CharactorId: 2,
          isActive: false,
          password: 89,
          account: "Gene",
          name: "Wils"
        },
        {
          CharactorId: 2,
          isActive: true,
          password: 38,
          account: "Jami",
          name: "Carney"
        },
        {
          CharactorId: 2,
          isActive: false,
          password: 27,
          account: "Essie",
          name: "Dunlap"
        },
        {
          CharactorId: 2,
          isActive: true,
          password: 40,
          account: "Thor",
          name: "Macd"
        },
        {
          CharactorId: 2,
          isActive: true,
          password: 87,
          account: "Larsen",
          name: "Shaw"
        },
        /*_cellVariants: { password: "danger", isActive: "warning" }*/
        {
          CharactorId: 3,
          isActive: false,
          password: 26,
          account: "Mitzi",
          name: "Navarro"
        },
        {
          CharactorId: 3,
          isActive: false,
          password: 22,
          account: "Genevieve",
          name: "Wilson"
        },
        {
          CharactorId: 3,
          isActive: true,
          password: 38,
          account: "John",
          name: "Carney"
        },
        {
          CharactorId: 3,
          isActive: false,
          password: 29,
          account: "Dick",
          name: "Dunlap"
        }
      ],
      fields: [
        {
          key: "name",
          label: "使用者名稱",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "account",
          label: "使用者帳號",
          sortable: true,
          class: "text-center"
        },
        {
          key: "password",
          label: "使用者密碼",
          sortable: true,
          sortDirection: "desc",
          class: "text-left"
        },
        {
          key: "CharactorId",
          label: "使用者權限",
          sortable: true,
          sortDirection: "desc",
          class: "text-left",
          formatter: (value, key, item) => {
            return this.CharactorOptions[value - 1].name;
            //  value ? "Yes" : "No";
          }
        },
        {
          key: "isActive",
          label: "啟用狀態",
          formatter: (value, key, item) => {
            return value ? "Yes" : "No";
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        { key: "actions", label: "操作" }
      ],
      CharactorOptions: [
        { CharactorId: 1, name: "系統管理員" },
        { CharactorId: 2, name: "開發人員、測試人員" },
        { CharactorId: 3, name: "一般使用者" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      }
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  components: {
    NavBar
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    info(item, index, button) {
      this.newData.name = item.name;
      this.infoModal.title = item.name;
      this.newData.CharactorId = item.CharactorId
      // this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
      newData = {
        name: "",
        account: "",
        password: "",
        Email: "",
        CharactorId: "",
        LineId: ""
      };
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>