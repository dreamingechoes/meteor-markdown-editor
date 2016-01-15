if (Meteor.isClient) {
  var markdown = new markdownit();

  Template.registerHelper('instance', function() {
    return Template.instance();
  });

  Template.markdown.onCreated(function() {
    var template = this;

    template.input = new ReactiveVar('');
    template.output = new ReactiveVar('');

    template.autorun(() => {
      var input = template.input.get();
      var output = markdown.render(input);
      template.output.set(output);
    });
  });

  Template.markdown.events({
    'keyup textarea': function (event, template) {
      var input = template.$(event.currentTarget).val();
      template.input.set(input);
    }
  });
}
