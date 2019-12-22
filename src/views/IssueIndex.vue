<template>
    <div>
        <NavBar />
        <div class="container mt-4 ml-0">
            <div class="row justify-content-start">
                <div class="col col-auto">
                    <input class="form-control searchbar" type="text" placeholder="請輸入關鍵字" v-model="searchText">
                </div>
                <div class="col col-auto ml-0">
                    <button class="btn btn-primary" @click.prevent="clearTempIssue(); openDeleteModal()">新增問題</button>
                </div>
            </div>
        </div>
        <table class="table mt-4 table-striped">
            <thead>
                <th style="width: 3%" scope="col">查看</th>
                <th style="width: 10%" scope="col">代號</th>
                <th style="width: 10%" scope="col">標題</th>
                <th style="width: 5%; min-width: 105px" scope="col">指派者</th>
                <th style="width: 5%; min-width: 105px" scope="col">回報者</th>
                <th style="width: 5%" scope="col">狀態</th>
                <th style="width: 7%" scope="col">創立於</th>
                <th style="width: 7%" scope="col">更新於</th>
                <th style="width: 3%" scope="col">刪除</th>
            </thead>
            <tbody>
                <tr v-for="(item, id) in handleIssues" :key="id">
                    <td class="align-middle">
                        <button type="button" class="btn btn-outline-secondary btn-sm"
                            @click.prevent="tempIssue = item; openEditModal()">
                            <font-awesome-icon icon="edit" />
                        </button>
                    </td>
                    <td class="align-middle">
                        {{ item.IssueNumber }}
                    </td>
                    <td class="align-middle">
                        {{ item.IssueSummary }}
                    </td>
                    <td class="align-middle">
                        {{ item.Assignee }}
                    </td>
                    <td class="align-middle">
                        {{ item.Reporter }}
                    </td>
                    <td class="align-middle">
                        {{ item.Status }}
                    </td>
                    <td class="align-middle">
                        {{ item.CreateTime }}
                    </td>
                    <td class="align-middle">
                        {{ item.ModifyTime }}
                    </td>
                    <td class="align-middle">
                        <button type="button" class="btn btn-outline-danger btn-sm"
                            @click.prevent="tempIssue = item; openDeleteModal()">
                            <font-awesome-icon icon="trash-alt" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Add Issue Modal -->
        <b-modal id="addIssueModal" title="新增問題" @show="clearTempIssue" @ok="createIssue">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="form-group">
                            <label for="title">問題名稱</label>
                            <input type="text" class="form-control" id="title" placeholder="" required
                                v-model="tempIssue.IssueSummary">
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="origin_price">指派人</label>
                                <input type="text" class="form-control" id="origin_price" placeholder=""
                                    v-model="tempIssue.Assignee">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">回報人</label>
                                <input type="text" class="form-control" id="price" placeholder=""
                                    v-model="tempIssue.Repoter">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="description">問題描述</label>
                            <textarea type="text" class="form-control" id="description" placeholder=""
                                v-model="tempIssue.Description"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'
    import _ from 'lodash';
    import NavBar from '@/components/NavBar.vue';
    // import FilterSideBar from '@/components/FilterSideBar.vue';

    export default {
        name: 'IssueIndex',
        components: {
            NavBar
            // FilterSideBar
        },
        data() {
            return {
                searchText: '',
                createModal: false,
                tempIssue: {
                    IssueNumber: '',
                    IssueSummary: '',
                    Assignee: '',
                    Reporter: '',
                    Status: '',
                    CreateUser: '',
                    Description: ''
                }
            };
        },
        computed: {
            handleIssues() {
                const vm = this;
                return _.filter(vm.beverages, function (beverage) {
                    return beverage.Beverage_Name.match(vm.searchText);
                });
            },
        },
        methods: {
            openAddModal() {
                this.$bvModal.show('addIssueModal');
            },
            closeAddModal() {
                this.$bvModal.hide('addIssueModal');
            },
            openDeleteModal() {
                this.$bvModal.msgBoxConfirm('確定刪除?',{
                    okTitle: '刪除',
                    cancelTitle: '取消',
                    centered: true
                })
                .then(value => {
                    if (value){
                        //delete issue
                    }
                })
            },
            clearTempIssue() {
                const emptyIssue = {
                    IssueNumber: '',
                    IssueSummary: '',
                    Assignee: '',
                    Reporter: '',
                    Status: '',
                    CreateUser: '',
                    Description: ''
                };
                this.tempIssue = emptyIssue;
            },
            createIssue(){
                //create issue
            }
        }
    }
</script>