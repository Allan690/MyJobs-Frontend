<template>
  <div id="container">
  <div class="container__app-logo-container">
    <img src="../../assets/job.svg" alt="AppLogo" class="container__app-logo"/>
    <span class="container__my-jobs"> Developer Jobs</span>
  </div>
    <img src="../../assets/menu.svg"
         alt="menu"
         class="container__menu-icon"
         v-on:click="showDrawer()"
    />
    <a-drawer title="Developer Jobs"
              placement="left"
              :closable="false"
              @close="onClose"
              :visible="visible">
      <jobs-component @fetch="filterJobs"> </jobs-component>
    </a-drawer>
    <div class="container__side-pane">
      <jobs-component @fetch="filterJobs"> </jobs-component>
    </div>
    <div class="container__main-pane">
      <div class="spinner" v-if="loading">
        <a-spin size="large"/>
      </div>
      <div v-for="job in jobsArray" :key="job.id" class="container__card-container">
        <card-component
         :logo="job.company_logo"
         :title="job.title"
         :company="job.company"
         :location="job.location"
         :description="job.description"
         :time="job.type"
         :howToApply="job.how_to_apply"
         >
        </card-component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "../../assets/css/ResponsiveMixins";
  #container {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    width: 100vw;
  }

  %shared-flex-container-properties {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    border-radius: 15px;
    background-color: #ffffff;
  }

  .container__side-pane {
    @extend %shared-flex-container-properties;
    position: fixed;
    margin-left: 30px;
    margin-top: 200px;
    min-height: 580px;
    width: 350px;
    background: #c4c4c4;
    @include desktop() {
      display: none;
    }
    @include tablet {
      display: none;
    }
    @include mobile {
      display: none;
    }
  }
  .container__main-pane {
    @extend %shared-flex-container-properties;
    margin-left: 30%;
    width: 70vw;
    border-radius: 0;
    height: 100vh;
    @include desktop {
     margin-left: 8%;
      width: 70vw;
    }
    @include tablet {
      margin-left: 8%;
      width: 70vw;
    }
    @include mobile {
      margin-left: 8%;
      width: 100vw;
    }
  }
  .container__input-search {
    position: fixed;
    width: 400px;
    margin-left: 40px;
    margin-bottom: 30px;
  }

  .container__menu-icon {
    position: fixed;
    margin-left: 40px;
    margin-top: 40px;
    &:hover {
      cursor: pointer;
    }
    @include desktop-mid {
      display: none;
    }
    @include desktop-large {
      display: none;
    }
  }

  .container__card-container {
    margin-top: 40px;
  }
  .container__app-logo {
    display: flex;
    position: fixed;
    width: 150px;
    margin-left: 5%;
    margin-top: 10px;
    height: 150px;
  }
  .container__my-jobs {
    font-family: 'Ribeye', cursive;
    display: flex;
    position: fixed;
    margin-left: 16%;
    margin-right: 20px;
    font-size: 24px;
    margin-top: 80px;
  }
  .container__app-logo-container {
    @include tablet {
      display: none;
    }
    @include mobile {
      display: none;
    }
    @include desktop {
      display: none;
    }
  }
  .spinner {
    text-align: center;
    margin-top: 50vh;
  }


</style>

<script>
  import CardComponent from "@/components/Dashboard/CardComponent";
  import JobsComponent from "@/components/Dashboard/JobsComponent";
  import validator from 'validator';
  import axios from 'axios';

  export default {
    name: 'main-dashboard',
    components: {
      CardComponent, JobsComponent
    },
    data() {
      return {
         jobsArray: [],
         loading: false,
         visible: false,
         location: '',
         longitude: '',
         latitude: '',
         language: ''
        }
    },
    methods: {
      async fetchJobs() {
       try {
         const herokuUrl = 'https://cors-anywhere.herokuapp.com';
         let jobsUrl = `https://jobs.github.com/positions.json?description=${this.language}&full_time=true&location=${this.location}`;
         if(!validator.isEmpty(this.longitude) && !validator.isEmpty(this.latitude)) {
           jobsUrl = `https://jobs.github.com/positions.json?description=${this.language}&full_time=true&long=${this.longitude}&lat=${this.latitude}`
         }
          const results = await axios.request({
            method: 'get',
            baseURL: `${herokuUrl}/${jobsUrl}`
          });
          const { data } = results;
          this.jobsArray = data;
       }
       catch(error) {
         this.loading = false;
         console.error(error)
       }
      },
      onClose() {
        this.visible = false;
      },
      showDrawer() {
        this.visible = true
      },
      filterJobs: function (event) {
        const eventProps = ['location', 'language', 'longitude', 'latitude'];
        eventProps.forEach((prop) => {
           if(Object.prototype.hasOwnProperty.call(event, prop)) {
             const eventProp = event[prop];
             this.$set(this, prop, eventProp);
             this.fetchJobs();
           }
        })
      }
    },
     async mounted() {
       this.loading = true;
       await this.fetchJobs().then(() => this.loading = false);
    }
  }

</script>
