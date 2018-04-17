import React from 'react';
import {TextInput, View} from 'react-native';
import Counter from '../Components/Molekuls/Counter';
import Button from '../Components/Atoms/Button';
import Select from '../Components/Atoms/Select';

const positionOptions = [
  {name: 'Links', value: 'Links'},
  {name: 'Mitte', value: 'Mitte'},
  {name: 'Rechts', value: 'Rechts'},
];

export default class Counters extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      counters: [],
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
            height: 100,
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
                  placeholder="Name"
                  onChangeText={this.onChangeTransientCounterName}
              />

              <Select options={positionOptions}
                      onChange={this.onChangeTransientCounterPosition}
                      selectedValue={this.state.transientCounter.position}/>
            </View>
            <Button title="Add Counter"
                    onClick={this.onAddCounter}/>
          </View>
        </View>
    );
  }

  renderCounters = () => {
    return (
        <View>
          {this.state.counters.map((counterEntry) => {
            return counterEntry.counter;
          })}
        </View>
    );
  };

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
    let counters = this.state.counters;
    counters = counters.filter((entry) => entry.id !== counterId);
    this.setState({counters: counters});
  };

  onChangeTransientCounterName = name => {
    this.setState({transientCounter: {name: name}});
  };

  onChangeTransientCounterPosition = position => {
    this.setState({transientCounter: {position: position}});
  };
}