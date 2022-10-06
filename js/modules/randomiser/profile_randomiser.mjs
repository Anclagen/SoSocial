function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const d = randomDate(new Date(1900, 0, 1), new Date(2008,0,1)).toLocaleDateString() ;
console.log(d);