import { chai } from 'meteor/practicalmeteor:chai';
import { $ } from 'meteor/jquery';


describe('Lists_show_page', function () {
  beforeEach(function () {
  });

  afterEach(function () {
  });

  it('renders correctly with simple data2', function () {
      chai.assert.equal(1, 1);
  });

});

if (Meteor.isClient) {
  describe('data available when routed', () => {

      it('renders the correct list when routed to', (done) => {
        $.ajax({
            method: 'get',
            url: '/case-insensitive-method-1',
            contentType: 'application/json',
            success: function(data) {
                chai.assert.equal(data, true);
                done();
            },
        });
      });
  });
}
