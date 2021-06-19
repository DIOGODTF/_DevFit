import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import DefaultButton from '../components/DefaultButton';

const BalloonTriangle = styled.View`
    width: 0;
    height: 0;
    border-left-color: transparent;
    border-left-width: 15;
    border-bottom-width: 15;
    border-bottom-color: #EDEDED;
    border-right-width: 15;
    border-right-color: transparent;
`;

const BallonArea = styled.View`
    width: 90%;
    padding: 20px;
    background-color: #EDEDED;
    border-radius: 10px;
    min-height: 100px;
`;

const BallonBigText = styled.Text`
    font-size:15px;   
    align-self : center;
`
const ButtonText = styled.Text`
     color: #FFF;
     font-weight: bold;
`;

const BallonText = styled.Text`
     font-size: 13px;
     align-self: center;
     margin-top: 10px;
`
const Strong=styled.Text`
    font-weight: bold;
`;

export default (props) => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMinutes(0);
    today.setMilliseconds(0);
    
    let thisDate = new Date(today.getFullYear(), props.selectedMonth, props.selectedDay);
    //console.log(thisDate.getDay() );
    let thisYear = thisDate.getFullYear;
    let thisMonth = thisDate.getMonth()+1;
    let thisDay = thisDate.getDate();
    //2 casas no mes e dia
    thisMonth = (thisMonth<10)?'0'+thisMonth:thisMonth;
    thisDay = (thisDay<10)?'0'+thisDay:thisDay;
    let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;

    let dayOff = false;
    let isToday = false;
    let isFuture = false;
    let isDone = false;

    if(!props.workoutDays.includes(thisDate.getDay())){
        dayOff = true;
    } else if (thisDate.getTime() > today.getTime() ) {       
        isFuture = true;
    } else {
       if(props.dailyProgress.includes(dFormated)) {
           isDone = true
       } else {
           isDone = false;
       }
    }    

    if (thisDate.getTime() == today.getTime()){
        isToday = true;
    }
    //console.log(thisDate);
    //console.log(today);
    //console.log( dayOff );
    //console.log( isToday );
    //console.log( isFuture );
    //console.log( isDone );

    const setDone = () => {
        props.addProgress(dFormated);
    }

    const setUnDone = () => {
        props.delProgress(dFormated);
    }
    
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(()=>{
        const timerFunction=()=>{
              let now = Date.now();
              let endToday = new Date();
              endToday.setHours(23);
              endToday.setMinutes(59);
              endToday.setSeconds(59);
              endToday = endToday.getTime();
              let diff = endToday - now;
              
              let h =Math.floor( diff / (1000*60*60) );
              let m =Math.floor( (diff / (1000*60))-(h*60) );
              let s =Math.floor( (diff/1000)-(m*60)-((h*60)*60) );
              h = h<10?'0'+h:h;
              m = m<10?'0'+m:m;
              s = s<10?'0'+s:s;

              setTimeLeft( `${h}h ${m}m ${s}s`);
        }
        let timer = setInterval(timerFunction,1000);
        timerFunction();
        return ()=>clearInterval(timer);
    },[]);
    return(
        <>
            <BalloonTriangle></BalloonTriangle>
            <BallonArea>
                {dayOff &&
                    <BallonBigText>😴 <Strong>De boa!!!</Strong> Não tem treino, pode descançar. </BallonBigText>
                }
                {isFuture &&
                    <BallonBigText>⏰ Treino agendado!!!</BallonBigText>
                }
                {!dayOff && !isFuture && isDone &&
                  <>
                     <BallonBigText><Strong>🏆 Parabéns.</Strong> Treino concluído</BallonBigText>
                     <DefaultButton onPress={setUnDone} bgcolor="#4ac34e" underlayColor="transparent" style={{marginTop:20}}>
                         <ButtonText>Desmarcar treino</ButtonText>
                     </DefaultButton>
                  </>  
                }
                {!dayOff && !isFuture && !isDone && !isToday &&
                  <>
                     <BallonBigText><Strong>👎 Fraco!</Strong> Você falhou no treino</BallonBigText>
                     <DefaultButton onPress={setDone} bgcolor="#4ac34e" underlayColor="transparent" style={{marginTop:20}}>
                         <ButtonText>Marcar como concluído</ButtonText>
                     </DefaultButton>
                  </>  
                }
                {!dayOff && !isFuture && !isDone && isToday &&
                  <>
                     <BallonBigText><Strong>🏋️‍♀️ Bora!!! Hoje tem treino</Strong></BallonBigText>
                     <BallonText>...Você tem {timeLeft} para iniciar o treino de hoje!</BallonText>
                     <DefaultButton onPress={props.goToWorkout} bgcolor="#4ac34e" underlayColor="transparent" style={{marginTop:20}}>
                         <ButtonText>Iniciar treino</ButtonText>
                     </DefaultButton>
                  </>  
                }
            </BallonArea>
        </>
    );
}