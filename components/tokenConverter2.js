import React from 'react';
import data from '../data/data';
import SelectCurrency from '../components/SelectCurrency'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currencies: data.currencies,
            currencyA: data.currencies[0],
            currencyB: data.currencies[1],
            currencyAval: data.currencies[0].sellRate,
            currencyBval: data.currencies[1].sellRate
        }

        this.onSelectCurrency = this.onSelectCurrency.bind(this);

    }

    onSelectCurrency(code) {
        //console.log('selecting currency: '+code);
        const { currencies, currencyAval } = this.state;
        const currency = currencies.filter(currency => currency.code === code);
        this.setState({
            currencyB: currency[0], // this is an array with one item
            currencyBval: currencyAval * currency[0].sellRate
        })
    }

    onChangeHandler(e, currency) {

        const { currencyA, currencyB } = this.state;

        if (currency === 'A') {

            const newValueA = e.target.value;
            this.setState({
                currencyAval: newValueA,
                currencyBval: newValueA * currencyB.sellRate
            })

        } else if (currency === 'B') {

            const newValueB = e.target.value;
            this.setState({
                currencyAval: newValueB / currencyB.sellRate,
                currencyBval: newValueB
            })

        }

    }

    render() {
        const { currencies, currencyA, currencyB, currencyAval, currencyBval } = this.state;
        return (
            <div>
                <div>
                    <div class="flex justify-center">
                        <SelectCurrency currencies={currencies} onSelectCurrency={this.onSelectCurrency} />
                        <input
                            class="w-30 form-control form-control-lg mx-3 my-1 bg-white hover:bg-gray-100 text-black font-semibold w-1/6 py-2 px-4 border-2 border-gray-400 rounded shadow m-1"
                            type="number"
                            value={currencyAval}
                            aria-describedby="basic-addon2"
                            step="1"
                            pattern="\d\.\d{2}"
                            onChange={(e) => {
                                this.onChangeHandler(e, 'A');
                            }} />
                    </div>
                    <div class="flex justify-left">
                        <button class="w-30 justify-center my-1 bg-white hover:bg-gray-400 text-black font-semibold py-2 px-4 border-2 border-gray-400 rounded shadow m-1">United States Dollar</button>
                        <input class="w-30 form-control form-control-lg mx-3 my-1 bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border-2 border-gray-400 rounded shadow m-1"
                            type="number"
                            value={currencyBval}
                            aria-describedby="basic-addon3"
                            step="1"
                            pattern="\d\.\d{2}"
                            onChange={(e) => {
                                this.onChangeHandler(e, 'B');
                            }} />
                    </div>


                </div>
                <div>
                    <div>
                        <p>
                            Exchange Rate {` ${currencyA.sellRate} ${currencyA.code}`} = {`${currencyB.sellRate} ${currencyB.code}`}
                        </p>
                    </div>
                </div>
            </div >
        )
    }
}

export default App;