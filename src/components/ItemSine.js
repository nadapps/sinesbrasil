import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Col, Row } from "react-native-easy-grid";

const propTypes = {
    title: PropTypes.string,
    value: PropTypes.string
};

const defaultProps = {
    title: "",
    value: ""
};

class ItemSine extends React.Component {

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <Row style={{marginBottom:10, marginTop:10}}>
                <Col size={1}><Text style={{fontWeight:'bold'}}>{this.props.title}</Text></Col>
                <Col size={2}><Text style={{textAlign:"right"}}>{this.Capitalize(this.props.value)}</Text></Col>
            </Row>
        );
    }
}

ItemSine.propTypes = propTypes;
ItemSine.defaultProps = defaultProps;

export default ItemSine;