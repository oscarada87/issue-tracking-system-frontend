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
                            <label for="input-IssueNumber">問題單號</label>
                            <b-form-input id="input-IssueNumber" v-model="issue.IssueNumber" type="string" readonly>
                            </b-form-input>
                        </b-col>
                        <b-col cols="6">
                            <label for="input-IssueSummary">問題標題</label>
                            <b-form-input id="input-IssueSummary" v-model="issue.IssueSummary" type="string" required>
                            </b-form-input>
                        </b-col>
                        <b-col cols="3">
                            <label for="input-IssueCreateUser">創立者</label>
                            <b-form-input id="input-IssueCreateUser" v-model="issue.CreateUser" type="string" readonly>
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <label for="input-Description">問題描述</label>
                            <b-form-textarea id="input-Description" v-model="issue.Description">
                            </b-form-textarea>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <label for="input-AssigneeId">指派者</label>
                            <b-form-input id="input-AssigneeId" v-model="issue.AssigneeId" type="string">
                            </b-form-input>
                        </b-col>
                        <b-col>
                            <label for="input-ReporterId">回報者</label>
                            <b-form-input id="input-ReporterId" v-model="issueReporterId" type="string">
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
                    IssueNumber: '123',
                    IssueSummary: '',
                    Description: '',
                    AssigneeId: '',
                    ReporterId: '',
                    Estimated: '',
                    EstimatedStartTime: '',
                    EstimatedEndTime: '',
                    ActualStartTime: '',
                    ActualEndTime: '',
                    KindID: '',
                    ServerityId: '',
                    StatusId: '',
                    UrgencyId: '',
                    ProjectId: '',
                    CreateUser: '',
                    ModifyUser: ''
                },
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
            editIssue() {
                //create issue
            }
        }
    }
</script>