import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-material-ui';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const propTypes = {
    position: PropTypes.object,
    data:PropTypes.array
};

const defaultProps = {
    position: {},
    data: []
};

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position:{
                latitude: -15.7942287,
                longitude: -47.8821658
            },
            item:{}
        };
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.map.animateToRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
            this.setState({
                position:{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            })
        }, (error) => {
            
        }, {
            enableHighAccuracy: true,
            timeout: 5000
        });
    }

    showSine = (sine) => {
        this.setState({item:sine})
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <MapView
                        ref={ref => { this.map = ref; }}
                        style={{...StyleSheet.absoluteFillObject, zIndex: 9}}
                        initialRegion={{
                            latitude: this.state.position.latitude,
                            longitude: this.state.position.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        minZoomLevel={12}
                        maxZoomLevel={12}
                        zoomControlEnabled={true}
                        zoomEnabled={true}
                        showsScale={true}

                    >
                        {
                            this.props.data.map(sine => {
                                return (
                                    <Marker
                                        coordinate={{
                                            latitude: sine["latitude"],
                                            longitude: sine["longitude"]
                                        }}
                                        key={sine["Código Posto"]}
                                        onPress={() => this.showSine(sine)}
                                    />
                                    )
                                }
                        )}
                    </MapView>
                    {
                        this.state.item["Nome Posto"] && (
                            <View style={{width:"100%",position:"absolute",bottom: 10, zIndex:10}}>
                                <Card onPress={() => this.props.openSine(this.state.item)}>
                                    <ListItem
                                        leftElement="business-center"
                                        centerElement={{
                                            primaryText: this.state.item["Nome Posto"],
                                            secondaryText: "Entidade: "+this.state.item["Entidade Conveniada"],
                                        }}
                                    />
                                </Card>
                            </View>
                        )
                    }
                </View>
            </View>
        );
    }
}

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;