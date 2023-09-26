import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const DetalhesPersonagem = ({ route }) => {
  const { id } = route.params;
  const [detalhes, setDetalhes] = useState(null);
  const [frases, setFrases] = useState([]);

  useEffect(() => {
    axios.get(`https://my-json-server.typicode.com/orionteles/chavo/personagens/${id}`)
      .then(response => {
        setDetalhes(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`https://my-json-server.typicode.com/orionteles/chavo/bordoes`)
      .then(response => {
        const bordoesDoPersonagem = response.data.filter(bordao => bordao.personagem_id === id);
        setFrases(bordoesDoPersonagem);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!detalhes) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={{ uri: detalhes.urlImagem }} style={styles.image} />
          <Text style={styles.name}>{detalhes.nome}</Text>
          <Text style={styles.biografia}>{detalhes.biografia}</Text>
        </View>
        <View style={styles.card}>
          <Image source={{ uri: detalhes.urlImagemCrianca }} style={styles.image} />
          <Text style={styles.info}>Idade: {detalhes.idade}</Text>
          <Text style={styles.info}>Sexo: {detalhes.sexo}</Text>
          <Text style={styles.info}>Endereço: {detalhes.endereco}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.tituloFrases}>Frases</Text>
          {frases.map(frase => (
            <View key={frase.id} style={styles.cardFrase}>
              <Text style={styles.frase}>{frase.bordao}</Text>
            </View>
          ))}
        </View>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center', 
    backgroundColor: 'black',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  card: {
    width: '100%', 
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  biografia: {
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  tituloFrases: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  cardFrase: {
    width: '100%', 
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  frase: {
    fontSize: 16,
  },
});

export default DetalhesPersonagem;
