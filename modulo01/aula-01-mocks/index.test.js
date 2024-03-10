const File = require("./src/file")
const { error } = require("./src/constants")
const assert = require("assert")

;(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv"
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = "./mocks/invalidHeader-invalid.csv"
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = "./mocks/fiveItems-invalid.csv"
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = "./mocks/threeItems-valid.csv"
    const expected = [
      {
        id: 1,
        name: "xuxa",
        profession: "dev",
        age: 100
      },
      {
        id: 2,
        name: "joão",
        profession: "PO",
        age: 30
      },
      {
        id: 3,
        name: "ana",
        profession: "analyst",
        age: 25
      },
    ]
    const result = await File.csvToJson(filePath)
    assert.deepEqual(result, expected)
  }
})()