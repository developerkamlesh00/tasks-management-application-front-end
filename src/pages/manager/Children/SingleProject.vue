<template>

    <div>
        <p>{{singleProject}}</p>
        </div>

</template>


<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';



export default{
 
  mounted() {
    const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    //console.log(url[pathLength])
    this.$store.dispatch('getProject', {value:url[pathLength]}) 
    
  },

methods:{
    ...mapActions(['getProject']),

  
},

computed:{
    ...mapGetters(['singleProject'])
}

}
</script>