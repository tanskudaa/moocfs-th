// Constants and variables
const x = 1
let y = 5
console.log(x, y)       // prints 1, 5

// Addition
y += 10
console.log(x, y)       // prints 1, 15

// Loose typing
y = 'teksti'
console.log(x, y)       // prints 1, teksti

// Constant
try {
    x = 4               // error (constant)
} catch (error) { 
    console.log('can\'t change constant')
}


// Arrays
const t = [1, -1, 3]
t.push(5)

console.log(t.length)   // prints 4
console.log(t[1])       // prints -1

t.forEach(value => { console.log(value) })

// Functions
// This:
function sum(a, b) {
    return a + b
}
console.log(sum(1,2))

// is the same as:
const sum2 = (a, b) => { return a + b }
console.log(sum2(1,2))
