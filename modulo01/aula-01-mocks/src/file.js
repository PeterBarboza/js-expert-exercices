const { readFile } = require("fs/promises")
const { error } = require("./constants")

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"]
}

class File {
  /**
   * @param {string} filePath
   */
  static async csvToJson(filePath) {
    const content = await readFile(filePath, "utf8")
    const validation = this.isValid(content)
    if (!validation.valid) throw new Error(validation.error)

    const result = this.parseCsvToJson(content)

    return result
  }

  /**
   * @param {string} csvString 
   * @param {typeof DEFAULT_OPTION} options 
   */
  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/)
    const isHeadersValid = header === DEFAULT_OPTION.fields.join(",")

    console.log({ header, fileWithoutHeader })

    if (!isHeadersValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    if (
      !fileWithoutHeader.length || 
      fileWithoutHeader.length > options.maxLines
    ) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return {
      valid: true
    }
  }

  /**
   * @param {string} csvString 
   */
  static parseCsvToJson(csvString) {
    const [header, ...lines] = csvString.split(/\r?\n/)

    const parsedHeader = header.split(",")

    const users = lines.map((line) => {
      const columns = line.split(",")

      const user = {}

      for (const index in columns) {
        user[parsedHeader[index]] = columns[index].trim()
      }

      return user
    })

    return users
  }
}

module.exports = File