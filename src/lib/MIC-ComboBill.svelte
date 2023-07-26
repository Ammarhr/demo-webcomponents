<svelte:options tag="mic-combo-bill" />

<script>
  // @ts-nocheck
  //svg imports

  import {
    globalFetch,
    isSummaryAccountFlag,
    isParentAccount,
  } from "../js/store";
  import { onMount } from "svelte";
  import MicBillInsightsCombo from "./MIC-BillInsights-combo.svelte";
  import MicChargeDetailsCombo from "./MIC-ChargeDetails-combo.svelte";
  export let inightsurl;
  export let chargeurl;
  export let bulkurl;

  let comboNewToken;
  let arrayOfBillInsights = [];
  let arrayOfCharges = [];
  let emptyTabs = true; // make tabs array empty
  const [data, loading, error, get] = globalFetch(); // bill insights  store fetch
  const [chargeData, chargeLoading, chargeError, chargeGet] = globalFetch(); // charge details  store fetch
  let tries = 2;
  onMount(() => {
    if (
      !$chargeData.Section &&
      !$data.services &&
      $isSummaryAccountFlag &&
      tries > 0 &&
      inightsurl &&
      chargeurl &&
      bulkurl
    ) {
      if ($isSummaryAccountFlag.toLowerCase() !== "true") {
        chargeGet("token", chargeurl);
        get("token", inightsurl).then(() => {
          if ($data && $data.services) {
            arrayOfBillInsights = $data.services;
          }
        });
      }
    }
    comboNewToken = "token";
    tries--;
  });

  $: if ($data && $data.services) {
    arrayOfBillInsights = $data.services;
  }
  let agencySection;
  $: if ($chargeData && $chargeData.Section) {
    arrayOfCharges = $chargeData.Section;
    invoiceTotalArray = $chargeData.Section.filter((subSection) => {
      return subSection.SectionType == "InvoiceTotal";
    });
  }

  let insight;
  let insightsArray = [];
  let chargesArray = [];
  let arrayOfbody = [];
  let bulkPosition = 0;
  let invoiceTotalArray;

  $: if (
    $chargeData &&
    $chargeData.Section &&
    $chargeData.Section.length &&
    arrayOfBillInsights &&
    arrayOfBillInsights.length > 0 &&
    insightsArray.length == 0
  ) {
    arrayOfbody = [];
    let arryOfConfigue = $chargeData.Section.map((subSection) => {
      return subSection.ConfigValue;
    });
    arrayOfbody = [];
    for (let i = 0; i < $chargeData.Section.length; i++) {
      insight = arrayOfBillInsights.filter((results) => {
        if (arryOfConfigue[i]) {
          if (arryOfConfigue[i] == results.BillContractNo) {
            bulkPosition = i;
          }
          if (arryOfConfigue[i] == results.BillContractNo) {
            let serviceObj = {
              TempPreviousValue: results.monthly?.percentageTemp || 0,
              TempLastyearValue: results.yearly?.percentageTemp || 0,
              BillingClass: results.ZInstallBillClass,
              Division: results.serviceName,
              MonthlyUsageConsumption:
                results.monthly?.percentageConsumption || 0,
              YearlyUsageConsumption: results.yearly?.percentageConsumption,
            };
            arrayOfbody.push(serviceObj);
          }
          return arryOfConfigue[i] == results.BillContractNo;
        }
      });
      if ($chargeData.Section[i].Collapsible == true) {
        agencySection = $chargeData.Section[i];
      }
      insightsArray.push(insight);

      if ($chargeData.Section[i].Collapsible == false) {
        chargesArray.push([$chargeData.Section[i]]);
      }
    }

    if (insightsArray.length == 0) {
      bulkPosition = 0;
    }
  }
</script>

