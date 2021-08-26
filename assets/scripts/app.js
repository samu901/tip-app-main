const txtBill = document.getElementsByName('txtBill')[0];
const txtPeople = document.getElementsByName('txtPeople')[0];
const tips = document.querySelectorAll('div.tip');
const customTip = document.querySelector('div#custom input');
const pError = document.querySelector('span.error');
const lblTipAmount = document.getElementById('tipAmount');
const lblTotal = document.getElementById('total');
const btnReset = document.getElementById('btnReset');
let selectedTip = 0;

function setError(){
    txtPeople.classList.add('error');
    pError.style.display = "block";
}

function calculate(){
    const bill = Math.max(txtBill.value, 0);
    const people = txtPeople.value;
    if(people > 0){
        txtPeople.classList.remove('error');
        pError.style.display = "none";
        const n = bill/people;
        let tipAmount = selectedTip > 0 ? (n*selectedTip/100) : n;
        tipAmount = tipAmount.toFixed(2);
        const total = (+n + +tipAmount).toFixed(2);
        lblTipAmount.textContent = `$${tipAmount}`;
        lblTotal.textContent = `$${total}`;

    }else{
        setError();
        lblTipAmount.textContent = '$0.00';
        lblTotal.textContent = '$0.00';
    }
}

function resetAllTips(){
    customTip.value = "";
    tips.forEach(tip => tip.classList.remove('active'));
}

tips.forEach(tip => {
    tip.addEventListener('click', () => {
        resetAllTips();
        tip.classList.add('active');
        const tempTip = tip.textContent.split("%")[0];
        selectedTip = Math.max(tempTip, 0);
        calculate();
    });
})

customTip.addEventListener('change', e => {
    e.stopPropagation();
    selectedTip = Math.max(+customTip.value, 0);
    calculate();
})

txtBill.addEventListener('change', () => calculate() );
txtPeople.addEventListener('change', () => calculate() );

btnReset.addEventListener('click', () => {
    setError();
    resetAllTips();
    txtBill.value = "0";
    txtPeople.value = "0";
    lblTipAmount.textContent = "$0.00";
    lblTotal.textContent = "$0.00";
});