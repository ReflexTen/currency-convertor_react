import { useState } from 'react'
import style from './Block.module.scss'

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP']

const Block = ({
  value,
  currency,
  onChangeValue,
  onChangeCurrency,
  rates,
  clearInputHandler,
  boxId,
}) => {
  const list = Object.keys(rates)
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [isActive, setIsActive] = useState(false)

  function activeList() {
    setIsActive(!isActive)
  }

  function chooseCurrency(e) {
    setSelectedCurrency(e.target.innerText)
    setIsActive(false)
  }

  return (
    <div className={style.block}>
      <ul className={style.currencies}>
        {defaultCurrencies.map((cur, idx) => (
          <li
            onClick={() => onChangeCurrency(cur)}
            className={currency === cur ? `${style.active}` : ''}
            key={idx}
          >
            {cur}
          </li>
        ))}

        {selectedCurrency && (
          <li
            onClick={() => onChangeCurrency(selectedCurrency)}
            className={currency === selectedCurrency ? `${style.active}` : ''}
          >
            {' '}
            {selectedCurrency}
          </li>
        )}

        <li onClick={activeList}>
          <svg height="50px" viewBox="0 0 50 50" width="50px">
            <rect fill="none" height="50" width="50" />
            <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
          </svg>
        </li>
      </ul>

      {isActive && (
        <ul className={style.currenciesList}>
          {list.map((currency, idx) => {
            return (
              <li
                key={idx}
                onClick={e => chooseCurrency(e)}
                className={style.currenciesItem}
              >
                {currency}
              </li>
            )
          })}
        </ul>
      )}

      <input
        onChange={e => onChangeValue(e.target.value)}
        value={value}
        type="number"
        placeholder={0}
      />

      <button
        className={style.currenciesButton}
        onClick={() => clearInputHandler(boxId)}
      >
        Очистить значение
      </button>
    </div>
  )
}

export default Block
