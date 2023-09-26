import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';

const PersonagensListagem = ({ navigation }) => {
  const [personagens, setPersonagens] = useState([]);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/orionteles/chavo/personagens')
      .then(response => {
        setPersonagens(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Text style={styles.titulo}>Personagens do Chaves</Text>
      <FlatList
        data={personagens}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cartao}
            onPress={() => navigation.navigate('Detalhes', { id: item.id })}
          >
            <Image source={{ uri: item.urlImagem }} style={styles.imagem} />
            <View style={styles.informacoes}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.distancia}>{item.endereco}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginVertical: 16,
  },
  cartao: {
    backgroundColor: '#f6f6f6',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 6,
    flexDirection: "row",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginVertical: 16,
    marginLeft: 16,
  },
  informacoes: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 8,
    marginVertical: 16,
    marginRight: 16,
  },
  nome: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "bold",
  },
  distancia: {
    fontSize: 12,
    lineHeight: 19,
  },
});

export default PersonagensListagem;
