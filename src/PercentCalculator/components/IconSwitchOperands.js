import React from 'react'
import {Dimensions ,StyleSheet,TouchableOpacity, Text } from 'react-native'
import {  connect } from "react-redux";




class IconSwitchOperands extends React.Component {


    handleClick = () => {
 
    }






    render() {


        let tabletScaleFactor = 1
        
        if(Dimensions.get('window').width >= 768 ) {
            tabletScaleFactor = 0.75
        }



        


        let styles = StyleSheet.create({
            container: {
                position:'absolute',
                bottom: '3%',
                right: '1.5%',
                backgroundColor: 'transparent',
                height: '10%',
                width: '50%',
            },
            iconText: {
                color: 'rgb(244, 77, 65)',//'darkorange',
                fontSize: Dimensions.get('window').width * 0.045 * tabletScaleFactor,
                textAlign: 'right'
            }
        })



                
        


        return(
            
                this.props.showSwitchOperandsIconStatus ? (
                    <TouchableOpacity style={styles.container}onPress={this.handleClick}>
                        <Text style={styles.iconText}>switch</Text>
                    </TouchableOpacity>
                ): (
                    null
                )
        )
    }
}

 


const mapStateToProps = (state) => ({
    showSwitchOperandsIconStatus: state.switchOperands.showSwitchOperandsIconStatus,
})


export default connect(mapStateToProps)(IconSwitchOperands)





