// CommonJs - Every file is a module
// Module - Encapsulated code (only share minimum)

const sayHi = require('./utils')
// const names = require('./names')

// sayHi(names.marrie)
// sayHi(names.peter)

const { marrie, peter } = require('./names')
sayHi(marrie)
sayHi(peter)
