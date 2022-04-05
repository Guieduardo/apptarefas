import React, {useState, useEffect} from "react";

import {View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image } from  'react-native';
import { Ionicons } from '@expo/vector-icons';
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function Home(){
//Criando os states
let [comercial, setComercial] = useState('');
let [noite, setNoite] = useState('');
let [saudacao, setSaudacao] = useState('');

let [tarefaComercial, setTarefaComercial] = useState([
    {
        id: 0,
        descricao: 'Trabalhar'
    },
]);

let [tarefaNoite, setTarefaNoite] = useState ([
    {
        id: 0,
        descricao: 'Descanso'
    },

]);


    useEffect(()=>{
        
        
        const currentHour = new Date().getHours();

        if (currentHour <12){
            setSaudacao ("Bom dia");
        } else if (currentHour >= 12 && currentHour < 18){
            setSaudacao ("Boa tarde");
        } else{
            setSaudacao ("Boa noite");
        }

    },[]); 


    //Criando a função que adiciona uma tarefa no horario comercial
    function adicionaTarefaComercial(){
        if(comercial.trim() != ''){ 

            //criando um objeto
            const dados ={ //Segundo Passo
                id: String(new Date().getTime()),
                descricao: comercial,
            };

            //alert("clicou")
            setTarefaComercial((oldState) => [... oldState, dados]); //... (Spread operator) Pega dois array distindos e junta tudo em um outro array - Old State é o que eu tinha antes e dados o que foi incluido agora
            setComercial('');
        }
        else{
            alert('Digite uma tarefa')
        }
    }

    function adicionaTarefaNoite(){
        if(noite.trim() != ''){ 

            //criando um objeto
            const dados ={ //Segundo Passo
                id: String(new Date().getTime()),
                descricao: noite,
            };

            //alert("clicou")
            setTarefaNoite((oldState) => [... oldState, dados]); //... (Spread operator) Pega dois array distindos e junta tudo em um outro array - Old State é o que eu tinha antes e dados o que foi incluido agora
            setNoite('');
        }
        else{
            alert('Digite uma tarefa')
        }
    }

    function deletarTarefaComercial(index){
        console.log('id: ' + index);
        let novaTarefaComercial = [...tarefaComercial];//colocando um array dentro de outro 

        novaTarefaComercial = novaTarefaComercial.filter((item, i) => {
            if(item.id != index){
                return true;
            }
            else{
                return false;
            }
        });
        setTarefaComercial(novaTarefaComercial)
    }

    function deletarTarefaNoite(index){
        console.log('id: ' + index);
        let novaTarefaNoite = [...tarefaNoite];//colocando um array dentro de outro 

        novaTarefaNoite = novaTarefaNoite.filter((item, i) => {
            if(item.id != index){
                return true;
            }
            else{
                return false;
            }
        });
        setTarefaNoite(novaTarefaNoite)
    }


    return(

        <View style={styles.container}>
            <Text style={styles.titulo}>App Tarefas Diarias, {saudacao} </Text>
            <Image style={{width: 350, height: 200}}
            source={{uri:'http://marcusmarques.com.br/wp-content/uploads/2019/12/gerenciador-tarefas.jpg'}}
          />
            <Text style={styles.titulo}>Lista de tarefas do dia a dia</Text>

            <View style={styles.tarefas}>

                <View style={styles.box}>
                    <View style={styles.comercial}> 
                <Text style={styles.subTitulo}>Horario Comercial</Text>
                <TextInput //Primeiro passo
                value={comercial}
                returnKeyType="done" //icone do teclado
                style={styles.campo}
                onChangeText={setComercial} 
                placeholder="Digite uma tarefa"
            />

                    <TouchableOpacity style={styles.botao} onPress={adicionaTarefaComercial}>
                        <Text style={styles.textoBotao}>Adicionar</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={tarefaComercial} //de onde vem os dados da sua lista (nome da lista)
                        keyExtractor={(item) => item.id} //Looping para ver os itens por id
                        //horizontal ={true}
                        renderItem={(({item}) => //Para cada item que ele encontrar na lista de itens, mostre o botão com a descrição
                            <View style={styles.botaoAdd}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={styles.textoBotaoAdd}>{item.descricao}</Text>
                                    <TouchableOpacity onPress={()=> deletarTarefaComercial(item.id)}>
                                    <Ionicons name="checkmark-done-circle-outline" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            )} 
                    />
                    </View>
                </View>

            
            <View style={styles.box}> 
            <View style={styles.night}>
            <Text style={styles.subTitulo}>Noite/Madrugada</Text>
                <TextInput 
                    value={noite}
                    returnKeyType="done" 
                    style={styles.campo}
                    onChangeText={setNoite} 
                    placeholder="Digite uma tarefa"
                />

                <TouchableOpacity style={styles.botao} onPress={adicionaTarefaNoite}>
                    <Text style={styles.textoBotao}>Adicionar</Text>
                </TouchableOpacity>

            <FlatList
                data={tarefaNoite} 
                keyExtractor={(item) => item.id} 
                //horizontal ={true}
                renderItem={(({item}) => 
                    <View style={styles.botaoAdd}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.textoBotaoAdd}>{item.descricao}</Text>
                            <TouchableOpacity onPress={()=> deletarTarefaNoite(item.id)}>
                            <Ionicons name="checkmark-done-circle-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    )} 
            />
            </View>
            </View>

           
            
        </View>


            

        </View>

    );

}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#87ceeb',
        paddingVertical: 70,
        paddingHorizontal: 20,
        alignItems: 'center'
        
    },

    titulo:{
        color: '#000080',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    },

    subTitulo:{
        color:'#00bfff',
        fontSize: 25
    },

    campo:{
        backgroundColor: '#a9a9a9',
        color: '#FFF',
        fontSize: 18,
        marginTop: 10,
        borderRadius: 7,
        padding: 15
    },

    botao:{
        backgroundColor: '#f8f8ff',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 20,
        marginBottom:20
    },

    textoBotao:{
        color: '#4161BF',
        fontSize: 17,
        fontWeight: 'bold'
    },

    botaoAdd:{
        backgroundColor: '#696969',
        padding: 15,
        marginBottom: 10
    },

    textoBotaoAdd:{
        color: '#00bfff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    
    box:{
        flex: 1,
        padding: 1,
        marginTop: 20
    },

    tarefas:{
        flexDirection: 'row'
    },

    comercial:{
        backgroundColor: '#ff8c00'
    },

    night:{
        backgroundColor: '#191970'
    }



});
