/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const axios = require('axios');
const warehouses = require('./warehouses.json');
const warehouseUsers = require('./warehouseUsers.json');
const boxes = require('./boxes.json');
const shippingCities = require('./shippingCities.json');
const inventory = require('./inventory.json');

const basePath = 'http://localhost:12000/api/v1';

async function callEndpoint(method, url, headers, data) {
  try {
    await axios({
      method, url: `${basePath}${url}`, headers, data
    });
  } catch (e) {
    console.log(`❌ Error calling ${url}:\n \x1b[31m${JSON.stringify(e.response.data.message)}\n\n \x1b[0m`);
  }
}

async function createWarehouses() {
  const url = '/warehouse';
  const headers = { roles: '["ADMIN_USER"]', 'user-id': '75442486-0878-440c-9db1-a7006c25a39f' };

  for (let i = 0; i < warehouses.length; i += 1) {
    const warehouse = warehouses[i];

    await callEndpoint('post', url, headers, warehouse);
  }
  console.log('\x1b[32m', '✅ Warehouses created. \x1b[0m');
}

async function assignWarehouseToUsers() {
  const url = '/warehouse-user';
  const headers = { roles: '["ADMIN_USER"]', 'user-id': '75442486-0878-440c-9db1-a7006c25a39f' };

  // User 75442486-0878-440c-9db1-a7006c25a39f -> All warehouses
  // User ea8dbca3-088b-456c-a191-4d990c25d257 -> 1 warehouse

  for (let i = 0; i < warehouseUsers.length; i += 1) {
    const warehouseUser = warehouseUsers[i];

    await callEndpoint('post', url, headers, warehouseUser);
  }
  console.log('\x1b[32m', '✅ Warehouse assigned to Warehouse Users. \x1b[0m');
}

async function createBoxesToWarehouses() {
  const headers = { roles: '["ADMIN_USER"]', 'user-id': '75442486-0878-440c-9db1-a7006c25a39f' };

  // All warehouses will have 1 boxes
  // First warehouse will have 2 boxes

  for (let i = 0; i < boxes.length; i += 1) {
    const box = boxes[i];
    const url = `/warehouse/${box.warehouseId}/box`;

    await callEndpoint('post', url, headers, box.box);
  }
  console.log('\x1b[32m', '✅ Boxes created for warehouses. \x1b[0m');
}

async function assignShippingCitiesToWarehouses() {
  const headers = { roles: '["ADMIN_USER"]', 'user-id': '75442486-0878-440c-9db1-a7006c25a39f' };

  for (let i = 0; i < shippingCities.length; i += 1) {
    const shippingCitiesInfo = shippingCities[i];

    const url = `/warehouse/${shippingCitiesInfo.warehouseId}/shipping-cities`;

    await callEndpoint('post', url, headers, { cityCodes: shippingCitiesInfo.cityCodes });
  }
  console.log('\x1b[32m', '✅ Shipping cities assigned for warehouses. \x1b[0m');
}

async function assignInventoryToWarehouses() {
  const headers = { roles: '["ADMIN_USER"]', 'user-id': '75442486-0878-440c-9db1-a7006c25a39f' };

  /*
  Warehouse 1:
    pc1: 179f9ff1-1ba0-4050-9bb4-fba076b2c9ca, quantity 10
    pc2: 285c06f2-b32e-4d73-91f5-f083256019c5, quantity 10
    pc7: 7b2b3997-c480-460a-8b36-b1b6d2833ae6, quantity 3
    pc8: 8a971ccf-147f-4197-a8f6-64af3db1d7dc, quantity 1
  Warehouse 2:
    pc1: 179f9ff1-1ba0-4050-9bb4-fba076b2c9ca, quantity 10
    pc3: 35d185e8-772b-4e40-be55-953a257d3ac2, quantity 10
    pc7: 7b2b3997-c480-460a-8b36-b1b6d2833ae6, quantity 3
  Warehouse 3:
    pc1: 179f9ff1-1ba0-4050-9bb4-fba076b2c9ca, quantity 10
    pc4: 4dd4c451-e8f7-431a-9dc0-d3834befa5ed, quantity 10
    pc9: 90d81a76-3bc4-4bf6-8c5d-45304fc2fe41, quantity 5
  Warehouse 4:
    pc1: 179f9ff1-1ba0-4050-9bb4-fba076b2c9ca, quantity 10
    pc5: 5d4245aa-e89c-49e2-b5dd-27928ad41fc4, quantity 10
    pc8: 8a971ccf-147f-4197-a8f6-64af3db1d7dc, quantity 1
  Warehouse 5:
    pc1: 179f9ff1-1ba0-4050-9bb4-fba076b2c9ca, quantity 10
    pc6: 6121056b-9ca8-4393-99aa-912db4fac3bd, quantity 10
    pc9: 90d81a76-3bc4-4bf6-8c5d-45304fc2fe41, quantity 5
  */

  /*
  Problem to solve:

  Need 50 -> pc1
  Need 15 -> pc2

      pc1    pc2
  w1: 20      4      -> 24    10 pc1
  w2: 30      11     -> 41    30 pc1, 11 pc2
  w3: 10      15     -> 25    10 pc1, 4  pc2

  Should send only from w1 and w2.
  */

  for (let i = 0; i < inventory.length; i += 1) {
    const inventoryInfo = inventory[i];

    const url = `/warehouse/${inventoryInfo.warehouseId}/inventory`;

    await callEndpoint('post', url, headers, inventoryInfo.inventory);
  }
  console.log('\x1b[32m', '✅ Inventory assigned for warehouses. \x1b[0m');
}

async function loadFixtures() {
  await createWarehouses();
  await assignWarehouseToUsers();
  await createBoxesToWarehouses();
  await assignShippingCitiesToWarehouses();
  await assignInventoryToWarehouses();
}

loadFixtures();
