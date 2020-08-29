import React, { useState } from 'react';
import { View, Picker, StyleSheet } from 'react-native';

const Select = () => {
  const [selectedValue, setSelectedValue] = useState<
    'apply' | 'permission' | 'finish'
  >('apply');

  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        style={[styles.container, styles[selectedValue]]}
        onValueChange={itemValue => setSelectedValue(itemValue)}
      >
        <Picker.Item label='申請' value='apply' />
        <Picker.Item label='許可' value='permission' />
        <Picker.Item label='読了' value='finish' />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
  },
  apply: {
    color: '#FFCC00',
  },
  permission: {
    color: '#EE0044',
  },
  finish: {
    color: '#00FF00',
  },
});

export default Select;
