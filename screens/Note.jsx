import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../redux/actions/noteActions';
import { useNavigation } from '@react-navigation/native';

const getColor = level => {
  switch (level) {
    case 'high': return '#ff4d4d';
    case 'medium': return '#ffc107';
    case 'low': return '#28a745';
    default: return '#ccc';
  }
};

export default function Note({ route }) {
  const { note } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onDelete = () => {
    Alert.alert(
      'Delete this note?',
      'This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteNote(note.id));
            navigation.navigate('Dashboard');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.date}>{note.date}</Text>
        <Text style={styles.content}>{note.content}</Text>
        <View style={[styles.colorBar, { backgroundColor: getColor(note.importance) }]} />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#114B5F' }]}
          onPress={() => navigation.navigate('Formulaire', { note })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#dc3545' }]}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7EE4EC',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFD4CA',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    color: '#114B5F',
    marginBottom: 8,
  },
  date: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
    color: '#114B5F',
    marginBottom: 12,
  },
  content: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: '#114B5F',
    marginBottom: 12,
  },
  colorBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontFamily: 'Montserrat_700Bold',
    color: '#fff',
    fontSize: 16,
  },
});
