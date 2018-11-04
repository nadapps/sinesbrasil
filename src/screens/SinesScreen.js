import React from 'react';
import { View, FlatList } from 'react-native';
import { Toolbar, Card, ListItem } from 'react-native-material-ui';
import { StackActions } from 'react-navigation';

import { getState } from '../services/sine';

export default class SinesScreen extends React.Component {
    constructor(props) {
        super(props);

        let sines = getState(props.navigation.state.params.state.estado);
        this.state = {
            state: props.navigation.state.params.state,
            sines,
            sinesAll:sines
        };
    }

    componentDidMount(){
        
    }

    openSine = (item) => {
        const resetAction = StackActions.push({
            index: 0,
            params: { sine:item, state:this.state.state },
            routeName: 'Sine',
        });
        this.props.navigation.dispatch(resetAction);
    }

    renderItem = ({item,index}) => {
        return (
            <Card key={index} onPress={() => this.openSine(item)}>
                <ListItem
                    leftElement="business-center"
                    centerElement={{
                        primaryText: item["Nome Posto"],
                        secondaryText: "Entidade: "+item["Entidade Conveniada"],
                    }}
                />
            </Card>
        )
    }

    search = text => {
        let sines = this.state.sinesAll.filter(sine => sine["Nome Posto"].toLowerCase().includes(text.toLowerCase()));
        this.setState({sines});
    }

    searchClosed = () => {
        this.setState({sines:this.state.sinesAll});
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Toolbar
                    centerElement={this.state.state.estado}
                    leftElement="arrow-back"
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Pesquisar...',
                        onChangeText: this.search,
                        onSearchClosed: this.searchClosed,
                        onSearchCloseRequested: this.searchClosed
                    }}
                    onLeftElementPress={ () => this.props.navigation.pop() }
                />
                <FlatList
                    style={{flex:1,marginTop:3,marginBottom:3}}
                    keyExtractor={(index) => index+"" }
                    data={this.state.sines}
                    renderItem={this.renderItem} />
            </View>
        );
    }
}