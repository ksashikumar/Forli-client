import Ember from 'ember';

const {
    computed
} = Ember;

export default Ember.Component.extend({
    target: '_self',
    formattedTag: computed('discussion.tags', function() {
        let tags = this.get('discussion.tags');
        return tags.length > 0 ? 'Also Tagged as "'+tags[0].name +'"' : "Similar Questions";
    })
});
