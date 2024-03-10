const assert = require("node:assert")
const { createSandbox } = require("sinon")

const Service = require("./service");

const mocks = {
  alderaan: require("../mocks/alderaan.json"),
  tatooine: require("../mocks/tatooine.json"),
}

const BASE_URL_1 = "https://swapi.py4e.com/api/planets/1/"
const BASE_URL_2 = "https://swapi.py4e.com/api/planets/2/"

const sinon = createSandbox()


;(async () => {
  // Acessa a internet
  // {
  //   const service = new Service()
  //   const data = await service.makeRequest(BASE_URL_2)
  //   console.log(JSON.stringify(data, null, 2))
  // }

  const service = new Service()

  const stub = sinon.stub(
    service,
    service.makeRequest.name
  )

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine)
  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan)

  { 
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      apeardIn: 5
    }

    const results = await service.getPlanets(BASE_URL_1)

    assert.deepStrictEqual(results, expected)
  }

  { 
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      apeardIn: 2
    }

    const results = await service.getPlanets(BASE_URL_2)

    assert.deepStrictEqual(results, expected)
  }
})()