import React from 'react';
import { View } from 'react-native';
import { Toolbar, BottomNavigation } from 'react-native-material-ui';
import { StackActions } from 'react-navigation';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import Map from '../components/Map';
import List from '../components/List';
import { get } from '../services/sine';
import { getState,states } from '../utils/constants';
import SplashScreen from 'react-native-splash-screen'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: "map",
            data:[],
            dataAll:[],
            dialogInfo: false,
            states:states,
            statesAll:states
        };
    }

    componentDidMount(){
        let data = get();
        this.setState({data,dataAll:data});
        SplashScreen.hide();
    }

    onPress(state){
        const resetAction = StackActions.push({
            index: 0,
            params: { state:state },
            routeName: 'Sines',
        });
        this.props.navigation.dispatch(resetAction);
    }

    openInfo(){
        this.setState({dialogInfo:true})
    }

    openSine = (item) => {
        const resetAction = StackActions.push({
            index: 0,
            params: { sine:item, state:getState(item["UF Posto"]) },
            routeName: 'Sine',
        });
        this.props.navigation.dispatch(resetAction);
    }

    search = text => {
        let states = this.state.statesAll.filter(state => state.estado.toLowerCase().includes(text.toLowerCase()));
        this.setState({states});
    }

    searchClosed = () => {
        this.setState({sines:this.state.sinesAll});
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Toolbar
                    centerElement="SINE Brasil"
                    searchable={
                        this.state.active=="list" ? {
                            autoFocus: true,
                            placeholder: 'Search',
                            onChangeText: this.search,
                            onSearchClosed: this.searchClosed,
                            onSearchCloseRequested: this.searchClosed
                        } : null}
                    rightElement={this.state.active!="list" ? "info" : null}
                    onRightElementPress={ () => this.openInfo() }
                />
                {
                    this.state.active=="map" ? <Map data={this.state.data} openSine={(sine) => this.openSine(sine)} /> : <List data={this.state.data} states={this.state.states} onPress={(state) => this.onPress(state)} />
                }
                <BottomNavigation active={this.state.active} >
                    <BottomNavigation.Action
                        key="map"
                        icon="map"
                        label="Localização"
                        onPress={() => this.setState({ active: 'map' })}
                    />
                    <BottomNavigation.Action
                        key="list"
                        icon="business-center"
                        label="SINEs"
                        onPress={() => this.setState({ active: 'list' })}
                    />
                </BottomNavigation>

                <ConfirmDialog
                    visible={this.state.dialogInfo}
                    title="SINE Brasil"
                    message="Este aplicativo tem por objetivo mostrar onde se encontram todos os postos do Sistema Nacional de Emprego (SINE). O SINE é uma ferramenta do Ministério do Trabalho que facilita e é responsável por intermediar a mão-de-obra com as vagas de emprego no Brasil."
                    onTouchOutside={() => this.setState({dialogInfo: false})}
                    positiveButton={{
                        title: "Está bem!!!",
                        onPress: () => this.setState({dialogInfo: false})
                    }} >
                </ConfirmDialog>
            </View>
        );
    }
}