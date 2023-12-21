import run from '../../app'
import { Server } from 'http'
import request from 'supertest'
describe('http', () => {
  let server: Server
  beforeAll(() => {
    server = run(88)
  })
  it('GET /admin', () => {
    return request(server).get('/admin').expect(200).then(response => {
      console.log(response.body)
      // expect(response.body.length).toEqual(8)
      // expect(response.body).toStrictEqual([1, 2, 3, 4, 5, 6])
    })
  })
  afterAll(async () => {
    server.close()
  })
})