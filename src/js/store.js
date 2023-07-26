// @ts-nocheck
'use strict';

import { writable, derived } from 'svelte/store';

export const showMessagesModal = writable(false);
export function showmodal() {
    showMessagesModal.set(!showMessagesModal);
}
export const showToolTipDetails = writable(false);
// date for bill selector
let newDate = new Date();
let year = newDate.getFullYear();
let month = newDate.getMonth();
export const date = writable(month + 1 + ' ' + year);
export const CopmarsionDate = writable(month + 1 + ' ' + (year - 1));

//* close all tooltip
export const tooltipShow = writable(false);
export const resetToolTip = (show) => {
    tooltipShow.set(show)
}
//* bill nubmer
export const billNumber = writable(''); // billNimber
export const changeBillNumber = (num) => {
    billNumber.set(num);
}
//* Domain changing
export const apiDomain = writable('')
export const setDomain = (domain) => {
    apiDomain.set(domain);
}
//* api token
export const apiToken = writable({});
export const setToken = (token) => {
    apiToken.set(token);
}
export const eventsDomain = writable('')
export const setEventDomain = (domain) => {
    eventsDomain.set(domain)
}
export const SAPToken = writable("");
export const setSAPTpken = (token) => {
    SAPToken.set(token)
}
export const assetsUrl = writable('')
export const setAssetsUrl = (domain) => {
    assetsUrl.set(domain)
}
//children account flag:
export const isSummaryAccountFlag = writable("false");
export const setSummaryAccountFlag = (flag) => {
    isSummaryAccountFlag.set(flag);
}

// parent account flag
export const isParentAccount = writable("");
export const setIsParentAccount = (flag) => {
    isParentAccount.set(flag);
}
// no charge flage
export const isChargeAmmount = writable("");
export const setIsChargeAmmount = (flag) => {
    isChargeAmmount.set(flag);
}

export const getDate = derived(
    date,
    $date => $date
);
export const generatedFromTable = writable(false);
//* Sunselect array;
export const sunSelectServicesArray = writable([]);
//*geral error flag;
export const generalErr = writable(false);

//* Agint persona:
export const persona = writable('')

//
export const latestBill = writable('10101011');

export const pendingRequest = writable([])
export const globalFetch = () => {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});

    const getData = async (token, url) => {
        loading.set(true);
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                const Publishresponse = await fetch(url, {});
                data.set(await Publishresponse.json());

            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
        }
        loading.set(false);
    }

    return [data, loading, error, getData]
}

export const fetchDailyUsageChart = () => {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});

    const getData = async (token, url) => {
        loading.set(true);
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                const Publishresponse = await fetch(url, {});
                data.set(await Publishresponse.json());

            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
        }
        //  finally {

        // }
        loading.set(false);
    }

    return [data, loading, error, getData]
}
export const fetchMonthlyUsageChart = () => {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});

    const getData = async (token, url) => {
        loading.set(true);
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                const Publishresponse = await fetch(url, {});
                data.set(await Publishresponse.json());
            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
        }
        //  finally {
        //     arrOfRequests.pop()
        //     pendingRequest.set(arrOfRequests);
        // }
        loading.set(false);
    }

    return [data, loading, error, getData]
}