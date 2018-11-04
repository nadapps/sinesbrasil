import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Image } from 'react-native';
import { ListItem, Card } from 'react-native-material-ui';

const propTypes = {
    data: PropTypes.array,
    onPress: PropTypes.func,
    states: PropTypes.array
};

const defaultProps = {
    data: [],
    states: []
};

class List extends React.Component {

    renderItem = ({item,index}) => {
        return (
            <Card onPress={() => this.props.onPress(item)}>
                <ListItem
                    dense
                    centerElement={{
                        primaryText: item.estado+" - "+item.estadoabrev,
                    }}
                    leftElement={<Image resizeMode="cover" style={{width:35,height:25}} source={{ uri: item.bandeira }}/>}
                />
            </Card>
        )
    }

    render() {
        return (
            <View style={{flex:1}}>
                <FlatList
                    style={{flex:1,marginTop:3,marginBottom:3}}
                    keyExtractor={(index) => index+"" }
                    data={this.props.states}
                    renderItem={this.renderItem} />
            </View>
        );
    }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;