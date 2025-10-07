import numeral from 'numeral'

// Accept both `value` and `amount` props for backwards compatibility.
const CurrencyFormat = ({ value, amount }) => {
  const v = value ?? amount ?? 0
  return <span>{numeral(v).format('$0,')}</span>
}

export default CurrencyFormat