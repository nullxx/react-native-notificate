
import React from 'react';
import { View, Animated, SafeAreaView, Text, Image, Dimensions, ScrollView } from 'react-native';

export default class Notificate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notAnim: new Animated.Value(-1000),
            hideAnimTime: props.time,
            animTitle: props.title,
            animMsg: props.msg,
            autoHide: props.autoHide,
            closed: false
        };
    }
    present() {
        return new Promise((res) => {
            Animated.spring(
                this.state.notAnim,
                {
                    toValue: 50,
                    friction: 6,
                    useNativeDriver: true
                }
            ).start(() => {
                this.setState({ closed: false })
                res()
            })
        })

    }
    close() {
        return new Promise((res) => {
            Animated.spring(
                this.state.notAnim,
                {
                    toValue: -1000,
                    useNativeDriver: true
                }
            ).start(() => {
                this.setState({ closed: true })
                res()
            })
        })

    }
    scheduleClose() {
        setTimeout(() => {
            if (!this.state.closed) {
                this.close()
            }
        }, this.state.hideAnimTime);
    }
    componentDidMount() {
        this.present().then(() => {
            if (this.state.autoHide) {
                this.scheduleClose()
            }
        })


    }
    render() {
        return (
            // <SafeAreaView>
            <Animated.View style={{
                transform: [{ translateY: this.state.notAnim }], alignItems: 'center', shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 6,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                // bottom: 0,
                zIndex: 99
            }}>
                <View
                    style={{ height: 100, backgroundColor: '#b6b6b6', width: '80%', borderRadius: 20, }}
                >
                    <View style={{ flexDirection: 'row', height: '100%', paddingLeft: 10 }}>
                        <View style={{ height: '100%', width: '15%', justifyContent: 'center' }} >
                            <Image
                                source={require('./assets/information.png')}
                                style={{
                                    height: '90%',
                                    width: '90%',
                                    resizeMode: 'contain'
                                }}
                            />
                        </View>
                        <View style={{ height: '100%', width: '100%', paddingTop: 10, paddingRight: 10, paddingBottom: 5 }}>
                            <View style={{ backgroundColor: 'transparent', width: '85%', }}>
                                <View style={{ height: '30%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.animTitle}</Text>
                                </View>
                                <View style={{ height: '70%' }}>
                                    <ScrollView>
                                        <Text>{this.state.animMsg}</Text>
                                    </ScrollView>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </Animated.View>

            // </SafeAreaView>
        )
    }
}
