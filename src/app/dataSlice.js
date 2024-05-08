import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selected: -1,
  players: [],
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    addPlayer: (state, action) => {
      state.players.push({
        ...action.payload,
        balance: action.payload.profession.savings,
        children: 0,
        investments: [],
        realEstate: [],
        cashFlow: [],
        balanceHistory: []
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
      player.balance += action.payload.price
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
      player.balance += action.payload
      player.balanceHistory.push(action.payload)
    },

    undo: (state) => {
      const player = state.players[state.selected]
      if (player.balanceHistory.length <= 0) return
      const prev = player.balanceHistory.pop()
      player.balance -= prev
    },

    reset: (state) => {
      state.selected = -1
      state.players = []
    },

  }
})

export const {
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
  undo,
  reset,
} = dataSlice.actions

export default dataSlice.reducer
