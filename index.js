'use-strict';
/* global, $ */

const state = {
  subTotal: 0,
  tip: 0,
  total: 0,
  tipTotal: 0,
  mealCount: 0,
  averageTip: 0,
}

function handleSubmit() {
  $('#meal-details').submit(e => {
    e.preventDefault();
    console.log('submit clicked')
    const mealPrice = parseFloat($('#meal-amount').val());
    const taxRate = parseFloat($('#meal-tax-rate').val());
    let tipPercent = parseFloat($('#meal-percentage').val());
    $('#meal-amount').val('');
    $('#meal-tax-rate').val('');
    $('#meal-percentage').val('');
    if (!mealPrice) {
      throw "Base Meal Price must be a number!"
    }
    else if (!taxRate) {
      throw "Tax Rate must be a number!"
    }
    else if (!tipPercent) {
      tipPercent = 0;
      updateState(mealPrice, taxRate, tipPercent);
      render();
    }
  })
}

function handleReset() {
  $('.reset-button').on('click', e => {
    e.preventDefault();
    state.subTotal = 0;
    state.tip = 0;
    state.total = 0;
    state.mealCount = 0;
    state.tipTotal = 0;
    state.averageTip = 0;
    render();
  })
}

function updateState(price, tax, tip) {
  state.subTotal = (price + ((tax / 100) * price)).toFixed(2);
  state.tip = (price * (tip / 100)).toFixed(2);
  state.total = (parseFloat(state.subTotal) + parseFloat(state.tip)).toFixed(2);
  state.mealCount++;
  state.tipTotal = (parseFloat(state.tip) + parseFloat(state.tipTotal)).toFixed(2);
  state.averageTip = (state.tipTotal / state.mealCount).toFixed(2);
}

function render() {
  $('.customer-charges').html(`<section id="waitstaff-section">
  <h2>Customer Charges</h2>
  <p class="subtotal-charges">Subtotal: $${state.subTotal} </p>
  <p class="tip-charges">Tip: $${state.tip} </p>
  <p class="total-charges">Total: $${state.total} </p>
</section>

<section id="waitstaff-section">
  <h2>My Earnings Info</h2>
  <p class="tip-total"> Tip Total: $${state.tipTotal} </p>
  <p class="meal-count">Meal count: ${state.mealCount} </p>
  <p class="average-tip-meal">Average Tip Per Meal: $${state.averageTip} </p>
</section>`);
}

function handleWaitstaff() {
  render();
  handleSubmit();
  handleReset();
}

$(handleWaitstaff);