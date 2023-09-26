// FrasesComuns.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const FrasesComuns = ({ personagemId }) => {
  const [frases, setFrases] = useState([]);

  useEffect(() => {
    axios.get(`https://my-json-server.typicode.com/orionteles/chavo/bordoes?personagem_id=${personagemId}`)
      .then(response => {
        setFrases(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [personagemId]);

  return (
    <View>
      <Text style={{ fontSize: 24, color: 'red' }}>Frases</Text>
      {frases.map(frase => (
        <View key={frase.id}>
          <Text>{frase.frase}</Text>
        </View>
      ))}
    </View>
  );
}

export default FrasesComuns;
