import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selected: -1,
  players: [],
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    reset: (state) => {
      Object.assign(state, initialState)
    },

    addPlayer: (state, action) => {
      const { name, profession } = action.payload
      if (!name || !profession) return
      
      const totalExpenses = Object.values(profession.expenses).reduce((acc, val) => acc + val, 0)
      const cashFlow = profession.salary - totalExpenses
      
      state.players.push({
        name,
        profession: profession.title,
        salary: profession.salary,
        balance: profession.savings + cashFlow,
        expenses: profession.expenses,
        liabilities: profession.liabilities,
        costPerChild: profession.costPerChild,
        loan: 0,
        children: 0,
        coins: 0,
        investments: [],
        realEstate: [],
        isBankrupt: false,
        d2y: {
          hasJoined: false,
          cashFlow: 0,
        },
      })
      
      state.selected = state.players.length - 1
    },

    selectPlayer: (state, action) => {
      Object.assign(state, { selected: action.payload })
    },

    incrementChildren: (state) => {
      const player = state.players[state.selected]
      if (!player) return
      player.children = Math.min(3, player.children + 1)
    },

    decrementChildren: (state) => {
      const player = state.players[state.selected]
      if (!player) return
      player.children = Math.max(0, player.children - 1)
    },

    addInvestment: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const totalCost = action.payload.amount * action.payload.cost
      if (totalCost > player.balance) return

      player.balance -= totalCost
      player.investments.push(action.payload)
    },

    sellInvestment: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const inv = player.investments[action.payload.idx]
      if (!inv) return

      player.balance += inv.amount * action.payload.price
      player.investments.splice(action.payload.idx, 1)
    },

    doubleShares: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const inv = player.investments[action.payload.idx]
      if (!inv) return

      inv.amount *= 2
    },

    halveShares: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const inv = player.investments[action.payload.idx]
      if (!inv) return
      
      inv.amount = Math.floor(inv.amount / 2)
    },

    addRealEstate: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      if (action.payload.downPayment > player.balance) return
      
      player.balance -= action.payload.downPayment
      player.realEstate.push(action.payload)
    },

    sellRealEstate: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const realEstate = player.realEstate[action.payload.idx]
      if (!realEstate) return

      player.balance += action.payload.price - realEstate.mortgage
      player.realEstate.splice(action.payload.idx, 1)
    },

    editInvestmentCashFlow: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const inv = player.investments[action.payload.idx]
      if (!inv) return
      
      inv.cashFlow = action.payload.cashFlow
    },

    editRealEstateCashFlow: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const realEstate = player.realEstate[action.payload.idx]
      if (!realEstate) return
      
      realEstate.cashFlow = action.payload.cashFlow
    },

    updateBalance: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const { payDay = false, amount } = action.payload
      player.balance += amount

      if (player.isBankrupt && player.balance >= 0) {
        player.isBankrupt = false
      } else if (payDay && !player.isBankrupt && player.balance < 0) {
        player.isBankrupt = true
      }
    },

    buyGoldCoins: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const { amount, price } = action.payload
      if (price * amount > player.balance) return

      player.balance -= price * amount
      player.coins += amount
    },

    sellGoldCoins: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const { amount, price } = action.payload
      if (player.coins < amount) return

      player.balance += price * amount
      player.coins -= amount
    },

    payOffLiability: (state, action) => {      
      const player = state.players[state.selected]
      if (!player) return

      const lib = player.liabilities[action.payload]
      if (!lib) return

      console.log(lib)

      if (player.balance < lib.value) return

      player.balance -= lib.value
      player.liabilities.splice(action.payload, 1)
    },

    getBankLoan: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      player.balance += action.payload
      player.loan += action.payload
    },

    payOffBankLoan: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      const amount = Math.min(action.payload, player.loan)

      player.balance -= amount
      player.loan -= amount
    },

    joinD2Y: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return
      
      if (player.d2y.hasJoined || action.payload > player.balance) return

      player.balance -= action.payload
      player.d2y.hasJoined = true
    },

    increaseD2YCashFlow: (state, action) => {
      const player = state.players[state.selected]
      if (!player) return

      player.d2y.cashFlow += action.payload
    },

  }
})

export const {
  reset,
  addPlayer,
  selectPlayer,
  incrementChildren,
  decrementChildren,
  addInvestment,
  sellInvestment,
  doubleShares,
  halveShares,
  addRealEstate,
  sellRealEstate,
  editInvestmentCashFlow,
  editRealEstateCashFlow,
  updateBalance,
  buyGoldCoins,
  sellGoldCoins,
  payOffLiability,
  getBankLoan,
  payOffBankLoan,
  joinD2Y,
  increaseD2YCashFlow,
} = dataSlice.actions

export default dataSlice.reducer
