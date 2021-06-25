import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [movies, setMovies] = useState(null);
  const [abas, setAbas] = useState(0);


  useEffect(() =>{
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=506fadb0256c13349acc05dabebf9604&language=en-US&page=1', {
      method: 'GET'
  })
    .then(renponse => renponse.json())
    .then(function(json){

      setMovies(json);

    })
  },[])

  if(movies != null){
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        {
          movies.results.map(function(val){
            if(val.id == abas){
              return(
                <View style={{backgroundColor: 'white', borderRadius: 5}}>
                  <TouchableOpacity onPress={()=> setAbas(val.id)}>
                    <Text style={{color: 'black'}}>{val.original_title}:</Text>
                  </TouchableOpacity>
                  <Text style={{color: 'black'}}>{val.overview}</Text>
                </View>
              )
            }else{
              return(
                <View>
                <TouchableOpacity onPress={()=> setAbas(val.id)}>
                  <Text style={{color: 'white'}}>{val.original_title}</Text>
                </TouchableOpacity>
              </View>
              )
            }
          })
        }
      </View>
    )
  }else {
      return(
        <View style={styles.container}>
          <Text style={{color: 'white'}}>Carregando...</Text>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
});
