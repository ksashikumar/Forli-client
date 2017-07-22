import Ember from 'ember';

export default Ember.Component.extend({  
    tagList: ['JavaScript', 'HTML', 'CSS'],
    init() {
        this._super(...arguments);
        window.scrollTo(0,0);
    }
});
