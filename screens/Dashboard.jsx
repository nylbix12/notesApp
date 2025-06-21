import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();
  const notes = useSelector(state => state.notes);

  return (
    <View style={styles.container}>
      {notes.length === 0 ? (
        <Text style={styles.message}>No notes yet.</Text>
      ) : (
        <ScrollView>
          {notes.map((note, i) => (
            <TouchableOpacity
              key={i}
              style={styles.card}
              onPress={() => navigation.navigate('Note', { note })}
            >
              <Text style={styles.title}>{note.title}</Text>
              <Text style={styles.date}>{note.date}</Text>
              <Text numberOfLines={2} style={styles.content}>{note.content}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Formulaire')}
      >
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7EE4EC',       // fond turquoise clair
    padding: 20,
  },
  message: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Montserrat_400Regular',
  },
  card: {
    backgroundColor: '#FFD4CA',       // fond pêche pour la carte
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: '#114B5F',
  },
  date: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
    color: '#114B5F',
    marginVertical: 4,
  },
  content: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: '#114B5F',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#114B5F',     // bleu foncé
    padding: 16,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
  },
});

