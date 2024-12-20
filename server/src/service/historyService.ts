import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';



// TODO: Define a City class with name and id properties
class City {
  name: string; 
  id: string;


  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}


// TODO: Complete the HistoryService class

class HistoryService {

  
  // TODO: Define a read method that reads from the searchHistory.json file

  private async read() {
    return await fs.readFile('./db/searchHistory.json', 'utf-8')
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file

  private async write(cities: City[]) {
    await fs.writeFile('./db/searchHistory.json', JSON.stringify(cities))
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects

  async getCities() {
    const cities = await this.read()
    return JSON.parse(cities)
  }
  // TODO: Define an addCity method that adds a city to the searchHistory.json file

  async addCity(city: string) {
    const cities = await this.getCities()
    const newCity = { name: city, id: uuidv4() }
    // TODO: Prevent duplicate entries in history
    if (!cities.some((c: City) => c.name === city)) {
      cities.push(newCity)
    }
      
    await this.write(cities)
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file

  async removeCity(id: string) {
    const cities = await this.getCities()
    const newCities = cities.filter((city: City) => city.id !== id)
    await this.write(newCities) 
  }
  // * BONUS TODO: Define a clearCities method that removes all cities from the searchHistory.json file

  async clearCities() {
    await this.write([])
  }
  
  
}

export default new HistoryService();