/* eslint-disable react/prop-types */
import React, {useState, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {Platform} from 'react-native';

import {Container, DateButton, DateText, Picker} from './styles';

export default function DateInput({date, onChange}) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, `dd 'de' MMMM 'de' yyyy`, {locale: pt}),
    [date]
  );

  function onChangePicker(event, dateSelected) {
    const datePicked = dateSelected || date;
    setOpened(Platform.OS === 'ios');
    onChange(datePicked);
  }

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
      {opened && (
        <Picker>
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour
            display="spinner"
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt-BR"
            onChange={onChangePicker}
          />
        </Picker>
      )}
    </Container>
  );
}
