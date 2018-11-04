import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Toolbar, ActionButton, Subheader, Card, Divider } from 'react-native-material-ui';
import { ProgressDialog } from 'react-native-simple-dialogs';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import ItemSine from '../components/ItemSine';

import { GOOGLE_KEY } from '../utils/constants';
import colors from '../utils/colors';

export default class SinesScreen extends React.Component {
    constructor(props) {
        super(props);

        let sine = props.navigation.state.params.sine;
        let phone = sine["Telefone Posto"]+"";
        sine["Telefone Posto"] = phone.substring(0, 4) + '-' + phone.substring(4, 8);

        this.state = {
            sine,
            state: props.navigation.state.params.state,
            direction: false,
            loading: false,
            origin:{}
        };
    }

    direction(){
        this.setState({loading:true})
        navigator.geolocation.getCurrentPosition((position) => {
            let origin = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            this.map.fitToCoordinates([
                origin,
                {
                    latitude: this.state.sine.latitude,
                    longitude: this.state.sine.longitude
                }
            ], {
                edgePadding:{ top: 40, right: 40, bottom: 40, left: 40 },
                animated: true,
            });

            this.setState({
                origin,
                loading:false,
                direction:true
            });
        }, (error) => {
            
        }, {
            enableHighAccuracy: true,
            timeout: 5000
        });
    }

    onMap(){
        this.map.fitToCoordinates([
            {
                latitude: this.state.sine.latitude,
                longitude: this.state.sine.longitude
            }
        ], {
            edgePadding:{ top: 40, right: 40, bottom: 40, left: 40 },
            animated: true,
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Toolbar
                    centerElement={this.state.sine["Nome Posto"]}
                    leftElement="arrow-back"
                    style={{
                        container:{
                            backgroundColor:'transparent',
                            zIndex:3000
                        },
                        titleText:{
                            color: "black"
                        },
                        leftElement:{
                            color:"black"
                        }
                    }}
                    onLeftElementPress={ () => this.props.navigation.pop() }
                />
                <View style={{...StyleSheet.absoluteFillObject,flex:1,height:300,zIndex:1}}>
                    <MapView
                        style={{height:300}}
                        initialRegion={{
                            latitude: this.state.sine.latitude,
                            longitude: this.state.sine.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onLayout={() => this.onMap()}
                        ref={ref => { this.map = ref; }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.sine.latitude,
                                longitude: this.state.sine.longitude
                            }}
                            title={this.state.sine["Nome Posto"]}
                        />
                        {
                            this.state.direction && (
                                <MapView.Marker
                                    coordinate={{
                                        latitude: this.state.origin.latitude,
                                        longitude: this.state.origin.longitude
                                    }}
                                    title="Você"
                                />
                            )
                        }
                        {
                            this.state.direction && (
                                <MapViewDirections
                                    origin={{
                                        latitude: this.state.origin.latitude,
                                        longitude: this.state.origin.longitude
                                    }}
                                    destination={{
                                        latitude: this.state.sine.latitude,
                                        longitude: this.state.sine.longitude
                                    }}
                                    apikey={GOOGLE_KEY}
                                    strokeColor={colors.dark}
                                    strokeWidth={8}
                                />
                            )
                        }
                    </MapView>
                    <ActionButton style={{container:{bottom:-45}}} icon="directions" onPress={() => this.direction()} />
                </View>
                <ScrollView style={{marginTop:260,zIndex:0}}>
                    <View style={{flex:1, marginBottom:12}}>
                        <Subheader text="Detalhes do Sine" />
                        <View style={{marginLeft:6, marginRight:6}}>
                            <Card>
                                <View style={{marginLeft:12, marginRight:12}}>
                                    <ItemSine title="Código" value={this.state.sine["Código Posto"]} />
                                    <Divider/>
                                    <ItemSine title="Nome" value={this.state.sine["Nome Posto"]} />
                                    <Divider/>
                                    <ItemSine title="Entidade Conveniada" value={this.state.sine["Entidade Conveniada"]} />
                                    {
                                        this.state.sine["Telefone Posto"]!="0-" && (
                                            <View>
                                                <Divider/>
                                                <ItemSine title="Telefone" value={this.state.sine["Telefone Posto"]} />
                                            </View>
                                        )
                                    }
                                </View>
                            </Card>
                        </View>
                        <Subheader text="Endereço" />
                        <View style={{marginLeft:6, marginRight:6}}>
                            <Card>
                                <View style={{marginLeft:12, marginRight:12}}>
                                    <ItemSine title="Logradouro" value={this.state.sine["Endereço Posto"]} />
                                    <Divider/>
                                    <ItemSine title="Bairro" value={this.state.sine["Bairro Posto"]} />
                                    <Divider/>
                                    <ItemSine title="Cidade/UF" value={this.state.sine["Município Posto"]+"/"+this.state.state.estadoabrev} />
                                    <Divider/>
                                    <ItemSine title="CEP" value={this.state.sine["CEP Posto"]+""} />
                                </View>
                            </Card>
                        </View>
                    </View>
                </ScrollView>
                <ProgressDialog
                    visible={this.state.loading}
                    title="Progress Dialog"
                    message="Please, wait..."
                />
            </View>
        );
    }
}