import React from 'react'
import {Dimensions ,StyleSheet,TouchableOpacity, Text } from 'react-native'
import {  connect } from "react-redux";
import { updateCurrentCurrency } from '../../../actions/currencyActions';




class IconCurrencySign extends React.Component {


    handleClick = () => {

        let indexOfCurrentCurrency = 0//default

        let currenciesArr = ['$', '¥', '£', '€']

        //get index of current currency
        currenciesArr.forEach( (currencySign, index) => {
            if(currencySign === this.props.currentCurrency) {
                indexOfCurrentCurrency = index
            }
        })


        let indexOfNextCurrency = indexOfCurrentCurrency + 1

        if(indexOfNextCurrency > (currenciesArr.length - 1)) {//fallen of edge
            indexOfNextCurrency = 0
        }

        nextCurrencySign = currenciesArr[indexOfNextCurrency]

        this.props.dispatch(updateCurrentCurrency(nextCurrencySign))

    }






    render() {

        let tabletScaleFactor = 1
        if(Dimensions.get('window').width >= 768 ) {
            tabletScaleFactor = 0.75
        }


        
        let styles = StyleSheet.create({
            container: {
                position:'absolute',
                bottom: '2%',
                left: '1.5%',
                backgroundColor: 'transparent',
                height: '10%',
                width: '50%',
            },
            iconText: {
                color: 'grey',
                fontSize: Dimensions.get('window').width * 0.035 * tabletScaleFactor,
                textAlign: 'left'
            }
        })



        let iconTextToShow;
        
        //show icon only when 'reeady' is shown,, else get out of calculatoin's way
        if(this.props.screenMidScreenMessage == 'Ready') {
            iconTextToShow = ` currency: ${this.props.currentCurrency}`
        }
        else {
            iconTextToShow = ''
        }


        return(
            <TouchableOpacity style={styles.container}onPress={this.handleClick}>
                <Text style={styles.iconText}>{iconTextToShow}</Text>
            </TouchableOpacity>
        )
    }
}







const mapStateToProps = (state) => ({
    currentCurrency: state.currency.currentCurrency,
    screenMidScreenMessage: state.calculatorStateData.screenMidScreenMessage,
    // segmentsArray: state.calculatorStateData.segmentsArray
})

export default connect(mapStateToProps)(IconCurrencySign)