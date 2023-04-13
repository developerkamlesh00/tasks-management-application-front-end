<template>
    <base-card>
        <h2>{{ getTask.title }}</h2>
        <div>Task ID: #{{ getTask.id }}</div>
        <p>{{ getTask.description }}</p>
        <div>{{ getTask.assigned_at }}</div>
        <div>Estimated Deadline: {{ getTask.estimated_deadline }}</div>
        <div>Project Id: {{ getTask.project_id }}</div>
        <div>Project Name: {{ getTask.project_id }}</div>
        <div>Review Passed: {{ getTask.review_passed == 0 ? 'No' : 'Yes' }}</div>
        <!-- <div>{{ status[getTask.status_id] }}</div> -->

    </base-card>
    <base-card>
        <div v-for="comment in getComments" :key="comment.id">{{ comment }}</div>
    </base-card>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
        Add Comment
    </button>

    <!-- Modal -->
    <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="commentModalLabel">New Comment</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-content">
                <form @submit.prevent="createComment">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">Comment body</label>
                        <input type="text" class="form-control" v-model="comment_body" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- 
// want to display a task assigned to a worker along with the comments made on this task. It should perform crud operations on task. When a user clicks on a new comment a pop up modal should be display with the comment_body field and comment button. The task list should be displayed such that all tasks written by this worker should be displayed on right and by other users on the left side like a chat system. -->
<script>
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
            comment_body:'',
        }
    },
    computed: {
        ...mapGetters(['userId']),
        ...mapGetters('worker', ['getTaskById', 'getTasks', 'status', 'getComments']),
        getTask() {
            return this.getTasks.find(t => t.id == this.id);
        }
    },
    method: {
        ...mapActions('worker', ['fetchTaskComments']),
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
            this.comment_body='';
            this.fetchTaskComments({ "task_id": this.id })
            return
        }
    },
    mounted() {
        this.$store.dispatch('worker/fetchTaskComments', { "task_id": this.id })
    }

}
</script>

