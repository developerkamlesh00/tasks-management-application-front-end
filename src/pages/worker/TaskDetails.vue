<template>
    <base-card class="card1" style="width:80%;max-width:fit-content;" v-if="getTask">
    <div class="card1">
        <h2 class="text-center">Task: <b>{{ getTask.title }}</b></h2>
        <div class="text-end text-primary">Task ID: #{{ getTask.id }}</div>
        <div class="mb-2">
        <em>Description: {{ getTask.description }}</em></div>
        <div class="font-monospace text-end">
            <div>Assigned at: {{ getTask.assigned_at }}</div>
            <div>Estimated Deadline: {{ getTask.estimated_deadline }}</div>
            <div>Project Id: {{ getTask.project_id }}</div>
            <!-- <div>Status: {{ status[getTask.status_id] }}</div> -->
            <div>Review Passed: {{ getTask.review_passed == 0 ? 'No' : 'Yes' }}</div>
        </div>
    </div>
    </base-card >
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content color_pink">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Comment</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="editComment(edit_comment_id)">
                    <div class="modal-body">
                        <label for="body" class="form-label">Comment Body</label>
                        <br/>
                        <input type="text" v-model="edit_comment_body" id="body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="mt-1 mb-5">
        <div class="d-flex justify-content-center row">
            <div class="d-flex flex-column col-md-8">
                <div class="coment-bottom py-2">
                    <form @submit.prevent="createComment" class="d-flex flex-row add-comment-section mt-4 mb-4"><img
                            class="img-fluid img-responsive rounded-circle me-2" src="https://i.imgur.com/qdiP4DB.jpg"
                            width="38">
                        <input type="text" class="form-control mx-3" placeholder="Add comment" v-model="comment_body"
                            required>
                        <button type="submit" class="btn btn-primary">Comment</button>
                    </form>
                    <div class="commented-section mt-1" v-for="comment in getComments" :key="comment.id">

                        <base-card>
                            <div class="commented-user">
                                <div class="me-2 fs-3 d-inline">{{ comment.user.name }}
                                </div>
                                <span v-if="comment.user_id == userId">
                                    <button data-bs-toggle="modal" data-bs-target="#editModal" class="btn text-warning"
                                    @click="setEditFields(comment.body, comment.id)"><i class="bi bi-pencil-square"></i> Edit</button>
                                    <button class="btn text-danger" @click="deleteComment(comment.id)"><i class="bi bi-trash3"></i> Delete</button>
                                </span>
                            </div>
                            <div class="comment-text-sm"><span>{{ comment.body }}</span></div>
                            <div class="text-end fs-6 ms-4 px-2 rounded-3 color_pink bg-light">
                            
                                {{ formattedDate(comment.created_at) }}</div>
                        </base-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- 
// want to display a task assigned to a worker along with the comments made on this task. It should perform crud operations on task. When a user clicks on a new comment a pop up modal should be display with the comment_body field and comment button. The task list should be displayed such that all tasks written by this worker should be displayed on right and by other users on the left side like a chat system. -->
<script>
import formatDate from '@/utils/formatDate'
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
export default {
    props: {
        id: {
            required: true
        }
    },
    data() {
        return {
            task: null,
            comments: [],
            comment_body: '',
            edit_comment_body: '',
            edit_comment_id: null,
        }
    },
    computed: {
        ...mapGetters(['userId']),
        ...mapGetters('worker', ['getTaskById', 'getTasks', 'status', 'getComments']),
        getTask() {
            return this.getTasks.find(t => t.id == this.id);
        },
    },
    methods: {
        ...mapActions('worker', ['fetchTaskComments']),
        formattedDate(d) {
            return formatDate(d);
        },
        async createComment() {
            console.log({
                'user_id': this.userId,
                'task_id': this.id,
                'body': this.comment_body
            })
            await axios.post(
                `http://localhost:8000/api/comments`, {
                'user_id': this.userId,
                'task_id': this.id,
                'body': this.comment_body
            }
            )
            this.comment_body = '';
            this.fetchTaskComments({ "task_id": this.id })
        },
        async editComment(comment_id) {
            await axios.put(
                `http://localhost:8000/api/comments/${comment_id}`, {
                'body': this.edit_comment_body
            })
            this.edit_comment_body = '';
            this.edit_comment_id = null;
            this.fetchTaskComments({ "task_id": this.id })
        },
        async deleteComment(comment_id) {
            console.log(comment_id)
            await axios.delete(
                `http://localhost:8000/api/comments/${comment_id}`)
            await this.fetchTaskComments({ "task_id": this.id })
        },
        setEditFields(body, id) {
            this.edit_comment_body = body;
            this.edit_comment_id = id;
        }

    },
    mounted() {
        this.$store.dispatch('worker/fetchTaskComments', { "task_id": this.id })
    }

}
</script>

<style scoped>
.bdge {
    height: 21px;
    background-color: orange;
    color: #fff;
    font-size: 11px;
    padding: 8px;
    border-radius: 4px;
    line-height: 3px;
}

.comments {
    text-decoration: underline;
    text-underline-position: under;
    cursor: pointer;
}

.dot {
    height: 7px;
    width: 7px;
    margin-top: 3px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}

.hit-voting:hover {
    color: blue;
}

.hit-voting {
    cursor: pointer;
}
</style>