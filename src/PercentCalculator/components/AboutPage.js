import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';





class AboutPage extends React.Component {



    render() {


    // console.log('ABOUT PAGE WIDTH IS ' + Dimensions.get('window').width)

        return(
            this.props.showAboutPageStatus ? (
                <View style={styles.outerContainer}>
                    <View style={styles.middleBoxContainer}>
                        <Text style={styles.appTitleText}>Percentage Calculator !!!</Text>
                        {/* <Text style={styles.appTitleText}>Version 18.1</Text> */}
                        <Text style={styles.appTitleText}></Text>
                        <Text style={styles.feedbackText}>contact and feedback:</Text>
                        <Text style={styles.feedbackText}>leisuremob@gmail.com</Text>
                        <Text style={styles.feedbackText}></Text>
                        <Text style={styles.copyrightText}>© Copyright LeisureMob 2010 - present</Text>
                    </View>
                </View>
            ): (
                null
            )
            
        )
    }
}



let isTabletDevice = Dimensions.get('window').width >= 768
let tabletScaleFactor;

if(isTabletDevice) {//table, so make font smaller
    tabletScaleFactor = 0.75
}
else {
    tabletScaleFactor = 1//no change
}


let styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        height: '94%',//94% because buttonsmalls panel is 6%, dont cover up buttonsmalls
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleBoxContainer: {
        backgroundColor: 'white',
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appTitleText: {
        fontSize: Dimensions.get('window').width * 0.045 * tabletScaleFactor,
        color: 'blue'

    },
    feedbackText: {
        fontSize: Dimensions.get('window').width * 0.045 * tabletScaleFactor,
        color: 'brown'

    },
    copyrightText: {
        fontSize: Dimensions.get('window').width * 0.045 * tabletScaleFactor,
        color: 'black'

    }
})





const mapStateToProps = (state) => ({
    showAboutPageStatus: state.aboutPage.showAboutPageStatus
})


export default connect(mapStateToProps)(AboutPage)