import { useSelector } from 'react-redux'

const usePlayerData = () => {
  
  const { players, selected } = useSelector(state => state.data)

  if (selected < 0 || selected >= players.length) return { players, selected: null, passiveIncome: 0, totalExpenses: 0 }

  const player = players[selected]

  const passiveIncome = player.investments.reduce((acc, v) => acc + v.amount * v.cashFlow, 0) + player.realEstate.reduce((acc, v) => acc + v.cashFlow, 0)

  const totalExpenses = Object.values(player.profession.expenses).reduce((acc, v) => acc + v, 0) + player.children * player.profession.perChildExpense

  return { players, selected: player, passiveIncome, totalExpenses }

}

export default usePlayerData
