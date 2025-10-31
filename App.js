import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';

export default function App() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://172.20.10.3:3002/api/perfil")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setPerfil(json); // 👈 mantém tudo (perfil, endereco, escolaridade)
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!perfil) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar dados</Text>
      </View>
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: perfil.imagem }} style={styles.imagem} />
      <Text style={styles.titulo}>Perfil</Text>
      <Text style={styles.texto}>Nome: {perfil.nome}</Text>
      <Text style={styles.texto}>Idade: {perfil.idade}</Text>

      {/* <Text style={styles.titulo}>Endereço</Text>
      <Text style={styles.texto}>Rua: {perfil.endereco.rua}</Text>
      <Text style={styles.texto}>Bairro: {perfil.endereco.bairro}</Text>
      <Text style={styles.texto}>Cidade: {perfil.endereco.cidade}</Text> */}

     {/* <Text style={styles.titulo}>Escolaridade</Text>
      <Text style={styles.texto}>Escola: {perfil.escolaridade.escola}</Text>
      <Text style={styles.texto}>Ano letivo: {perfil.escolaridade["ano letivo"]}</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    width: '70%',
  },
  texto: {
    fontSize: 18,
    marginBottom: 5,
    width: "70%",
  },
});