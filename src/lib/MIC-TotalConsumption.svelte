<svelte:options tag="mic-consumption-viewer" />

<script>
  // @ts-nocheck
  import { chart } from "../js/svelte-apexcharts";
  import { renderDonutChart } from "../js/chart-options";
  import { fetchDailyUsageChart } from "../js/store";
  import { onMount } from "svelte";

  export let conurl;

  const [data, loading, error, get] = fetchDailyUsageChart();

  onMount(() => {
    get("token", conurl);
  });

  $: if ($data && $data.Consumption) {
    console.log($data);
  }
  let colors = [
    "#000",
    "#16a34a",
    "#c9239c",
    "#6b7280",
    "#ffdc00",
    "#16a34a",
    "#c9239c",
    "#6b7280",
    "#ffdc00",
    "#16a34a",
    "#c9239c",
    "#6b7280",
    "#ffdc00",
    "#ffdc00",
  ];
</script>

{#if $loading}
  loding...
{:else if $data && $data.Consumption}
  <div class="card">
    <div class="chart-con">
      <div
        class="chart"
        use:chart={renderDonutChart($data.Consumption, colors)}
      />
      <div class="chart-list">
        {#each $data.Consumption as val, i}
          <div style="color: {colors[i]};" class="legend">
            <span>{val.YearNo}</span>
            <span>{val.Consumption.toLocaleString()} kWh</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
{:else if $data && $data.Consumption}
  Error...
{/if}

<style lang="scss">
  * {
    font-family: "interstate" !important;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.3s;
    @media screen and (max-width: 830px) {
      width: 100%;
    }
  }
  .chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    max-width: 250px;
    gap: 20px;
    @media screen and (max-width: 830px) {
      transform: scale(0.8);
    }
  }
  .chart-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: scale(0.8);
    gap: 20px;
    span {
      font-size: 22px;
    }
  }
  .chart-con {
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 830px) {
      width: 100%;
      flex-direction: column;
    }
  }
  .legend {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    border-bottom: 1.3px #80808040 solid;
    padding-bottom: 8px;
  }
  .card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0px;
    width: 100%;
    height: 40px;
    border-bottom: 2px #80808040 solid;
    padding-bottom: 8px;
    h4 {
      color: #005faa;
    }
  }
</style>
