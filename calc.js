const bill = document.getElementById("bill");
const billErr = document.querySelector(".bill .error");
const billOutline = document.querySelector(".bill");
const tipBtns = document.querySelectorAll('input[type="radio"]');
const customTip = document.getElementById("custom");
const people = document.getElementById("people");
const peopleErr = document.querySelector(".people .error");
const peopleOutline = document.querySelector(".people");
const tipPp = document.querySelector(".tip-pp");
const totalPp = document.querySelector(".total-pp");
const reset = document.querySelector("button");

let billAmount;
let tipAmount;
let peopleAmount;

// Gets bill amount
bill.addEventListener("input", (e) => {
    billAmount = e.target.value;
    
    if (billAmount < 0) {
        billAmount = 0;
        bill.value = 0;
    } else if (billAmount == 0) {
        billErr.style.setProperty("display", "inline");
        billOutline.style.setProperty("outline", "2px solid var(--red)", "important");
    } else if (billAmount == "" || billAmount > 0) {
        billErr.style.setProperty("display", "none");
        billOutline.style.removeProperty("outline", "2px solid var(--red)");
    }

    calculate();
});

// Gets tip amount
tipBtns.forEach(tipBtn => {
    tipBtn.addEventListener("input", (e) => {
        tipAmount = e.target.value;
        // Clear custom input if radio button selected
        customTip.value = "";

        calculate();
    });
})

// Gets custom tip
customTip.addEventListener("input", (e) => {
    // Resets Tip per person to zero in case 0 entered
    tipPp.innerHTML = "$0.00"

    tipAmount = e.target.value;

    if (tipAmount < 0) {
        tipAmount = 0;
        customTip.value = 0;
    }

    // Deselect any checked radio button
    tipBtns.forEach(tipBtn => {
        if (tipBtn.checked) {
            tipBtn.checked = false;
         }
    })
    calculate();
})

// Gets number of people
people.addEventListener("input", (e) => {
    peopleAmount = e.target.value;

    if (peopleAmount < 0) {
        peopleAmount = 0;
        people.value = 0;
    } else if (peopleAmount == 0) {
        peopleErr.style.setProperty("display", "inline");
        peopleOutline.style.setProperty("outline", "2px solid var(--red)", "important");
    } else if (peopleAmount == "" || peopleAmount > 0) {
        peopleErr.style.setProperty("display", "none");
        peopleOutline.style.removeProperty("outline", "2px solid var(--red)");
    }

    calculate();
}); 

// Calculates tip amount and total per person
function calculate() {
    if (billAmount > 0 && tipAmount && peopleAmount > 0) {
        reset.style.setProperty("background-color", "var(--strong-cyan)");
        const tipTotal = (billAmount / 100) * tipAmount;
        const tipPerPerson = tipTotal / peopleAmount;
        const totalPerPerson = (billAmount / peopleAmount) + tipPerPerson;

        if (tipPerPerson > 0) {
            tipPp.innerHTML = "$" + tipPerPerson.toFixed(2);
        }
        if (totalPerPerson > 0) {
            totalPp.innerHTML = "$" + totalPerPerson.toFixed(2);
        } else {
        reset.style.setProperty("background-color", "var(--darker-grayish-cyan)");
        tipPp.innerHTML = "$0.00"
        totalPp.innerHTML = "$0.00";
    }
} else {
    tipPp.innerHTML = "$0.00";
    totalPp.innerHTML = "$0.00";
}};

// Resets all inputs
reset.addEventListener("click", () => {
    bill.value = "";
    billAmount = "";
    people.value = "";
    peopleAmount = "";
    customTip.value = "";
    tipAmount = "";

    tipBtns.forEach(tipBtn => {
        if (tipBtn.checked) {
            tipBtn.checked = false;
         }
    });

    tipPp.innerHTML = "$0.00";
    totalPp.innerHTML = "$0.00";
    reset.style.setProperty("background-color", "var(--darker-grayish-cyan)");
});