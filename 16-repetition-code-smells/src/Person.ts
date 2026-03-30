class Person {
  name: string;
  age: number;
  distanceInKm: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.distanceInKm = 0; // Initate a new person with distance 0
  }

  walk(distanceWalkedInKm: number) {
    this.distanceInKm += distanceWalkedInKm;
  }
}

const p = new Person("Sebastian", 46);

p.walk(2);

const someVar = 10;
