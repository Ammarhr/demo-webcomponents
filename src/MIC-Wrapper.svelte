<svelte:options tag="mic-wrapper" />

<script>
  // @ts-nocheck
  import MicHeaderInformation from "./lib/MIC-HeaderInformation.svelte";
  import MicBalanceSummary from "./lib/MIC-BalanceSummary.svelte";
  import MicImportantMessage from "./lib/MIC-ImportantMessage.svelte";
  import MicImportantMessagesDetails from "./lib/MIC-ImportantMessagesDetails.svelte";
  import MicComboBill from "./lib/MIC-ComboBill.svelte";
  import MicBulkDownload from "./lib/MIC-BulkDownload.svelte";
  import MicMeterTable from "./lib/MIC-MeterTable.svelte";
  import MicLoading from "./lib/MIC-Loading.svelte";
  
  import { onMount } from "svelte";
  import {
    setDomain,
    setToken,
    generalErr,
    showToolTipDetails,
    persona,
    setSummaryAccountFlag,
    isSummaryAccountFlag,
    setSAPTpken,
    pendingRequest,
  } from "./js/store";

  export let token;
  export let domain;
  export let personainput;
  export let saptoken = '""';
  export let issummaryaccount = "false";
  export let accounturl;
  export let balanceurl;
  export let messageurl;
  export let inightsurl;
  export let chargeurl;
  export let meterurl;
  export let dailyurl;
  export let monthlyurl;
  export let bulkurl;
  
  $: if (token && domain) {
    setToken(token);
    setDomain(domain);
    setSAPTpken(saptoken);

    if (personainput == "Agent") {
      persona.set("Agent");
    } else {
      persona.set("customer");
    }
  }
  $: if (issummaryaccount) {
    setSummaryAccountFlag(issummaryaccount);
  }
  onMount(() => {
    generalErr.set(false);
    showToolTipDetails.set(false);
  });
</script>

{#if token && domain && saptoken && $generalErr !== true && accounturl && balanceurl && messageurl && inightsurl && chargeurl && meterurl && dailyurl && monthlyurl && bulkurl}
  <div class="wrapper">
    {#if $pendingRequest && $pendingRequest.length > 0}
      <div class="loading-screen">
        <div class="bouncing-loader">
          <div />
          <div />
          <div />
        </div>
      </div>
    {/if}
    <mic-headerinformation {accounturl} />
    <!-- <MicHeaderInformation {accounturl} /> -->
    <div class="important-balance">
      <div class="balance">
        <mic-balancesummary {balanceurl} />
        <!-- <MicBalanceSummary {balanceurl} /> -->
      </div>
      <div class="messages">
        <mic-importentmessage {messageurl} />
        <!-- <MicImportantMessage {messageurl} /> -->
      </div>
    </div>
    {#if $isSummaryAccountFlag.toLowerCase() == "true"}
      <div class="summary-billing" />
    {/if}
    <mic-combo-bill {inightsurl} {chargeurl} {bulkurl} />
    <!-- <MicComboBill {inightsurl} {chargeurl} {bulkurl}/> -->
    <mic-metertable {meterurl} {dailyurl} {monthlyurl} />
    <!-- <MicMeterTable {meterurl} {dailyurl} {monthlyurl} /> -->
  </div>
{:else if $generalErr === true}
  <!-- <mic-generalerror {token} /> -->
  <!-- <MicGeneralError {token} /> -->
{/if}

<style lang="scss">
  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translate3d(0, -16px, 0);
    }
  }

  .bouncing-loader {
    display: flex;
    justify-content: center;
  }

  .bouncing-loader > div {
    width: 16px;
    height: 16px;
    margin: 3rem 0.2rem;
    background: #8385aa;
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
  }

  .bouncing-loader > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  .bouncing-loader > div:nth-child(3) {
    animation-delay: 0.4s;
  }
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f57f;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .loading-text {
    font-size: 24px;
    color: #333;
    text-align: center;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    padding: 0px 16px 0 16px;
    width: calc(100% - 32px);
    gap: 30px;
    background-color: #ffffff00;
    font-family: "Interstate" !important;
    * {
      font-family: "Interstate" !important;
    }
  }
  .important-balance {
    display: grid;
    flex-direction: row;
    column-gap: 30px;
    row-gap: 30px;
    grid-template-columns: calc(66.66% - 30px) 33.33%;
    width: 100%;
    @media screen and (max-width: 992px) {
      grid-template-columns: 100%;
    }
  }
  .balance {
    width: 100%;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  .messages {
    @media screen and (max-width: 992px) {
      width: 100%;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  .refreshable {
    display: grid;
    flex-direction: row;
    column-gap: 30px;
    width: 100%;
    @media screen and (max-width: 992px) {
      grid-template-columns: 100%;
    }
  }
  .charge-detailes {
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  .mic-insights {
    width: 100%;
    @media screen and (max-width: 767px) {
      max-width: unset;
    }
  }
  .insights {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: end;
    @media screen and (max-width: 992px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .blk-container {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
  }
</style>
