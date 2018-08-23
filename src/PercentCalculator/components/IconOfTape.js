import React, { Component } from 'react'
import { Text, View, StyleSheet , Dimensions, ScrollView} from 'react-native'
import {connect} from "react-redux";
import {updateShowTapeStatus}  from "../../../actions/tapeActions";



class IconOfTape extends React.Component {

    handleClick = () => {

        this.props.dispatch(updateShowTapeStatus( ! this.props.showTapeStatus))

    }
    render() {

        let styles = StyleSheet.create({
            iconsContainer: {
                flex: 1,
                flexDirection: "row",
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                justifyContent: "space-between",
                alignItems: "flex-start",
                backgroundColor: "transparent",
                paddingLeft: 10,
                paddingRight: 10
              },
              iconsText: {
                fontSize: Dimensions.get('window').width/25,
                color: "gray"
              }
        })

        return(
            <View> 
                <Text style={styles.iconsText} onPress={this.handleClick}>Tape</Text>
                
            </View>
            )

        
    }
}




const mapStateToProps = (state) => ({
    showTapeStatus: state.tape.showTapeStatus
})


export default connect(mapStateToProps)(IconOfTape)

