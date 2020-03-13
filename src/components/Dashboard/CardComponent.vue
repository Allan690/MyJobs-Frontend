<template>
    <div class="main-pane__job-card">
        <div class="job-card__header">
            <img :src="logo" alt="company-logo" class="job-card__img"/>
            <div class="job-card__title"> {{ title }} </div>
            <div class="job-card__time"> {{ time }}</div>
        </div>
        <div class="job-card__company">{{ company }}</div>
        <div class="jon-card__location"> {{ location }}</div>
        <div class="job-card__body">
            <truncate
                    clamp="Show More"
                    :length="270"
                    less="Show less"
                    more="Show More"
                    type="html"
                    :text="description"></truncate>
        </div>
        <div class="job-card__footer">
            <div class="job-card__application-link">
                <span style="font-weight: bold"> How to apply: </span>
                <div class="application-link__how-to-apply" v-html="howToApply"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .main-pane__job-card {
        margin-top: 20px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        border-radius: 25px;
        width: 60vw;
        min-height: 40vh;
        background-color: #ffffff;
        -webkit-box-shadow: -1px 0px 26px -2px rgba(0,0,0,0.62);
        -moz-box-shadow: -1px 0px 26px -2px rgba(0,0,0,0.62);
        box-shadow: -1px 0px 26px -2px rgba(0,0,0,0.62);
    }

    .circle {
        width: 70px;
        height: 70px;
        margin-top: 20px;
        margin-left: 20px;
        border-radius: 50%;
    }

    .job-card__header {
        display: flex;
        flex-direction: row;
        width: 95%;
    }
    .job-card__img {
        margin-top: 20px;
        margin-left: 20px;
        width: 200px;
        height: 60px;
    }

    .job-card__title {
        margin-top: 22px;
        margin-left: 30px;
        font-size: 22px;
        font-weight: bold;
    }

    .job-card__company {
        margin-left: 250px;
        margin-top: -10px;
        font-size: 14px;
        color: gray;
    }

    .job-card__time {
        margin-left: auto;
        margin-top: 25px;
    }
    .jon-card__location {
        margin-left: 250px;
        margin-top: 5px;
        font-size: 11px;
        color: gray;
    }

    .job-card__body {
        margin-top: 20px;
        margin-left: 30px;
        width: 90%;
    }
    .job-card__footer {
        display: flex;
        flex-direction: row;
        width: 80%;
    }

    .job-card__application-link {
        margin-left: 32px;
        margin-top: 20px;
        overflow: hidden;
        width: 70vw;
    }

    .application-link__how-to-apply > p {
       display: block
    }
</style>

<script>
    import truncate from 'vue-truncate-collapsed'
    export default {
        name: 'card-component',
        components: {
            truncate
        },
        props: ['logo', 'title', 'company', 'location', 'time', 'description', 'howToApply']
    }
</script>
