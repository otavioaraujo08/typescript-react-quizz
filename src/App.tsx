import React from 'react';

import { fetchQuizQuestions } from './services/Api';
import { Difficult } from './Interfaces/Difficult';
import { QuestionState } from './Interfaces/Questions';

import { QuestionCard } from './components/QuestionCard';
import { AnswersObject } from './Interfaces/Answers';
import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionState[]>([]);
  const [number, setNumber] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<AnswersObject[]>([]);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(true);

  const startGame = async () => {
    try {
      setLoading(true);
      setGameOver(false);
  
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficult.EASY
      )
  
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
  
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if(correct) setScore(prev => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }

      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
      <GlobalStyle/>

      <Wrapper>
        <h1>Quizz</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startGame}>Começar</button>) : null
        }

        {!gameOver ? <p className='score'>Pontuação: {score} </p> : null}

        { loading && <p>Carregando questões...</p>}

        {!loading && !gameOver && (
          <QuestionCard 
          questionNumber={number + 1} 
          totalQuestions={TOTAL_QUESTIONS} 
          question={questions[number].question} 
          answers={questions[number].answers} 
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
          />
          )}

        { !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='nextQuestion' onClick={nextQuestion}>Próxima questão</button>
          ) : null}
      </Wrapper>
    </>
  );
}

export default App;
