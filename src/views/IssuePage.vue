<template>
    <div>
        <NavBar />
        <div>

        </div>
        <b-container fluid class="pl-5 pr-5">
            <b-form>
                <b-form-group id="input-group-issue">
                    <b-row>
                        <b-col cols="3">
                            <label for="input-number">問題單號</label>
                            <b-form-input id="input-number" v-model="issue.number" type="string" required>
                            </b-form-input>
                        </b-col>
                        <b-col cols="6">
                            <label for="input-summary">問題標題</label>
                            <b-form-input id="input-summary" v-model="issue.summary" type="string" required>
                            </b-form-input>
                        </b-col>
                        <b-col cols="3">
                            <label for="input-IssueCreateUser">創立者</label>
                            <b-form-input id="input-IssueCreateUser" v-model="issue.createUser" type="string" readonly>
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <label for="input-description">問題描述</label>
                            <b-form-textarea id="input-description" v-model="issue.description">
                            </b-form-textarea>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <label for="input-assignerId">指派者</label>
                            <b-form-input id="input-assignerId" v-model="issue.assignerId" type="string">
                            </b-form-input>
                        </b-col>
                        <b-col>
                            <label for="input-reporterId">回報者</label>
                            <b-form-input id="input-reporterId" v-model="issue.reporterId" type="string">
                            </b-form-input>
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import _ from 'lodash';
    import NavBar from '@/components/NavBar.vue';

    export default {
        name: 'IssuePage',
        components: {
            NavBar
        },
        data() {
            return {
                searchText: '',
                issue: {
                    number: '',
                    summary: '',
                    description: '',
                    assignerId: '',
                    reporterId: '',
                    estimatedTime: '',
                    estimatedStartTime: '',
                    estimatedEndTime: '',
                    actualStartTime: '',
                    actualEndTime: '',
                    resolveTime: '',
                    kindId: '',
                    serverityId: '',
                    statusId: '',
                    urgencyId: '',
                    createTime: '',
                    createUser: '',
                    modifyTime: '',
                    ModifyUser: ''
                },
            };
        },
        methods: {
            getIssue() {
                const vm = this;
                const api = 'http://lspssapple.asuscomm.com:81/api/issue/' + vm.$route.params.id;
                const token = localStorage.getItem('token');
                this.$http.get(
                    api,
                    { headers: { "Authorization": "Bearer " + token, "content-type": "application/json;charset=utf-8"}}
                ).
                then((response) => {
                    console.log(response)
                    if(response.status == 200){
                        vm.issue = response.data;
                    }
                }); 
            },
        },
        created() {
            this.getIssue();
        }
    }
</script>