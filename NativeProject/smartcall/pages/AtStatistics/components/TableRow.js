import React, {PureComponent} from 'react';
import {Text, Col, Row} from 'native-base';

export default class TableRow extends PureComponent {
  render() {
    const {left, right} = this.props;
    return (
      <Row>
        <Col size={1}>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              fontSize: 22,
              height: 60,
              lineHeight: 60,
            }}>
            {left}
          </Text>
        </Col>
        <Col size={2}>
          <Text
            style={{
              textAlign: 'center',
              borderWidth: 1,
              fontSize: 22,
              height: 60,
              lineHeight: 60,
            }}>
            {right}
          </Text>
        </Col>
      </Row>
    );
  }
}
