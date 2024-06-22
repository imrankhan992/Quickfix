// calculate the price of the product
import React from 'react'

export const priceCalculation = (price,quantity) => {
    console.log( Number(price) * Number(quantity))
    // convert price into number

  return Number(price) * Number(quantity);
}

