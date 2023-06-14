import { useEffect, useState } from 'react'
import './App.scss'
import Block from './components/Block'
import ratesData from './data/Rates'

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')

  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(0)

  const [rates, setRates] = useState({})

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then(res => res.json())
      .then(data => {
        const ratesWithRUB = data.rates
        ratesWithRUB.RUB = 1
        setRates(ratesWithRUB)
      })
      .catch(err => {
        alert(err)
      })
    // setRates(ratesData)
  }, [])

  console.log(rates)

  const fromChangeValue = value => {
    const price = value / rates[fromCurrency]
    const result = price * rates[toCurrency]
    setFromValue(value)
    setToValue(result)
  }

  const toChangeValue = value => {
    const price = value / rates[toCurrency]
    const result = price * rates[fromCurrency]
    setFromValue(result)
    setToValue(value)
  }

  useEffect(() => {
    if (fromValue) {
      fromChangeValue(fromValue)
    }
  }, [fromCurrency, fromValue])

  useEffect(() => {
    if (toValue) {
      toChangeValue(toValue)
    }
  }, [toCurrency, toValue])

  const clearInput = nameBox => {
    if (nameBox === 'fromBox') {
      setFromValue(0)
    }
    if (nameBox === 'toBox') {
      setToValue(0)
    }
  }

  return (
    <div className="App">
      <h1 className="title">Конвертор валют</h1>

      <div className="container">
        <Block
          boxId={'fromBox'}
          clearInputHandler={clearInput}
          value={fromValue}
          currency={fromCurrency}
          onChangeValue={fromChangeValue}
          onChangeCurrency={setFromCurrency}
          rates={rates}
        />
        <Block
          boxId={'toBox'}
          clearInputHandler={clearInput}
          value={toValue}
          currency={toCurrency}
          onChangeValue={toChangeValue}
          onChangeCurrency={setToCurrency}
          rates={rates}
        />
      </div>
    </div>
  )
}

export default App
