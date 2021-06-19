import React,{ useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

const DaysScroll = styled.ScrollView`
    width: 100%;
    height: 50px;
`;

const DayButton = styled.TouchableHighlight`
    width:${props=>props.width} ;
    justify-content: center;
    align-items: center;
`
const DayItem = styled.View`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #EEE;
    justify-content: center;
    align-items: center;
`;

const DayText = styled.Text`

`;

const Day = ( {day, month, dailyProgress, workoutDays, onPress} )=>{    
    let bgcolor = '#F4F444';
    let opacity = 1;
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMinutes(0);
    today.setMilliseconds(0);
    
    let thisDate = new Date(today.getFullYear(), month, day);

    if (workoutDays.includes( thisDate.getDay()) ){
        if(thisDate.getTime() < today.getTime() ){
            let thisYear = thisDate.getFullYear;
            let thisMonth = thisDate.getMonth()+1;
            let thisDay = thisDate.getDate();
            //2 casas no mes e dia
            thisMonth = (thisMonth<10)?'0'+thisMonth:thisMonth;
            thisDay = (thisDay<10)?'0'+thisDay:thisDay;
            let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;
            //let dFormated = {thisYear}+"-"+{thisMonth}+"-"+{thisDay};
            //console.log(dFormated);
            if(dailyProgress.includes( dFormated )) {
                bgcolor = '#B5FF88'; //treinou
            } else {
                bgcolor = '#FFB5B5'; //nao treinou
            }

        }
    } else {
        opacity = 0.2;
    };

    if (thisDate.getTime() == today.getTime()) {
        bgcolor = '#B55EFF';
        opacity = 1;
    };

    return(
       <DayButton width={dayW} onPress={onPress} underlayColor="transparent">
           <DayItem style={{opacity, backgroundColor:bgcolor}}>
               <DayText>{day}</DayText>
           </DayItem>
       </DayButton>
    )
}
const screenWidth = Math.round(Dimensions.get('window').width);
let dayW = Math.round( screenWidth / 9 ); //qtde itens q cabe na tela
let offsetW = Math.round( (screenWidth-dayW) /2 ); //deixar o dia no meio da tela

export default(props)=>{
    const DayRef = useRef();
    const [selectedDay, setSelectedDay] = useState(props.selectedDay);     
    
    const handleScrollEnd = (e) => {
       let posX = e.nativeEvent.contentOffSet.x;
       let targetDay = Math.round(posX / dayW) +1 ;
       setSelectedDay(targetDay);
    }

    const scrollToDay = (d) =>{
       let posX = (d-1)*dayW;
       DayRef.current.scrollTo({x:posX, y:0, animated:true});
       setSelectedDay(d);
    };

    useEffect(()=>{
      props.setSelectedDay(selectedDay);
    },[selectedDay]);
    
    useEffect(()=>{
      setTimeout(()=>{
        if (props.selectedMonth == new Date().getMonth() ) {
           scrollToDay(new Date().getDate());  
        } else {
           scrollToDay(1);
        }
      },10);        
    },[props.selectedMonth]);

    let days = [];
    //qtos dias tem o mes...
    let daysInMonth = new Date( new Date().getFullYear(), (props.selectedMonth+1),0).getDate();
    //escreve os dias do mes no array..
    for (let i=1;i<=daysInMonth;i++){
        days.push(i);
    }

    return(
        <DaysScroll 
           ref={DayRef}
           horizontal={true}
           showHorizontalScrollindicator={false}
           decelerationRate="fast"
           snapToInterval={dayW}
           contentContainerStyle={{paddingLeft:offsetW, paddingRigth:offsetW}}
           onMomentumScrollEnd={handleScrollEnd}
        >
            {days.map((d, k)=>(
               <Day 
                  key={k}
                  day={d}
                  month={props.selectedMonth}
                  dailyProgress={props.dailyProgress}
                  workoutDays={props.workoutDays}
                  onPress={()=>scrollToDay(d)}
               /> 
            ))}
        </DaysScroll>
    )
}