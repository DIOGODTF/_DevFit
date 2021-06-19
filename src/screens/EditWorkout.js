import React,{ useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import DefaultButton from '../components/DefaultButton';
import ExercisesItemEdit from '../components/ExercisesItemEdit';
import customModal from '../components/customModal';

const Container = styled.SafeAreaView`
    flex: 1;    
    margin: 20px;
`;

const NameInput = styled.TextInput`
    border: 1px solid #CCC;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-size: 16px;
    padding: 10px;
`;

const ButtonText = styled.Text`
    color: #FFF;
`;

const ExercisesArea = styled.View`
    flex: 1;
    margin-top: 20px;
    padding-top: 20px;
    border-top-width: 1px;
    border-top-color: #CCC;
`;

const ExercisesList = styled.FlatList`
    flex:1;
    padding-top: 20px;
`;

const ModalLabel = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-top: 10px;
`;

const ModalMuscles = styled.ScrollView``;

const ModalInput = styled.TextInput`
    width    :100% ;
    font-size: 14px;
    color: #333;
    height: 40px;
    border-bottom-width: 1px;
    border-bottom-color: #CCC;
`;

const ModalMuscle = styled.TouchableHighlight`
    width: 50px;
    height: 50px;
    background-color: #EEE;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    opacity: ${props=>props.opacity};
`;

const ModalMuscleImage = styled.Image`
    width: 35px;
    height: 35px;
`;

const Page = (props) =>{
    let workout = (props.navigation.state.params &&
                   props.navigation.state.params.workout)?
                   props.navigation.state.params.workout:false;
    const [id, SetId] = useState(workout?workout.id:'');               
    const [name,setName] = useState( workout?workout.name:'');   
    const [exercises, setExercises] = useState(workout?workout.exercises:[]); 
    const [modalvisible, setModalvisible] = useState(false);
    
    const [moldalId, setModalId] = useState('');
    const [moldalName, setModalName] = useState('');
    const [moldalMuscle, setModalMuscle] = useState('');
    const [moldalSets, setModalSets] = useState('');
    const [moldalReps, setModalReps] = useState('');
    const [moldalLoad, setModalLoad] = useState('');
    const editExercise = (exercise) =>{
         setModalId(exercise.id);
         setModalName(exercise.name);
         setModalMuscle(exercise.muscle);
         setModalSets(exercise.sets);
         setModalReps(exercise.reps);
         setModalLoad(exercise.load);
         
         setModalvisible(true);
    }

    const delExercise = (exercise) =>{
        let newExercises = [...exercises];
        newExercises = newExercises.filter(i=>i.id!=exercise.id);
        setExercises(newExercises);
    }

    return(
      <Container>
          <customModal visible={modalvisible} closeAction={()=>setModalvisible(false)}>
             <ModalLabel>Músculo de foco</ModalLabel>   
                <ModalMuscles horizontal={true} showsHorizontalScrollIndicator={false}>
                    <ModalMuscle opacity={ModalMuscle=='abs'?1:0.3} onPress={()=>setModalMuscle('abs')} underlayColor="transparent">
                        <ModalMuscleImage source={require('../assets/muscles/abs.png')}/>               
                    </ModalMuscle>
                </ModalMuscles>
             <ModalLabel>Nome do exercício</ModalLabel>
             <ModalInput value={modalName} onChangeText={e=>setModalName(e)}/>
          </customModal>
          <NameInput  
             value={name}
             onChangeText={e=>setName(e)}
             placeholder="Digite o nome do treino"
          />
          <ExercisesArea>
              <DefaultButton bgcolor="#4AC34E">
                  <ButtonText>Adicionar exercício</ButtonText>
              </DefaultButton>
          </ExercisesArea>
          <ExercisesList 
              data={exercises}
              renderItem={({item})=>
                <ExercisesItemEdit 
                     data={item}
                     editAction={()=>editExercise(item)}
                     delAction={()=>delExercise(item)}
                />
              }
              keyExtractor={item=>item.name}
          />
      </Container>
    );
}

Page.navigationOptions = ({navigation}) => {
    let isEdit = (navigation.state.params && navigation.state.params.workout)?true:false;
    const SaveArea = styled.TouchableHighlight`
        width: 30px;
        height: 30px;
        justify-content: center;
        align-items: center;
    `;
    
    const SaveAreaImage = styled.Image`
        width: 25px;
        height: 25px;
    `;

    const SaveWorkoutButton = () => {
        return(
            <SaveArea>
                <SaveAreaImage source={require('../assets/check-black.png')} />
            </SaveArea>
        );
    }

    return{
      title:isEdit?'Editar Treino':'Adicionar Novo Treino',
      headerRight:<SaveWorkoutButton/>,
      headerRightContainerStyle:{
          marginRight:10
      }     
    }     
}

const mapStatetoProps = (state) => {
    return{        
       
    }
}

const mapDispatchToProps = (dispatch) => {
    return{    
        
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Page);