import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'https://itunes.apple.com/search';
const ACCENT = '#7c3aed';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    const term = query.trim();

    if (!term) {
      setError('Digite o nome de uma música ou artista.');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setError('');

    try {
      const url = `${API_URL}?term=${encodeURIComponent(term)}&entity=song&limit=20`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }

      const data = await response.json();
      setResults(data.results || []);
      setSearched(true);
    } catch (e) {
      setResults([]);
      setSearched(false);
      setError('Não foi possível buscar as músicas. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function renderItem({ item }) {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.artworkUrl100 }} style={styles.cover} />
        <View style={styles.info}>
          <Text style={styles.track} numberOfLines={1}>
            {item.trackName}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {item.artistName}
          </Text>
          <Text style={styles.album} numberOfLines={1}>
            {item.collectionName}
          </Text>
        </View>
      </View>
    );
  }

  function renderEmpty() {
    if (loading || error || !searched) return null;
    return <Text style={styles.message}>Nenhum resultado encontrado.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <Text style={styles.title}>VIBE</Text>
        <Text style={styles.subtitle}>Busca musical</Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Buscar música ou artista..."
          placeholderTextColor="#888888"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color={ACCENT} style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => String(item.trackId ?? index)}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: ACCENT,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#555555',
    marginTop: 2,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#111111',
  },
  button: {
    marginLeft: 10,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#b91c1c',
    paddingHorizontal: 20,
    paddingBottom: 8,
    fontSize: 14,
  },
  loader: {
    marginTop: 40,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dddddd',
  },
  cover: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#eeeeee',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  track: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  artist: {
    fontSize: 14,
    color: '#333333',
    marginTop: 2,
  },
  album: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  message: {
    textAlign: 'center',
    color: '#555555',
    marginTop: 40,
    fontSize: 15,
  },
});
