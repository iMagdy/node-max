interface asd {
  test: string
}

const test = (test: asd): number => {
  return 123;
}

console.log(245, test({ test: '3232' }));