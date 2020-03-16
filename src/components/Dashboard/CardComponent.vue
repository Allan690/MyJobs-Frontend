<template>
    <div class="main-pane__job-card">
        <div class="job-card__header" v-lazyload>
            <ImageSpinner class="image__spinner"/>
            <img :data-url="companyLogo"
                 alt="company-logo"
                 class="job-card__img"
            />
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

<style scoped lang="scss">
    @import "../../assets/css/ResponsiveMixins.scss";
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
        @include desktop {
            width: 80vw;
        }
        @include tablet {
            width: 80vw;
        }
        @include mobile {
            margin-left: 0px;
            width: 85vw;
        }
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
        &.loaded {
            .image__spinner {
                display: none;
                width: 100%;
            }
        }
        @include tablet {
            flex-wrap: wrap;
        }
        @include mobile {
            flex-wrap: wrap;
        }
    }
    .job-card__img {
        margin-top: 20px;
        margin-left: 20px;
        width: auto;
        height: 60px;
    }

    .job-card__title {
        text-align: center;
        margin-top: 22px;
        margin-left: 30px;
        font-size: 22px;
        font-weight: bold;
        width: 22.92vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        @include mobile {
            width: 22.92vw;
        }
    }

    .job-card__company {
        margin-left: 17.36vw;
        font-size: 14px;
        color: gray;
        @include mobile {
            margin-top: 10px;
            margin-left: 8.36vw;
        }
        @include tablet {
            margin-left: 32.36vw;
        }
    }

    .job-card__time {
        margin-left: auto;
        margin-top: 25px;
        @include mobile {
            margin-left: 30px;
        }
    }
    .jon-card__location {
        margin-left:17.36vw;
        margin-top: 5px;
        font-size: 11px;
        color: gray;
        @include mobile {
            margin-left: 8.36vw;
        }
        @include tablet {
            margin-left: 32.36vw;
        }
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
    import truncate from 'vue-truncate-collapsed';
    import ImageSpinner from './ImageSpinner';

    export default {
        name: 'card-component',
        data() {
            return {
                companyLogo: this.logo || require('@/assets/devjobs.png')
            }
        },
        components: {
            truncate, ImageSpinner
        },
        props: ['logo', 'title', 'company', 'location', 'time', 'description', 'howToApply']
    }
</script>
