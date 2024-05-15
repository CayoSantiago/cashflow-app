import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const usePlayerData = () => {
  
  const { players, selected } = useSelector(state => state.data)

  const player = players[selected]

  const invIncome = useMemo(() => player?.investments?.reduce((acc, v) => acc + v.amount * v.cashFlow, 0) || 0, [player?.investments])
  const reIncome = useMemo(() => player?.realEstate?.reduce((acc, v) => acc + v.cashFlow, 0) || 0, [player?.realEstate])

  const libExpenses = useMemo(() => (
    player?.liabilities?.reduce((acc, l) => acc + player?.expenses?.[l.key] || 0, 0) || 0
  ), [player?.liabilities, player?.expenses])

  const totalExpenses = libExpenses
    + (player?.expenses?.taxes || 0)
    + (player?.expenses?.other || 0)
    + (player?.loan || 0) / 10
    + (player?.children || 0) * (player?.costPerChild || 0)

  return {
    players,
    selected: player,
    passiveIncome: invIncome + reIncome + player?.d2y?.cashFlow || 0,
    totalExpenses
  }

}

export default usePlayerData
