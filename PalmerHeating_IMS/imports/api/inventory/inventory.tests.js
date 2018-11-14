import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import Inventory from './inventory_items.js';

if (Meteor.isServer) {
  describe('inventory collection', function() {
    it('inserts correctly', function() {
      const inventoryID = Inventory.insert({
        _id:
          Inventory.find({}, { _id: '$_id' })
          .limit(1)
            .sort({ $natural: -1 }) + 1,
        name: 'Test Item',
        description: 'Test item description',
        summerLimit: 12,
        winterLimit: 20,
        Price: 32.23,
      });
      const added = Inventory.find({ _id: inventoryID });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'inventory');
      assert.equal(count, 1);
    });
  });
}
