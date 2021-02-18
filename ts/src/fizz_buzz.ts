function say(number: number) {
  let strReturn

  if (number % 15 == 0) {
    strReturn = "FizzBuzz"
  } else {
    if (number % 3 == 0) strReturn = "Fizz"

    if (number % 5 == 0) strReturn = "Buzz"
  }

  if (strReturn != undefined) return strReturn

  return number.toString()
}

export default say