<template>
  <main>
    <div class="admin-view">
      <h1 class="admin-dashboard">Admin Dashboard</h1>
      <div class="card-container">
        <BaseCard :expanded="true" class="expanded-card">
          <div class="left-column">
            <BaseButton class="left-button" @click="toggleOrganizations">Show Organizations</BaseButton>
            <BaseButton class="left-button" @click="toggleUsers">Show Users</BaseButton>
          </div>
          <div class="right-column">
            <div v-if="showOrganizations">
              <h2>Organizations</h2>
              <p>This is the content for organizations.</p>
            </div>
            <div v-if="showUsers">
              <h2>Users</h2>
              <p>This is the content for users.</p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </main>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';

export default {
  components: {
    BaseButton,
    BaseCard,
  },
  data() {
    return {
      showOrganizations: false,
      showUsers: false,
    }
  },
  methods: {
    toggleOrganizations() {
      this.showOrganizations = !this.showOrganizations;
      if (this.showOrganizations) {
        this.showUsers = false;
      }
    },
    toggleUsers() {
      this.showUsers = !this.showUsers;
      if (this.showUsers) {
        this.showOrganizations = false;
      }
    },
  },
};
</script>

<style scoped>
.admin-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.admin-dashboard {
  font-size: 3rem;
  margin-top: 20px;
}

.card-container {
  margin-top: 0px;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
}

.expanded-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.left-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  /* Set the width of the left column to 50% */
  width: 50%;
}

.left-button {
  margin-bottom: 10px;
  /* Set the width of the left button to 100% */
  width: 100%;
}

.right-column {
  width: 100%;
}

.right-column div {
  margin-top: 20px;
}

@media screen and (min-width: 768px) {
  .card-container {
    margin-top: 0px;
    max-width: 1200px;
  }

  .expanded-card {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 40px;
  }

  .left-column {
    margin-right: 50px;
    /* Set the width of the left column to auto */
    width: auto;
  }

  .left-button {
    margin-bottom: 10px;
    /* Set the width of the left button to 100% */
    width: 100%;
  }

  .right-column {
    width: 60%;
  }

  /* Increase card size based on screen size */
  .card-container {
    max-width: 90vw;
  }

  .expanded-card {
    max-width: 1200px;
  }
}
</style>
