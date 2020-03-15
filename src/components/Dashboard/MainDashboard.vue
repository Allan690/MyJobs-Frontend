<template>
  <div id="container">
  <div class="container__app-logo-container">
    <img src="../../assets/job.svg" alt="AppLogo" class="container__app-logo"/>
    <span class="container__my-jobs"> MyJobs</span>
  </div>
    <img src="../../assets/menu.svg"
         alt="menu"
         class="container__menu-icon"
         v-on:click="toggleMenu()"
    />
    <div class="container__side-pane">
      <div class="container__logo">
        <img src="../../assets/devjobs.png" alt="logo" class="container__logo__img"/>
      </div>
      <label class="container__location-label"> Location:
        <a-input class="location-label__input"
                placeholder="Enter job location..."
                v-model.lazy="location"
                @change="fetchJobs()"
        />
      </label>
      <label class="container__language-label"> Language:
        <a-input class="language-label__input"
                 placeholder="Enter programming language..."
                 v-model.lazy="language"
                 @change="fetchJobs()"
        />
      </label>
      <label class="container__latitude-label"> Latitude:
       <a-input class="latitude__input"
                placeholder="Enter the latitude"
                v-model.lazy="latitude"
                @change="fetchJobs()"
       />
      </label>
      <label class="container__longitude-label"> Longitude:
        <a-input class="longitude__input"
                 placeholder="Enter the longitude..."
                 v-model.lazy="longitude"
                 @change="fetchJobs()"
        />
      </label>
      <a-button type="primary"  class="container__submit-btn">Find Job</a-button>
    </div>
    <div class="container__main-pane">

      <div v-for="job in jobsArray" :key="job.id" class="container__card-container">
       <a-skeleton active v-if="loading"> </a-skeleton>
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

  %shared-input-box-props {
    display: flex;
    margin-top: 10px;
    width: 80%;
    height: 40px;
    text-indent: 13px;
    font-size: 14px;
    outline: none;
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
  .location-label__input {
    @extend %shared-input-box-props;
  }
  .container__logo {
    margin-left: 20px;
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
  }
  .container__logo__img {
    width: 60px;
    height: 60px;
  }
  %shared-label-props {
    margin-left: 20px;
    margin-top: 20px;
    font-weight: bold;
  }
  .container__location-label {
    @extend %shared-label-props;
  }
  .container__language-label {
    @extend %shared-label-props;
  }
  .language-label__input {
   @extend %shared-input-box-props;
  }
  .container__latitude-label {
    @extend %shared-label-props;
  }
  .latitude__input {
    @extend %shared-input-box-props;
  }
  .container__longitude-label {
    @extend %shared-label-props;
  }
  .longitude__input {
    @extend %shared-input-box-props;
  }
  .container__submit-btn  {
    margin-top: 40px;
    margin-left: 40px;
    font-weight: bold;
    font-size: 16px;
    height: 40px;
    width: 60%;
    text-align: center;
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
    font-size: 30px;
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


</style>

<script>
  import CardComponent from "@/components/Dashboard/CardComponent";
  import validator from 'validator';
  import axios from 'axios';

  export default {
    name: 'main-dashboard',
    components: {
      CardComponent
    },
    data() {
      return {
         jobsArray: [],
         loading: false,
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
         let jobsUrl = `https://jobs.github.com/positions.json?description=${this.language}&full_time=true&location=${this.location}`
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
      toggleMenu() {
        const sidePane = document.querySelector('.container__side-pane');
        if(sidePane.style.display === 'flex') {
          return sidePane.style.display = 'none'
        }
        return sidePane.style.display = 'flex'
      }
    },
     async mounted() {
       this.loading = true;
       await this.fetchJobs().then(() => this.loading = false);
    }
  }

</script>
