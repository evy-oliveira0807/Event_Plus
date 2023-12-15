
import React, { useEffect, useState } from 'react';
import './Teste.css'

//UseEffect: controla efeitos colaterais da Api.
//sempre que chama a Api (recarrega a pagina) e o use state da variável muda ele executa alguma ação.
const TestePage = () => {
    const [count, setCount] = useState(10)
    const [calculation, setCalculation] = useState(10)

    useEffect(()=> {
        setCalculation(count * 2) //Função
    },[count]);//

    return (
     <>
     <p>Count:{count}</p>
     <button onClick={() => setCount((c) => c + 1)}> + </button>
     <p>Calculation:{calculation}</p>
     </>
    );
};

export default TestePage;