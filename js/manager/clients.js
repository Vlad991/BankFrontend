var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);

function myLoad() {
    showClientsInfo();
// Client Menu events
    doc.getElementById("v-pills-info-tab").addEventListener("click", showClientInfo);
    doc.getElementById("v-pills-cards-tab").addEventListener("click", showCreditCardList);


};