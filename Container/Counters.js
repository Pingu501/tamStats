import React from 'react';
import {TextInput, View, Alert} from 'react-native';
import Counter from '../Components/Molekuls/Counter';
import Button from '../Components/Atoms/Button';
import Select from '../Components/Atoms/Select';

const positionOptions = [
  {name: 'Links', value: 'Links'},
  {name: 'Mitte', value: 'Mitte'},
  {name: 'Rechts', value: 'Rechts'},
];

export default class Counters extends React.Component {
  constructor(props) {
    super(props);

    const initCounter = <Counter name="Klaus" position="Mitte"
                                 onRemoveCounter={this.onRemoveCounter}
                                 id={9}/>;

    this.state = {
      counters: [
        {id: 9, counter: initCounter},
      ],
      nextCounterId: 10,
      transientCounter: {
        name: '',
        position: 'Mitte',
      },
    };
  }

  render() {
    return (
        <View style={{
          flex: 1,
        }}>
          {this.renderCounters()}

          <View style={{
            height: 130,
            padding: 12,
            position: 'relative',
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 0,
            }}>
              <TextInput
                  style={{fontSize: 20}}
                  placeholder="Name"
                  onChangeText={this.onChangeTransientCounterName}
              />

              <Select options={positionOptions}
                      onChange={this.onChangeTransientCounterPosition}
                      selectedValue={this.state.transientCounter.position}/>
            </View>
            <Button title="Add Counter"
                    onClick={this.onAddCounter}
                    size="large"/>
          </View>
        </View>
    );
  }

  renderCounters = () =>
      this.state.counters.map((counterEntry) => counterEntry.counter);

  onAddCounter = () => {
    const counter = <Counter name={this.state.transientCounter.name}
                             position={this.state.transientCounter.position}
                             onRemoveCounter={this.onRemoveCounter}
                             id={this.state.nextCounterId}
                             key={this.state.nextCounterId}/>;

    const counters = this.state.counters;
    counters.push({id: this.state.nextCounterId, counter: counter});

    this.setState({
      counters: counters,
      nextCounterId: this.state.nextCounterId + 1,
    });
    this.forceUpdate();
  };

  onRemoveCounter = counterId => {
    Alert.alert(
        'Remove Counter',
        'Are you sure you want to remove this counter?',
        [
          {
            text: 'Yes',
            onPress: () => {
              let counters = this.state.counters;
              counters = counters.filter((entry) => entry.id !== counterId);
              this.setState({counters: counters});
            },
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {cancelable: false},
    );
  };

  onChangeTransientCounterName = name => {
    console.log(name);
    this.setState({
      transientCounter: {
        name: name,
        position: this.state.transientCounter.position,
      },
    });
  };

  onChangeTransientCounterPosition = position => {
    this.setState({
      transientCounter: {
        position: position,
        name: this.state.transientCounter.name,
      },
    });
  };
}