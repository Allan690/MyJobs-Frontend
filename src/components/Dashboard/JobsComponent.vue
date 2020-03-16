<template>
    <div class="container__jobs">
        <div class="container__logo">
            <img src="../../assets/devjobs.png" alt="logo" class="container__logo__img"/>
        </div>
        <label class="container__location-label"> Location:
            <a-input class="location-label__input"
                     placeholder="Enter job location..."
                     v-model.lazy="location"
                     @change="$emit('fetch', {location: location})"
            />
        </label>
        <label class="container__language-label"> Language:
            <a-input class="language-label__input"
                     placeholder="Enter programming language..."
                     v-model.lazy="language"
                     @change="$emit('fetch', {language: language})"
            />
        </label>
        <label class="container__latitude-label"> Latitude:
            <a-input class="latitude__input"
                     placeholder="Enter the latitude"
                     v-model.lazy="latitude"
                     @change="$emit('fetch', {latitude: latitude})"
            />
        </label>
        <label class="container__longitude-label"> Longitude:
            <a-input class="longitude__input"
                     placeholder="Enter the longitude..."
                     v-model.lazy="longitude"
                     @change="$emit('fetch', {longitude: longitude})"
            />
        </label>
        <a-button type="primary"  class="container__submit-btn">Find Job</a-button>
    </div>
</template>

<style scoped lang="scss">
    .container__jobs {
        display: flex;
        flex-direction: column
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

    %shared-input-box-props {
        display: flex;
        margin-top: 10px;
        width: 80%;
        height: 40px;
        text-indent: 13px;
        font-size: 14px;
        outline: none;
    }
    %shared-label-props {
        margin-left: 20px;
        margin-top: 20px;
        font-weight: bold;
    }
    .location-label__input {
        @extend %shared-input-box-props;
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
</style>

<script>
    export default {
        name: 'jobs-component',
        data() {
            return {
                location: '',
                longitude: '',
                latitude: '',
                language: '',
            }
        }
    }
</script>
