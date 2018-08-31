import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';





class AboutPage extends React.Component {



    render() {


        return(
            this.props.showAboutPageStatus ? (
                <View style={styles.outerContainer}>
                    <View style={styles.middleBoxContainer}>
                        <Text style={styles.appTitleText}>Advanced Percent Calculator</Text>
                        <Text style={styles.appTitleText}>Version 18.1</Text>
                        <Text style={styles.appTitleText}></Text>
                        <Text style={styles.copyRightText}>© CopyRight LeisureMob 2010 - present</Text>
                        <Text style={styles.copyRightText}>feedback: leisuremob@gmail.com</Text>

                    </View>
                </View>
            ): (
                null
            )
            
        )
    }
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
        fontSize: Dimensions.get('window').height * 0.025,
        color: 'blue'

    }
})


const mapStateToProps = (state) => ({
    showAboutPageStatus: state.aboutPage.showAboutPageStatus
})




export default connect(mapStateToProps)(AboutPage)