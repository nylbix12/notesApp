import 'react-native-get-random-values';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../redux/actions/noteActions';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { Picker } from '@react-native-picker/picker';

export default function Formulaire({ route }) {
  const noteToEdit = route.params?.note;
  const [title, setTitle] = useState(noteToEdit?.title || '');
  const [content, setContent] = useState(noteToEdit?.content || '');
  const [importance, setImportance] = useState(noteToEdit?.importance || 'low');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSave = () => {
    Keyboard.dismiss();  // 3. Ferme le clavier avant tout
    const note = {
      id: noteToEdit?.id || uuidv4(),
      title,
      content,
      importance,
      date: noteToEdit?.date || new Date().toLocaleString(),
    };
    if (noteToEdit) dispatch(updateNote(note));
    else dispatch(addNote(note));
    navigation.navigate('Dashboard');
  };

  return (
    // 1. Pour déplacer le contenu quand le clavier apparaît
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {/* 1bis. Tap en dehors pour fermer le clavier */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#888"
            returnKeyType="next"
          />
          <TextInput
            placeholder="Content"
            multiline
            numberOfLines={6}
            style={styles.inputContent}
            value={content}
            onChangeText={setContent}
            placeholderTextColor="#888"
            textAlignVertical="top"
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={importance}
              onValueChange={setImportance}
              style={styles.picker}
              // 2. Très important : autoriser les taps sur le bouton même si clavier actif
              mode="dropdown"
            >
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7EE4EC',
    padding: 20,
  },
  input: {
    fontFamily: 'Montserrat_400Regular',
    borderWidth: 1,
    borderColor: '#114B5F',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    color: '#114B5F',
  },
  inputContent: {
    fontFamily: 'Montserrat_400Regular',
    borderWidth: 1,
    borderColor: '#114B5F',
    borderRadius: 6,
    padding: 12,
    height: 140,
    marginBottom: 12,
    color: '#114B5F',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#114B5F',
    borderRadius: 6,
    marginBottom: 20,
  },
  picker: {
    color: '#114B5F',
    fontFamily: 'Montserrat_400Regular',
  },
  button: {
    backgroundColor: '#114B5F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat_700Bold',
    color: '#fff',
    fontSize: 16,
  },
});


