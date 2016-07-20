import { chai, expect } from 'meteor/practicalmeteor:chai';
import { $ } from 'meteor/jquery';
import * as Collections from "/imports/collections";
import products from "/imports/fixtures/products";

// prepare factory
products();

if (Meteor.isServer) {
    describe('Lists_show_page', function() {
        beforeEach(function() {});

        afterEach(function() {});

        it('renders correctly with simple data2', function() {
            chai.assert.equal(1, 1);
        });

        it("Product fixture should create a product", function() {
            let product;
            if (!Collections.Products.findOne()) {
                product = Factory.create("product");
            }
            product = Factory.create("product");
            const productCount = Collections.Products.find().count();
            expect(productCount).to.be.above(0);
        });

    });
}

if (Meteor.isClient) {
    describe('data available when routed', () => {

        it('test all args', (done) => {
            $.ajax({
                method: 'post',
                headers: {
                    id: 0
                },
                url: 'test-all-args/1?id=2',
                data: JSON.stringify({
                    id: 3
                }),
                contentType: 'application/json',
                success: function(data) {
                    chai.assert.equal(data.headers_id, 0);
                    chai.assert.equal(data.params_id, 1);
                    chai.assert.equal(data.query_id, 2);
                    chai.assert.equal(data.body_id, 3);
                    done();
                },
            });
        });

        it('product list', function(done) {
            $.ajax({
                method: 'get',
                url: 'api/products',
                data : {
                    offset: 0,
                    limit: 10
                },
                contentType: 'application/json',
                success: function(data) {
                    console.log(data);
                    chai.assert.equal(data.items.length, 10);
                    done();
                }
            });
        });


    });
}
