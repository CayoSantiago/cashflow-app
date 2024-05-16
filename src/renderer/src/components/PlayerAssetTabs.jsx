import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import usePlayerData from '@/hooks/usePlayerData'
import { useState } from 'react'
import SellInvestmentDialog from './SellInvestmentDialog'
import SellRealEstateDialog from './SellRealEstateDialog'
import LiabilitiesCard from './LiabilitiesCard'
import AddAssetButton from './AddAssetButton'
import InvestmentsCard from './InvestmentsCard'
import RealEstateCard from './RealEstateCard'
import Direct2YouButton from './Direct2YouButton'
import GoldCoinButton from './GoldCoinButton'
import IncomeCard from './IncomeCard'
import AddFastTrackInvestmentButton from './AddFastTrackInvestmentButton'
import FastTrackCharityButton from './FastTrackCharityButton'

const PlayerAssetTabs = () => {

  const { selected } = usePlayerData()

  const [openSellInvestment, setOpenSellInvestment] = useState(false)
  const [openSellRealEstate, setOpenSellRealEstate] = useState(false)

  const [selectedInv, setSelectedInv] = useState(null)
  const [selectedRealEstate, setSelectedRealEstate] = useState(null)

  return (
    <Tabs defaultValue="assets" {...(selected?.isOutOfRatRace ? { value: 'income' } : {})}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger disabled={!selected} value='income'>Income</TabsTrigger>
          <TabsTrigger disabled={!selected || selected?.isOutOfRatRace} value="assets">Assets</TabsTrigger>
          <TabsTrigger disabled={!selected || selected?.isOutOfRatRace} value="liabilities">Liabilities</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          {selected?.isOutOfRatRace ? (
            <>
              <FastTrackCharityButton />
              <AddFastTrackInvestmentButton />
            </>
          ) : (
            <>
              <Direct2YouButton />
              <GoldCoinButton />
              <AddAssetButton />
            </>
          )}
        </div>
      </div>

      <TabsContent value='income'>
        <IncomeCard {...selected} />
      </TabsContent>

      <TabsContent value='assets'>
        <div className="space-y-2">
          <InvestmentsCard {...selected} />
          <RealEstateCard {...selected} />
        </div>
      </TabsContent>

      <TabsContent value="liabilities">
        <div className="space-y-2">
          <LiabilitiesCard {...selected} />
        </div>
      </TabsContent>

      <SellInvestmentDialog open={openSellInvestment} onOpenChange={isOpen => { if (!isOpen) setSelectedInv(null); setOpenSellInvestment(isOpen) }} {...selectedInv} />
      <SellRealEstateDialog open={openSellRealEstate} onOpenChange={isOpen => { if (!isOpen) setSelectedRealEstate(null); setOpenSellRealEstate(isOpen) }} {...selectedRealEstate} />
    </Tabs>
  )
}

export default PlayerAssetTabs
