class Person {
  name: string;
  age: number;
  distance: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.distance = 0;
  }

  walk() {
    this.distance += 1000;
  }
}

const p = new Person("Sebastian", 46);

p.walk();

const someVar = 10;