<div class="refreshable">
  {#if $chargeLoading || $loading}
    <div class="charge-detailes"><mic-loading /></div>
    <div class="insights"><mic-loading /></div>
  {:else if arrayOfCharges && invoiceTotalArray}
    {#each arrayOfCharges as charge, i}
      {#if charge && charge.SectionType}
        {#if charge.SectionType !== "InvoiceTotal"}
          <div class="charge-detailes">
            {#if arrayOfCharges[i + 1] && arrayOfCharges[i + 1].SectionType == "InvoiceTotal" && invoiceTotalArray && invoiceTotalArray[0]}
              <mic-billingsummary-combo
                charges={[charge]}
                invoicetotal={invoiceTotalArray}
              />
              <!-- <MicChargeDetailsCombo
                charges={[charge]}
                invoicetotal={invoiceTotalArray}
              /> -->
            {:else if charge.SectionType !== "InvoiceTotal"}
              <mic-billingsummary-combo charges={[charge]} invoicetotal={""} />
              <!-- <MicChargeDetailsCombo charges={[charge]} invoicetotal={""} /> -->
            {/if}
            {#if $isParentAccount !== "X"}
              {#if arrayOfCharges[arrayOfCharges.length - 1] && arrayOfCharges[arrayOfCharges.length - 1].SectionType && arrayOfCharges[arrayOfCharges.length - 1].SectionType !== "InvoiceTotal"}
                {#if i == arrayOfCharges.length - 1 && arrayOfBillInsights && arrayOfBillInsights.length < arrayOfCharges.length - 1}
                  <mic-bulkdownload
                    class="mic-insights bulk-mobile"
                    {bulkurl}
                  />
                {/if}
              {:else if i == arrayOfCharges.length - 2 && arrayOfBillInsights && arrayOfBillInsights.length < arrayOfCharges.length - 1}
                <mic-bulkdownload class="mic-insights bulk-mobile" {bulkurl} />
              {/if}
            {:else if $isParentAccount == "X" && i == arrayOfCharges.length - 1}
              <div class="insights">
                <mic-bulkdownload class="mic-insights bulk-mobile" {bulkurl} />
              </div>
            {/if}
          </div>
        {/if}
        {#if $isParentAccount !== "X"}
          {#if (arrayOfCharges && arrayOfCharges.length > 0 && insightsArray && insightsArray.length == 0 && i == 0) || (insightsArray[0] && insightsArray[0].length == 0)}
            <div class="insights">
              {#if $isParentAccount !== "X"}
                {#if i == 0}
                  <div class="insights">
                    <mic-bulkdownload
                      class="mic-insights bulk-desk"
                      {bulkurl}
                    />
                  </div>
                {:else if i == arrayOfCharges.length - 1}
                  <div class="insights">
                    <mic-bulkdownload
                      class="mic-insights bulk-mobile"
                      {bulkurl}
                    />
                  </div>
                {/if}
              {/if}
            </div>
          {:else if charge.SectionType !== "InvoiceTotal"}
            {#if insightsArray && insightsArray[i] && insightsArray[i].length > 0}
              <div class="insights">
                <mic-insights-combo
                  insightservices={insightsArray[i]}
                  emptytabs={emptyTabs}
                />
                <!-- <MicBillInsightsCombo
                  insightservices={insightsArray[i]}
                  emptytabs={emptyTabs}
                /> -->
                {#if $isParentAccount !== "X"}
                  {#if bulkPosition == i}
                    {#if arrayOfBillInsights && arrayOfBillInsights.length >= arrayOfCharges.length - 1}
                      <mic-bulkdownload
                        class="mic-insights bulk-mobile"
                        {bulkurl}
                      />
                    {/if}
                    <mic-bulkdownload
                      class="mic-insights bulk-desk"
                      {bulkurl}
                    />
                  {/if}
                {/if}
              </div>
            {:else}
              <div class="insights" />
            {/if}
          {/if}
        {:else if $isParentAccount == "X"}
          {#if i == 0}
            <div class="insights">
              <mic-bulkdownload class="mic-insights bulk-desk" {bulkurl} />
            </div>
          {/if}
        {/if}
      {/if}
    {/each}
  {:else}
    <div class="charge-detailes" />
    <div class="insights">
      <mic-bulkdownload class="mic-insights" {bulkurl} />
    </div>
  {/if}
</div>

<style lang="scss">
  .bulk-mobile {
    display: none;
    @media screen and (max-width: 992px) {
      display: unset;
    }
  }
  .bulk-desk {
    @media screen and (max-width: 992px) {
      display: none;
    }
  }
  .refreshable {
    display: grid;
    flex-direction: row;
    column-gap: 30px;
    row-gap: 30px;
    grid-template-columns: calc(66.66% - 30px) 33.33%;
    width: 100%;
    @media screen and (max-width: 992px) {
      grid-template-columns: 100%;
    }

    & > div {
      @if height == 0 {
        display: none;
      }
    }
  }
  .charge-detailes {
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  .mic-insights {
    width: 100%;
    // max-width: 410px;
    @media screen and (max-width: 767px) {
      max-width: unset;
    }
  }
</style>
