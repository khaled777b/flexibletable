const request = require('supertest');
const app = require('../app');

// Sample user token with authentication
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGJlZDJiYmIwMWVmZmQ0NmNhOTJlMDkiLCJpYXQiOjE2OTAzMTAxMjMsImV4cCI6MTY5MDM5NjUyM30.Jh27F0QeY-EHCs4JHBCcRXfuJHQCa-m0cKErq0PQma4';

describe('Table Routes', () => {
  let tableId;

  it('should create a new table', async () => {
    const res = await request(app)
      .post('/api/tables')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        tableName: 'SampleTable',
        columns: ['Column1', 'Column2', 'Column3']
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('table');
    tableId = res.body.table._id;
  });

  it('should get a specific table by ID', async () => {
    const res = await request(app)
      .get(`/api/tables/${tableId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', tableId);
  });

  it('should update an existing table', async () => {
    const res = await request(app)
      .put(`/api/tables/${tableId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        tableName: 'UpdatedTable',
        columns: ['ColumnA', 'ColumnB', 'ColumnC']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('table');
    expect(res.body.table.tableName).toEqual('UpdatedTable');
  });

  it('should get all tables', async () => {
    const res = await request(app)
      .get('/api/tables')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should delete an existing table', async () => {
    const res = await request(app)
      .delete(`/api/tables/${tableId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Table deleted successfully.');
  });
});
