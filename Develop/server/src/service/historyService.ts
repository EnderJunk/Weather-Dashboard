import fs from 'node:fs/promises';

// TODO: Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}

// TODO: Complete the HistoryService class
class HistoryService {
  private async read() {
    return await fs.readFile('db/db.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
     private async read() {
    try {
        const data = await fs.readFile('db/searchHistory.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'No Cities Found') {
            return [];
        }
        throw error;
    }
}

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
     private async write(cities: City[]) {
    const data = JSON.stringify(cities, null, 2);
    await fs.writeFile('db/searchHistory.json', data, 'utf8');
}

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
     async getCities() {
    return await this.read();
}

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
     async addCity(name: string) {
    const cities = await this.read();
    const id = (cities.length + 1).toString();
    const newCity = new City(id, name);
    cities.push(newCity);
    await this.write(cities);
}

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}

}


export default new HistoryService();
