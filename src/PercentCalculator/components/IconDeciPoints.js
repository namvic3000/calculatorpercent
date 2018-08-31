import React from 'react'
import {Dimensions ,StyleSheet,TouchableOpacity, Text } from 'react-native'
import {  connect } from "react-redux";
import { updateNumberOfDeciPoints } from "../../../actions/deciPointsActions";




class IconDeciPoints extends React.Component {


    handleClick = () => {

        let indexOfCurrentDeciPoints = 0//default

        let deciPointsArr = ['auto', '0', '1', '2', '3', '4']

        //get index of current number of decipoints in the array
        deciPointsArr.forEach( (numberOfDeciPoints, index) => {
            if(numberOfDeciPoints == this.props.currentNumberOfDeciPoints) {
                indexOfCurrentDeciPoints = index
            }
        })

     //console.log('AT DECIPONTS: INDEX IS :' + indexOfCurrentDeciPoints)

        let indexOfNextDeciPoints = indexOfCurrentDeciPoints + 1

        if(indexOfNextDeciPoints > (deciPointsArr.length - 1)) {//fallen of edge
            indexOfNextDeciPoints = 0
        }

        let nextDeciPointsValue = deciPointsArr[indexOfNextDeciPoints]// || 'auto'

     //console.log('AT DECIPONTS: NEXT DECIPONT VALUE  IS :' + nextDeciPointsValue)

        this.props.dispatch(updateNumberOfDeciPoints(nextDeciPointsValue))

    }






    render() {


        let iconTextToShow;
        
        //show icon only when 'reeady' is shown,, else get out of calculatoin's way
        if(this.props.screenMidScreenMessage == 'Ready') {
            iconTextToShow = `decimal places: ${this.props.currentNumberOfDeciPoints} `
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



let styles = StyleSheet.create({
    container: {
        position:'absolute',
        bottom: '2%',
        right: '1.5%',
        backgroundColor: 'transparent',
        height: '10%',
        width: '50%',
    },
    iconText: {
        color: 'grey',
        fontSize: Dimensions.get('window').height * 0.02,
        textAlign: 'right'
    }
})




const mapStateToProps = (state) => ({
    currentNumberOfDeciPoints: state.deciPoints.currentNumberOfDeciPoints,
    screenMidScreenMessage: state.calculatorStateData.screenMidScreenMessage
})


export default connect(mapStateToProps)(IconDeciPoints)