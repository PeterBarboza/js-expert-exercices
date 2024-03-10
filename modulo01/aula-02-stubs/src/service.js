class Service {
  /**
   * @param {string} url 
   */
  async makeRequest(url) {
    const data = await (await fetch(url)).json()
    
    return data
  }
  
  /**
   * @param {string} url 
  */
  async getPlanets(url) {
    const data = await this.makeRequest(url)

    return {
      name: data.name,
      surfaceWater: data.surface_water,
      apeardIn: data.films.length,
    }
  }
}

module.exports = Service