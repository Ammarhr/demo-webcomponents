<svelte:options tag={"my-app"} />

<script>
  // @ts-nocheck
  import MicTotalConsumption from "./lib/MIC-TotalConsumption.svelte";
  import MicConsumptionChart from "./lib/MIC-ConsumptionChart.svelte";
  import MicWrapper from "./MIC-Wrapper.svelte";
  // let obj =
  //   '{"DLN":"9000096243","AMI_Flag":"X","Contract":"X","HistoricalFact":"HIST_KWH","ZipCode":"33615","DAP_StartDate":"20230201","DAP_EndDate":"20230301","intp":"","DAP_dkwh":"x","DAP_rkwh":"","DAP_pf":"","DAP_kw":"","UOF":"KWH","DAP_dtoun":"","DAP_dtouf":"","Operand":"ss","StandbyCustomer_Flag":"X","Service":"ELECTRIC"}';
  // obj = JSON.stringify(obj);
</script>

<main>
  <div>
    <!-- <div class="app-container"> -->
      <!-- <MicWrapper
        token="token"
        domain="domain"
        personainput=""
        issummaryaccount="false"
        headerurl="https://tecocdn.azureedge.net/demo/assets/data/211014394434/accountData.json"
        balanceurl="https://tecocdn.azureedge.net/demo/assets/data/211014394434/AccountBalanceData.json"
        messageurl="https://tecocdn.azureedge.net/demo/assets/data/211014394434/messages.json"
        inightsurl="https://tecocdn.azureedge.net/demo/assets/data/211014394434/DemandInsight.json"
        chargeurl="https://tecocdn.azureedge.net/demo/assets/data/211014394434/ChargeDetails.json"
        meterurl="https://tecocdn.azureedge.net/demo/assets/data/211014394434/meterTable.json"
        dailyurl="https://tecocdn.azureedge.net/demo/assets/data/211014394434/meterUsageDaily.json"
        monthlyurl="https://tecocdn.azureedge.net/demo/assets/data/211014394434/meterUsageMonthly.json"
        bulkurl="https://tecocdn.azureedge.net/demo/assets/data/211014394434/bulkDownload.json"
      />
    </div>
    <MicTotalConsumption
      conurl="https://tecocdn.azureedge.net/demo/assets/data/consumption.json"
    /> -->

    <!-- lables={[
        { color: "#000", year: 2006, value: 28000 },
        { color: "#16a34a", year: 2007, value: 50000 },
        { color: "#c9239c", year: 2008, value: 20000 },
        { color: "#6b7280", year: 2009, value: 215100 },
      ]} -->
    <!-- <MicConsumptionChart
      meterobj={obj}
      refreshabletoken="q46846484864"
      dailyurl="https://tecocdn.azureedge.net/demo/assets/data/meterUsageDaily.json"
      monthlyurl="https://tecocdn.azureedge.net/demo/assets/data/meterUsageMonthly.json"
    /> -->
  <!-- </div> -->
</main>
