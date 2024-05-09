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
      state.selected = -1
      state.players = []
    },

    addPlayer: (state, action) => {
      const { name, profession } = action.payload
      state.players.push({
        name,
        profession: profession.title,
        salary: profession.salary,
        balance: profession.savings,
        expenses: profession.expenses,
        liabilities: profession.liabilities,
        costPerChild: profession.costPerChild,
        loan: 0,
        children: 0,
        coins: 0,
        investments: [],
        realEstate: [],
        cashFlow: [],
        isBankrupt: false,
      })
      state.selected = state.players.length - 1
    },

    selectPlayer: (state, action) => {
      state.selected = state.players.findIndex(p => p.name === action.payload)
    },

    incrementChildren: (state) => {
      const player = state.players[state.selected]
      if (player.children >= 3) return
      player.children += 1
    },

    decrementChildren: (state) => {
      const player = state.players[state.selected]
      if (player.children <= 0) return
      player.children -= 1
    },

    addInvestment: (state, action) => {
      const player = state.players[state.selected]
      const totalCost = action.payload.amount * action.payload.cost
      if (totalCost > player.balance) return
      player.balance -= totalCost
      player.investments.push(action.payload)
    },

    sellInvestment: (state, action) => {
      const player = state.players[state.selected]
      const inv = player.investments.find(i => i.name === action.payload.name)
      if (!inv) return
      player.balance += inv.amount * action.payload.price
      player.investments = player.investments.filter(i => i.name !== action.payload.name)
    },

    doubleShares: (state, action) => {
      const player = state.players[state.selected]
      const inv = player.investments.find(i => i.name === action.payload.name)
      if (!inv) return
      inv.amount *= 2
    },

    halveShares: (state, action) => {
      const player = state.players[state.selected]
      const inv = player.investments.find(i => i.name === action.payload.name)
      if (!inv) return
      inv.amount = Math.floor(inv.amount / 2)
    },

    addRealEstate: (state, action) => {
      const player = state.players[state.selected]
      if (action.payload.downPayment > player.balance) return
      player.balance -= action.payload.downPayment
      player.realEstate.push(action.payload)
    },

    sellRealEstate: (state, action) => {
      const player = state.players[state.selected]
      const realEstate = player.realEstate.find(i => i.name === action.payload.name)
      if (!realEstate) return
      player.balance += action.payload.price - realEstate.mortgage
      player.realEstate = player.realEstate.filter(i => i.name !== action.payload.name)
    },

    addCashFlow: (state, action) => {
      state.players[state.selected].cashFlow.push(action.payload)
    },

    updateCashFlow: (state, action) => {
      const player = state.players[state.selected]
      const cf = player.cashFlow.find(i => i.name === action.payload.name)
      if (!cf) return
      cf.cashFlow = action.payload.cashFlow
    },

    updateBalance: (state, action) => {
      const player = state.players[state.selected]
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
      const { amount, price } = action.payload
      if (price > player.balance) return
      player.balance -= price * amount
      player.coins += amount
    },

    sellGoldCoins: (state, action) => {
      const player = state.players[state.selected]
      const { amount, price } = action.payload
      if (player.coins < amount) return
      player.balance += price * amount
      player.coins -= amount
    },

    payOffLiability: (state, action) => {
      const player = state.players[state.selected]
      const lib = player.liabilities.find(l => l.key === action.payload)
      if (player.balance < lib.value) return
      player.balance -= lib.value
      player.liabilities = player.liabilities.filter(l => l.key !== action.payload)
    },

    getBankLoan: (state, action) => {
      const player = state.players[state.selected]
      const amount = action.payload
      player.balance += amount
      player.loan = amount
    },

    payOffBankLoan: (state, action) => {
      const player = state.players[state.selected]
      const amount = Math.min(action.payload, player.loan)
      player.balance -= amount
      player.loan -= amount
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
  addCashFlow,
  updateCashFlow,
  updateBalance,
  buyGoldCoins,
  sellGoldCoins,
  payOffLiability,
  getBankLoan,
  payOffBankLoan,
} = dataSlice.actions

export default dataSlice.reducer
