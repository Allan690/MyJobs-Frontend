import { mount } from "@vue/test-utils";
import Vue from 'vue';
import LazyloadDirective from "@/directives/LazyloadDirective";
import CardComponent from "@/components/Dashboard/CardComponent";

Vue.directive("lazyload", LazyloadDirective);

describe('CardComponent', () => {
    let wrapper;
    beforeAll(() => {
       wrapper = mount(CardComponent, {
            propsData: {
                logo: '../src/assets/devjobs.png',
                description: '',
                title: 'test',
                company: 'test-company',
                location: 'test-location',
                howToApply: 'test-directions'
            }
        });
    });
    it('is a Vue instance', () => {
        console.log(wrapper.text())
        expect(wrapper.isVueInstance()).toBeTruthy()
    });

    it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot()
    });
});
